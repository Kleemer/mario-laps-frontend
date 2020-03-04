<template>
  <CenteredSmallCard>
    <template>
      <VCardTitle class="justify-center font-weight-bold headline">
        Que souhaitez-vous faire?
      </VCardTitle>
      <VCardText class="text-center">
        <VBtn
          depressed
          :disabled="isPending"
          :loading="isPending"
          color="primary"
          @click="createLobby">
          Créer
        </VBtn>
        <VCardText class="font-weight-medium">
          ou
        </VCardText>
        <VBtn
          :disabled="isPending"
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
import { createMarioLap } from '@/api/types/routes/mario-lap'

export default {
  name: 'home',
  components: {
    CenteredSmallCard,
  },
  data: () => ({
    isPending: false,
  }),
  computed: {
    username() {
      return this.$store.state.player.username
    },
  },
  methods: {
    async createLobby() {
      const roomId = getRandomString(2)
      try {
        this.isPending = true
        await createMarioLap()

        await this.$socket.client.emit(
          'createRoom',
          { roomId, username: this.username },
          (response) => this.onResponse(response),
        )
      } catch (err) {
        // @todo add snackbar
        console.log('Something went wrong')
      } finally {
        this.isPending = false
      }
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
