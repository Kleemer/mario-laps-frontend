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
      <VBtn
        color="error"
        depressed
        icon
        @click="leaveRoom">
        <VIcon>mdi-close</VIcon>
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
    <VCardActions>
      <VSpacer/>
      <VBtn
        v-if="isHost"
        color="primary"
        depressed>
        Lancer
      </VBtn>
      <div v-else class="caption">
        En attente de l'hôte...
      </div>
      <VSpacer/>
    </VCardActions>
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
    isHost() {
      return this.$store.state.room.hostId === this.$store.state.player.id
    },
    roomId() {
      return this.$store.state.room.id
    },
    hostId() {
      return this.$store.state.room.hostId
    },
    users() {
      return this.$store.state.room.users
    },
  },
  methods: {
    leaveRoom() {
      this.$socket.client.emit('leaveRoom', this.roomId)
      this.$store.dispatch('room/reset')
      this.$router.push('/home')
    },
  },
}
</script>
