<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Qui êtes-vous?
    </VCardTitle>
    <VCardText>
      <PlayerSelector/>
    </VCardText>
    <template v-if="player">
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
import PlayerSelector from '@/components/PlayerSelector.vue'

import { getRandomString } from '@/shared/string.js'

export default {
  name: 'home',
  components: {
    CenteredSmallCard,
    PlayerSelector,
  },
  computed: {
    player() {
      return this.$store.state.player
    },
  },
  mounted() {
    this.$store.dispatch('reset')
  },
  methods: {
    createLobby() {
      const room = getRandomString(2)
      this.$store.dispatch('setRoomId', room)
      this.$socket.client.emit('createRoom', { roomId: room, username: this.player })
      this.$router.push('lobby')
    },
    joinRoom() {
      this.$router.push('join-room')
    },
  },
}
</script>
