<template>
  <div>
    <VCardText class="text-center">
      <VTextField
        v-model="roomId"
        @input="onInput"
        label="Room ID"
        class="uppercase"
        :error-messages="errorMessages"
        maxlength="2"
        autofocus
        @keyup.enter="joinRoom"
        />
    </VCardText>
    <VCardText class="text-center pb-0">      
      <VBtn
        depressed
        color="primary"
        @click="joinRoom">
        Rejoindre
      </VBtn>
    </VCardText>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator'
import { Room } from '@/types'

@Component({ })
export default class RoomInput extends Vue {
  private errorMessages: string[] = []
  private roomId: string = ''

  private get playerUsername() {
    return this.$store.state.player.username
  }

  private onInput() {
    this.roomId = this.roomId.toUpperCase()
  }

  private async joinRoom() {
    if (this.roomId.length < 2) {
      this.errorMessages = ['Type a valid room ID.']
      return
    }

    await this.$socket.client.emit(
      'joinRoom',
      { roomId: this.roomId, username: this.playerUsername },
      (response: string | Room) => this.onResponse(response),
    )
  }

  private onResponse(response: string | Room) {
    if (response === 'noRoom') {
      this.errorMessages = ['Room does not exist.']
      return
    }
    if (response === 'alreadyInRoom') {
      this.errorMessages = ['Player already in the room.']
      return
    }

    this.$store.dispatch('setRoomId', (response as Room).id)
    this.$store.dispatch('room/setRoom', response as Room)
    this.$router.replace({ name: 'lobby' })
  }
}
</script>
