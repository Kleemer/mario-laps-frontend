<template>
  <CenteredSmallCard>
    <VCardTitle>
      <div class="font-weight-thin title pr-2">
        Room
      </div>
      <div class="font-weight-medium font-weight-bold headline">
        {{ roomId }}
      </div>
      <VSpacer />
      <!-- @todo if not host -->
      <VBtn
        color="primary"
        depressed
        @click="leaveRoom">
        Quitter
        <VIcon right>mdi-exit-to-app</VIcon>
      </VBtn>
    </VCardTitle>
    <VCardText class="text-center py-0">
      <!-- @todo -->
      <VContainer class="pa-0">
        <VRow>
          <VCol v-for="user in users" :key="user.username" cols="6">
            <UserCard :user="user" />
          </VCol>
        </VRow>
      </VContainer>
    </VCardText>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'lobby',
  components: {
    CenteredSmallCard,
    UserCard,
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
      this.$store.dispatch('reset')
      this.$router.push('/')
    },
  },
}
</script>
