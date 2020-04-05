<template>
  <VToolbar
  class="pt-3"
  color="transparent"
  flat>
    <VToolbarTitle class="font-weight-bold">
      <VLayout column wrap class="mx-3">
        <VRow class="body-2" cols="12">
          Manche {{ roundOrder }}
        </VRow>
        <VRow class="headline font-weight-bold" cols="12">
          Course {{ raceOrder }}
        </VRow>
      </VLayout>
    </VToolbarTitle>
    <VSpacer/>
    <div class="pr-2">{{ username }}</div>
    <VAvatar color="grey" size="36">
      <VIcon v-if="!avatar" class="white--text">mdi-account</VIcon>
      <VImg v-else :src="avatar"/>
    </Vavatar>
    <template v-slot:extension>
      <VSpacer/>
      <VDialog
        v-if="isHost"
        v-model="isEndDialogVisible"
        persistent
        width="300">
        <template v-slot:activator="{ on }">
          <VBtn
            v-on="on"
            class="flat font-weight-bold"
            color="error"
            depressed
            rounded>
            Fin
          </VBtn>
        </template>
        <VCard
          flat
          class="py-2 px-0"
          width="300">
          <VCardTitle class="justify-center body-1 font-weight-bold pl-6 pr-2 pt-0">
            Que souhaitez-vous faire?
            <VBtn
            class="ml-6"
            icon
            small
            @click="isEndDialogVisible = false">
              <VIcon small>mdi-close</VIcon>
            </VBtn>
          </VCardTitle>
          <VCardText class="text-center">
            <VBtn
              :disabled="isPending"
              :loading="isPending"
              depressed
              class="mb-2 black--text"
              color="white"
              @click="onNewRound">
              Nouvelle manche
            </VBtn>
            <VBtn
              :disabled="isPending"
              depressed
              color="error"
              @click="onEnd">
              Fin du Mario Laps
            </VBtn>
          </VCardText>
        </VCard>
      </VDialog>
    </template>
  </VToolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, namespace } from 'vuex-class'

import { RoomState } from '@/store/modules/room/types'
import { Round } from '@/store/modules/rounds/types'
import { Race } from '@/store/modules/races/types'
import { RootState } from '@/store/types'
import createRound from '@/api/types/routes/round'
import { MarioLapState } from '@/store/modules/mario-lap/types'

const RoomModule = namespace('room')
const MarioLapModule = namespace('marioLap')
const RoundModule = namespace('rounds')
const RaceModule = namespace('races')

@Component({ })
export default class GameToolbar extends Vue {
  private isPending: boolean = false
  private isEndDialogVisible: boolean = false

  @State private readonly player!: RootState['player']
  @MarioLapModule.State('id') private readonly marioLapId!: MarioLapState['id']
  @RaceModule.Getter('last') private readonly race!: Race
  @RoomModule.State private readonly hostId!: RoomState['hostId']
  @RoomModule.State('id') private readonly roomId!: RoomState['id']
  @RoundModule.Getter('last') private readonly round!: Round

  private get roundOrder(): number {
    return this.round.order
  }

  private get raceOrder(): number {
    return this.race.order || 1
  }

  private get username(): string {
    return this.player?.username || 'Guest'
  }

  private get avatar(): string | null {
    return this.player?.avatar || null
  }

  private get isHost(): boolean {
    return this.hostId === this.player.id
  }

  private async onNewRound(): Promise<void> {
    try {
      this.isPending = true
      const nextRound = await createRound(this.marioLapId!)

      this.$socket.client.emit('updateStore', {
        action: 'rounds/addRound',
        data: nextRound,
      })

      this.$socket.client.emit('nextRound')
    } catch (err) {
      console.trace('Something went wrong', err)
    } finally {
      this.isPending = false
      this.isEndDialogVisible = false
    }
  }

  private onEnd(): void {
    this.$socket.client.emit('endGame')
  }
}
</script>
