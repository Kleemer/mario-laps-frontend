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
              depressed
              class="mb-2 black--text"
              color="white"
              @click="onNewRound">
              Nouvelle manche
            </VBtn>
            <VBtn
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
import { Round } from '@/store/modules/mario-lap/rounds/types'
import { Race } from '@/store/modules/mario-lap/rounds/races/types'
import { RootState } from '@/store/types'

const RoomModule = namespace('room')
const RoundModule = namespace('marioLap/rounds')
const RaceModule = namespace('marioLap/rounds/races')

@Component({ })
export default class GameToolbar extends Vue {
  private isEndDialogVisible: boolean = false

  @State private readonly player!: RootState['player']
  @RoomModule.State('id') private readonly roomId!: RoomState['id']
  @RoomModule.State private readonly hostId!: RoomState['hostId']
  @RoundModule.Getter('last') private readonly round!: Round
  @RaceModule.Getter('last') private readonly race!: Race

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

  private onNewRound(): void {
    console.log('new round')
  }

  private onEnd(): void {
    this.$socket.client.emit('endGame')
  }
}
</script>
