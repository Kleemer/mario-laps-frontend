<template>
  <div>
    <VCardText class="text-center">
      <VTextField
        v-model="roomId"
        @input="onInput"
        label="Room ID"
        class="uppercase"
        hide-details
        maxlength="2"
        autofocus
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
      roomId: '',
    }
  },
  computed: {
    player() {
      return this.$store.state.player
    },
  },
  methods: {
    onInput() {
      this.roomId = this.roomId.toUpperCase()
    },

    async joinRoom() {
      this.$store.dispatch('setRoomId', this.roomId)
      const res = await this.$socket.client.emit(
        'joinRoom',
        { roomId: this.roomId, username: this.player },
      )
      // todo
      console.log(res)
      this.$router.push('lobby')
    },
  },
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/_dark.scss";
</style>