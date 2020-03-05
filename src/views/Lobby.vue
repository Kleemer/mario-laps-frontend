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
        :disabled="isPending"
        :loading="isPending"
        color="primary"
        depressed
        @click="onStart">
        Lancer
      </VBtn>
      <div v-else class="caption">
        {{ isPending ? 'Lancement de la partie...' : "En attente de l'hôte..." }}
      </div>
      <VSpacer/>
    </VCardActions>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import UserCard from '@/components/UserCard.vue'

import { createMarioLap } from '@/api/types/routes/mario-lap'

export default {
  name: 'lobby',
  components: {
    CenteredSmallCard,
    UserCard,
  },
  data: () => ({
    isPending: false,
  }),
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
    async onStart() {
      try {
        this.isPending = true
        const marioLap = await createMarioLap()

        this.$socket.client.emit('startGame', { roomId: this.roomId, marioLap })
      } catch (err) {
        console.log(err)
        // @todo add snackbar
        console.log('Something went wrong')
      } finally {
        this.isPending = false
      }
    },
    leaveRoom() {
      this.$socket.client.emit('leaveRoom', this.roomId)
      this.$store.dispatch('room/reset')
      this.$router.push('/home')
    },
  },
}
</script>
