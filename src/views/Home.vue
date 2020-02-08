<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Qui êtes-vous?
    </VCardTitle>
    <VCardText>
      <PlayerUsernameSelector :value="playerUsername"/>
    </VCardText>
    <template v-if="playerUsername">
      <VCardTitle class="justify-center font-weight-bold headline">
        Que voulez-vous faire?
      </VCardTitle>
      <VCardText class="text-center">
        <VBtn
          depressed
          color="primary"
          @click="createLobby">
          Créer un Mario Lap
        </VBtn>
        <VCardText class="font-weight-medium">
          ou
        </VCardText>
        <VBtn
          depressed
          color="primary"
          @click="joinRoom">
          Rejoindre un Mario Lap
        </VBtn>
      </VCardText>
    </template>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import PlayerUsernameSelector from '@/components/PlayerUsernameSelector.vue'

import { getRandomString } from '@/shared/string.js'
import { getPlayerUsername } from '@/shared/user.js'

export default {
  name: 'home',
  components: {
    CenteredSmallCard,
    PlayerUsernameSelector,
  },
  computed: {
    playerUsername() {
      return this.$store.state.player.username
    },
  },
  mounted() {
    this.$store.dispatch('reset')
    const playerUsername = getPlayerUsername()
    if (playerUsername) {
      this.$store.dispatch('setPlayerUsername', playerUsername)
    }
  },
  methods: {
    async createLobby() {
      const roomId = getRandomString(2)
      await this.$socket.client.emit(
        'createRoom',
        { roomId, username: this.playerUsername },
        (response) => this.onResponse(response)
      )
    },
    joinRoom() {
      this.$router.push('join-room')
    },
    onResponse(response) {
      this.$store.dispatch('setRoomId', response.roomId)
      this.$store.dispatch('room/setRoom', response)
      this.$router.push('lobby')
    }
  },
}
</script>
