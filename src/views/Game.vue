<template>
  <div class="pa-4">
    <VRow>
      <VCol cols="4">
        <RaceInfoCard
          :topLabel="score"
          :mainLabel="totalScore"
          bottomLabel="Score"/>
      </VCol>
      <VCol cols="4">
        <RaceInfoCard
          :topLabel="0"
          :mainLabel="0"
          bottomLabel="Laps"/>
      </VCol>
      <VCol cols="4">
        <RaceInfoCard
          :mainLabel="rank"
          rank
          bottomLabel="Rang"/>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="6">
        <VBtn
          :disabled="!isHost || isPendingToggle"
          :loading="isPendingToggle"
          depressed
          x-large
          @click="onToggleLap">
          Laps: {{ withLap ? 'ON' : 'OFF' }}
        </VBtn>
      </VCol>
      <VCol cols="6">
        <!-- @todo add special race selection -->
      </VCol>
    </VRow>
    <PositionGrid
      :disabled="submitted ? allPositions : selectedPositions"
      :selected="position"
      @change="onChange"/>
    <VRow
      class="pt-3"
      justify="center">
      <VCol cols="6">
        <VBtn
          color="primary"
          :disabled="!position || isPending || submitted"
          :loading="isPending"
          @click="onSubmit">
          Valider la course
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          color="primary"
          :disabled="!isHost || !canNext"
          :loading="isPendingNext"
          @click="onNext">
          Course suivante
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'

import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RaceInfoCard from '@/components/game/RaceInfoCard'
import PositionGrid from '@/components/game/PositionGrid'

import { Race, Round } from '@/types/models'
import { createRace } from '@/api/routes/race'
import { createUserRace } from '@/api/routes/user-race'
import { updateRaceLapSetting } from '@/api/routes/race-lap'
import { RootState } from '@/store/types'
import { RoomState } from '@/store/modules/room/types'
import { GameState } from '@/store/modules/ui/game/types'
import { LapState } from '@/store/modules/player/laps/types'
import {
  getScore,
  getRaceScore,
  getUserScore,
  scoreTable,
  Position,
  Score,
} from '@/shared/score'
import { Lap, getLap } from '@/shared/lap'

const LapModule = namespace('player/laps')
const RoomModule = namespace('room')
const RoundModule = namespace('rounds')
const RaceModule = namespace('races')
const GameModule = namespace('ui/game')

type UserScoreTuple = [string, Score]

@Component({
  components: {
    CenteredSmallCard,
    RaceInfoCard,
    PositionGrid,
  },
})
export default class Game extends Vue {
  private isPending: boolean = false
  private isPendingNext: boolean = false
  private isPendingToggle: boolean = false

  @GameModule.Action private readonly reset!: Function
  @GameModule.Action private readonly setPosition!: Function
  @GameModule.Action private readonly setSubmitted!: Function
  @GameModule.State private readonly position!: GameState['position']
  @GameModule.State private readonly submitted!: GameState['submitted']
  @LapModule.State('laps') private readonly totalLaps!: LapState['laps']

  @State private readonly user!: RootState['user']
  @State private readonly socketId!: RootState['socketId']
  @RaceModule.Getter private readonly racesArray!: Race[]
  @RaceModule.Getter('current') private readonly race!: Race
  @RaceModule.State private readonly races!: Race[]
  @RoomModule.State private readonly hostId!: RoomState['hostId']
  @RoomModule.State('users') private readonly roomUsers!: RoomState['users']
  @RoundModule.Getter('current') private readonly round!: Round

  private get username(): string {
    return this.user.username
  }

  private get isHost(): boolean {
    return this.hostId === this.socketId
  }

  private get withLap(): boolean {
    return this.race.withLap
  }

  private get score(): Score {
    if (this.racesArray.length < 2) {
      return 0
    }

    const previousRace = this.racesArray[this.racesArray.length - 2]
    return getRaceScore(previousRace, this.user.id)
  }

  private get totalScore(): Score {
    return getUserScore(this.racesArray, this.user.id)
  }

  // private get laps(): Lap {
  //   return getLap(this.racesArray, this.user.id, this.roomUsers.length)
  // }

  private get rank(): number {
    const userRaces = this.racesArray.map((r) => r.userRaces)

    const userIds: string[] = userRaces.reduce(
      (acc: string[], race) => acc.concat(race.map((user) => user.userId)),
      [],
    )

    const uniqueUserIds = [...new Set(userIds)]

    const userScoreTuples: UserScoreTuple[] = uniqueUserIds.reduce(
      (acc: UserScoreTuple[], userId) => {
        acc.push([userId, getUserScore(this.racesArray, userId)])
        return acc
      },
      [],
    )

    const sortScoreTupleFn = (a: UserScoreTuple, b: UserScoreTuple) => {
      return a[1] < b[1] ? 1 : a[1] === b[1] ? 0 : -1
    }

    const sortedUserScoreTuples = userScoreTuples.sort(sortScoreTupleFn)

    return sortedUserScoreTuples.findIndex((tuple) => tuple[0] === this.user.id) + 1
  }

  private get allPositions(): Position[] {
    return scoreTable.map((scoreTuple): Position => scoreTuple[0])
  }

  private get selectedPositions(): Position[] {
    const selectedPositions = this.race.userRaces.map((u) => u.position)
    if (selectedPositions.includes(this.position)) {
      this.setPosition(0)
    }

    return selectedPositions
  }


  private get canNext(): boolean {
    return this.race.userRaces.length === this.roomUsers.length
  }

  private onChange(position: Position): void {
    this.setPosition(position)
  }

  private async onSubmit(): Promise<void> {
    try {
      this.isPending = true
      const race = await createUserRace(
        this.race.id,
        { position: this.position },
      )

      if (race) {
        this.$socket.client.emit('updateStore', {
          action: 'races/addUserRaces',
          data: {
            roundId: this.round.id,
            raceId: this.race.id,
            userRaces: race.userRaces,
          },
        })
        this.setPosition(0)
        this.setSubmitted(true)
      } else {
        // @todo handle error
      }

    } catch (err) {
      console.trace('Something went wrong', err)
    } finally {
      this.isPending = false
    }
  }

  private async onToggleLap(): Promise<void> {
    try {
      this.isPendingToggle = true
      const race = await updateRaceLapSetting(
        this.race.id,
        { withLap: !this.withLap },
      )

      if (race) {
        this.$socket.client.emit('updateStore', {
          action: 'races/updateRace',
          data: {
            roundId: this.round.id,
            raceId: this.race.id,
            data: { withLap: race.withLap },
          },
        })
      } else {
        // @todo handle error
      }

    } catch (err) {
      console.trace('Something went wrong', err)
    } finally {
      this.isPendingToggle = false
    }
  }

  private async onNext(): Promise<void> {
    try {
      this.isPendingNext = true
      const nextRace = await createRace(this.round.id)

      this.$socket.client.emit('updateStore', {
        action: 'races/addRace',
        data: nextRace,
      })

      this.$socket.client.emit('nextRace')
    } catch (err) {
      console.trace('Something went wrong', err)
    } finally {
      this.isPendingNext = false
    }
  }
}
</script>
