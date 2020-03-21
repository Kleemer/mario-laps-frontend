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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  State,
  Getter,
  namespace,
} from 'vuex-class'

import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import UserCard from '@/components/UserCard.vue'
import { RoomState } from '@/store/modules/room/types'
import { createMarioLap } from '@/api/types/routes/mario-lap'
import { RootState } from '@/store/types'

const RoomModule = namespace('room')

@Component({
  components: {
    CenteredSmallCard,
    UserCard,
  },
})
export default class Lobby extends Vue {
  private isPending: boolean = false

  @State private readonly player!: RootState['player']
  @RoomModule.State('id') private readonly roomId!: RoomState['id']
  @RoomModule.State private readonly hostId!: RoomState['hostId']
  @RoomModule.State private readonly users!: RoomState['users']

  private get isHost(): boolean {
    return this.hostId === this.player.id
  }

  private async onStart(): Promise<void> {
    try {
      this.isPending = true
      const marioLap = await createMarioLap()

      this.$socket.client.emit('startGame', marioLap)
    } catch (err) {
      console.log(err)
      // @todo add snackbar
      console.log('Something went wrong')
    } finally {
      this.isPending = false
    }
  }

  private leaveRoom(): void {
    this.$socket.client.emit('leaveRoom', this.roomId)
    this.$store.dispatch('room/reset')
    this.$router.push('/home')
  }
}
</script>
