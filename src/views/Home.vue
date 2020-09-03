<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Que souhaitez-vous faire?
    </VCardTitle>
    <VCardText class="text-center">
      <VBtn
        depressed
        color="primary"
        @click="createLobby">
        Créer
      </VBtn>
      <VCardText class="font-weight-medium">
        ou
      </VCardText>
      <VBtn
        depressed
        color="primary"
        @click="joinRoom">
        Rejoindre
      </VBtn>
    </VCardText>
  </CenteredSmallCard>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import CenteredSmallCard from '@/components/CenteredSmallCard.vue'

import { getRandomString } from '@/shared/string'

@Component({
  components: {
    CenteredSmallCard,
  },
})
export default class Home extends Vue {
  @State private readonly user!: Record<string, any>

  private get username(): string {
    return this.user.username
  }

  private async createLobby(): Promise<void> {
    const roomId = getRandomString(2)
    await this.$socket.client.emit(
      'createRoom',
      { roomId, username: this.username },
      (response: Record<string, any>): void => {
        this.onResponse(response)
      },
    )
  }

  private joinRoom(): void {
    this.$router.push('join-room')
  }

  private onResponse(response: Record<string, any>): void {
    this.$store.dispatch('room/setRoom', response)
    this.$router.push('lobby')
  }
}
</script>
