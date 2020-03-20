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
          :disabled="!isHost"
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
      :disabled="positionsSelected"
      :selected="positionGridValue"
      @change="onChange"/>
    <VRow
      class="pt-3"
      justify="center">
      <VBtn
        color="primary"
        :disabled="!positionGridValue || isPending || hasSelected"
        :loading="isPending"
        @click="onSubmit">
        Valider la course
      </VBtn>
    </VRow>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RaceInfoCard from '@/components/RaceInfoCard'
import PositionGrid from '@/components/PositionGrid'

import { first, last } from '@/shared/array'
import { Round } from '../store/modules/round/types'
import { Race } from '../store/modules/race/types'
import { createUserRace } from '../api/types/routes/user-race'
import { updateRaceLapSetting } from '../api/types/routes/race-lap'

import {
  State,
  Getter,
  namespace,
} from 'vuex-class'

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
  private hasSelected: boolean = false
  private positionGridValue: number = 0

  @State private readonly player!: Record<string, any>
  @RoundModule.Getter('last') private readonly round!: Round
  @RaceModule.Getter('last') private readonly race!: Race

  private get username(): string {
    return this.player.username
  }

  private get isHost(): boolean {
    return this.$store.state.room.hostId === this.player.id
  }

  private get withLap(): boolean {
    return this.race.withLap
  }

  private get positionsSelected(): number[] {
    return this.race.users.map(({ position }) => position)
  }

  private onChange(position: number): void {
    this.positionGridValue = position
  }

  private async onSubmit(): Promise<void> {
    try {
      this.isPending = true
      const { users } = await createUserRace(
        this.race.id,
        { position: this.positionGridValue },
      )

      this.$socket.client.emit('updateStore', {
        action: 'marioLap/rounds/races/addRaceUsers',
        data: {
          roundId: this.round.id,
          raceId: this.race.id,
          users,
        },
      })
      this.positionGridValue = 0
      this.hasSelected = true
    } catch (err) {
      console.log('Something went wrong', err)
    } finally {
      this.isPending = false
    }
  }

  private async onToggleLap(): Promise<void> {
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
  }
}
</script>
