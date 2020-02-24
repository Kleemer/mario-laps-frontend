<template>
  <CenteredSmallCard>
    <template>
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

import { getRandomString } from '@/shared/string.js'
import { createMarioLap } from '@/api/types/routes/mario-lap'

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
      // @todo login then create mario lap then store mario lap id
      // in socket server? Maybe in room?

      try {
        await createMarioLap()

        await this.$socket.client.emit(
          'createRoom',
          { roomId, username: this.username },
          (response) => this.onResponse(response),
        )
      } catch (err) {
        // @todo add snackbar
        console.log('Something went wrong')
      }
    },
    async joinRoom() {
      this.$router.push('join-room')
    },
    onResponse(response) {
      this.$store.dispatch('setRoomId', response.id)
      this.$store.dispatch('room/setRoom', response)
      this.$router.push('lobby')
    },
  },
}
</script>
