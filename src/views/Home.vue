<template>
  <CenteredSmallCard>
    <template>
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
    </template>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'

import { getRandomString } from '@/shared/string.js'

export default {
  name: 'home',
  components: {
    CenteredSmallCard,
  },
  computed: {
    username() {
      return this.$store.state.player.username
    },
  },
  methods: {
    async createLobby() {
      const roomId = getRandomString(2)
      await this.$socket.client.emit(
        'createRoom',
        { roomId, username: this.username },
        (response) => this.onResponse(response),
      )
    },
    joinRoom() {
      this.$router.push('join-room')
    },
    onResponse(response) {
      this.$store.dispatch('room/setRoom', response)
      this.$router.push('lobby')
    },
  },
}
</script>
