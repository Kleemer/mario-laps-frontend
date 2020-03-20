<template>
  <VToolbar
  class="pt-3"
  color="transparent"
  flat>
    <VToolbarTitle class="font-weight-bold">
      <VLayout column wrap class="mx-3">
        <VRow class="body-2" cols="12">
          Manche 1
        </VRow>
        <VRow class="headline font-weight-bold" cols="12">
          Course 1
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
import { Round } from '../store/modules/round/types'
import { Race } from '../store/modules/race/types'

@Component({ })
export default class GameToolbar extends Vue {
  private isEndDialogVisible: boolean = false

  private get round(): Round {
    return this.$store.state.marioLap.rounds?.length || 1
  }

  private get race(): Race {
    return this.$store.state.marioLap.rounds?.races?.length || 1
  }

  private get roomId(): string {
    return this.$store.state.room.id
  }

  private get username(): string {
    return this.$store.state.player?.username || 'Guest'
  }

  private get avatar(): string | null {
    return this.$store.state.player?.avatar || null
  }

  private get isHost(): boolean {
    return this.$store.state.room.hostId === this.$store.state.player.id
  }

  private onNewRound(): void {
    console.log('new round')
  }

  private onEnd(): void {
    this.$socket.client.emit('endGame')
  }
}
</script>
