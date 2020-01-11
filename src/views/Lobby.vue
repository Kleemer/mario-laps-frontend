<template>
  <CenteredSmallCard>
    <VRow col="12">
      <VSpacer />
      <!-- @todo if not host -->
      <VBtn
        color="primary"
        depressed
        @click="leaveRoom">
        Quitter la room
      </VBtn>
    </VRow>
    <VCardText class="text-center">
      <div class="font-weight-medium font-weight-bold title">
        Code de la room
      </div>
      <div class="font-weight-medium font-weight-bold headline">
        {{ roomId }}
      </div>
      <!-- @todo -->
      <div v-for="user in users" :key="user.username">
        {{ user }}
      </div>
    </VCardText>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'

export default {
  name: 'lobby',
  components: {
    CenteredSmallCard,
  },
  computed: {
    player() {
      return this.$store.state.player
    },
    roomId() {
      return this.$store.state.roomId
    },
    users() {
      return this.$store.state.room.users
    },
  },
  methods: {
    leaveRoom() {
      this.$store.dispatch('setRoomId', null)
      this.$socket.client.emit('leaveRoom', this.roomId)
      this.$router.push('/')
    },
  },
}
</script>
