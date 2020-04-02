<template>
  <div class="pa-4">
    <VRow>
      <VCol cols="4">
        <RaceInfoCard
          :mainLabel="10"
          bottomLabel="Score"/>
      </VCol>
      <VCol cols="4">
        <RaceInfoCard
          :topLabel="2"
          :mainLabel="11"
          bottomLabel="Laps"/>
      </VCol>
      <VCol cols="4">
        <RaceInfoCard
          :mainLabel="0"
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
        <!-- @todo add course speciale -->
      </VCol>
    </VRow>
    <PositionGrid
      :disabled="submitted ? allPositions : positionsSelected"
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
import RaceInfoCard from '@/components/RaceInfoCard'
import PositionGrid from '@/components/PositionGrid'

import { first, last } from '@/shared/array'
import { Round } from '@/store/modules/mario-lap/rounds/types'
import { Race } from '@/store/modules/mario-lap/rounds/races/types'
import { createRace } from '@/api/types/routes/race'
import { createUserRace } from '@/api/types/routes/user-race'
import { updateRaceLapSetting } from '@/api/types/routes/race-lap'
import { RootState } from '@/store/types'
import { RoomState } from '@/store/modules/room/types'
import { GameState } from '@/store/modules/ui/game/types'
import { scoreTable, PositionScoreTuple } from '@/shared/score'

const GameModule = namespace('ui/game')
const RoomModule = namespace('room')
const RoundModule = namespace('marioLap/rounds')
const RaceModule = namespace('marioLap/rounds/races')

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

  @State private readonly player!: RootState['player']
  @RaceModule.Getter('last') private readonly race!: Race
  @RoomModule.State private readonly hostId!: RoomState['hostId']
  @RoomModule.State('users') private readonly roomUsers!: RoomState['users']
  @RoundModule.Getter('last') private readonly round!: Round

  private get username(): string {
    return this.player.username
  }

  private get isHost(): boolean {
    return this.hostId === this.player.id
  }

  private get withLap(): boolean {
    return this.race.withLap
  }

  private get allPositions(): number[] {
    return scoreTable.map((scoreTuple): PositionScoreTuple[0] => scoreTuple[0])
  }

  private get positionsSelected(): number[] {
    const positionsSelected = this.race.users.map(({ position }) => position)
    if (positionsSelected.includes(this.position)) {
      this.setPosition(0)
    }

    return positionsSelected
  }


  private get canNext(): boolean {
    return this.race.users.length === this.roomUsers.length
  }

  private onChange(position: number): void {
    this.setPosition(position)
  }

  private async onSubmit(): Promise<void> {
    try {
      this.isPending = true
      const { users } = await createUserRace(
        this.race.id,
        { position: this.position },
      )

      this.$socket.client.emit('updateStore', {
        action: 'marioLap/rounds/races/addRaceUsers',
        data: {
          roundId: this.round.id,
          raceId: this.race.id,
          users,
        },
      })
      this.setPosition(0)
      this.setSubmitted(true)
    } catch (err) {
      console.trace('Something went wrong', err)
    } finally {
      this.isPending = false
    }
  }

  private async onToggleLap(): Promise<void> {
    try {
      this.isPendingToggle = true
      const { withLap } = await updateRaceLapSetting(
        this.race.id,
        { withLap: !this.withLap },
      )

      this.$socket.client.emit('updateStore', {
        action: 'marioLap/rounds/races/updateRace',
        data: {
          roundId: this.round.id,
          raceId: this.race.id,
          data: { withLap },
        },
      })

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
        action: 'marioLap/rounds/races/addRace',
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
