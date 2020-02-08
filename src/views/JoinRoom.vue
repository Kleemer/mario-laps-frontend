<template>
  <CenteredSmallCard to="/">
    <VCardTitle class="justify-center font-weight-bold headline">
      Rejoindre un Mario Lap
    </VCardTitle>
    <VCardText>
      <RoomInput/>
    </VCardText>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RoomInput from '@/components/RoomInput.vue'

import { getPlayerUsername } from '@/shared/user.js'

export default {
  name: 'join-room',
  components: {
    CenteredSmallCard,
    RoomInput,
  },
  mounted() {
    const playerUsername = this.$store.state.player.username || getPlayerUsername()
    if (playerUsername) {
      this.$store.dispatch('setPlayerUsername', playerUsername)
    } else {
      this.$router.replace({ name: 'home' })
    }
  },
}
</script>
