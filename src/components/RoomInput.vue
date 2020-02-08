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
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      errorMessages: [],
      roomId: '',
    }
  },
  computed: {
    playerUsername() {
      return this.$store.state.player.username
    },
  },
  methods: {
    onInput() {
      this.roomId = this.roomId.toUpperCase()
    },

    async joinRoom() {
      if (this.roomId.length < 2) {
        this.errorMessages = ['Type a valid room ID.']
        return
      }

      await this.$socket.client.emit(
        'joinRoom',
        { roomId: this.roomId, username: this.playerUsername },
        (response) => this.onResponse(response)
      )
    },
    onResponse(response) {
      console.log(response)
      if (response === 'noRoom') {
        this.errorMessages = ['Room does not exist.']
        return
      }
      if (response === 'alreadyInRoom') {
        this.errorMessages = ['Player already in the room.']
        return
      }

      this.$store.dispatch('setRoomId', response.roomId)
      this.$store.dispatch('room/setRoom', response)
      this.$router.replace({ name: 'lobby' })
    }
  },
})
</script>
