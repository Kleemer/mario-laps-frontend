<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Entrez le code:
    </VCardTitle>
    <VCardText>
      <RoomInput/>
    </VCardText>
    <VCardActions>
      <VSpacer/>
      <VBtn
        class="caption"
        color="transparent"
        depressed
        small
        @click="onCancel">
        Annuler
      </VBtn>
      <VSpacer/>
    </VCardActions>
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
  methods: {
    onCancel() {
      this.$router.push('home')
    },
  },
}
</script>
