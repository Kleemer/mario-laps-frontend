<template>
  <VApp>
    <VContent>
      <div class="h-full">
        <TopToolbar />
        <RouterView />
      </div>
    </VContent>
  </VApp>
</template>

<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue'
import { VApp } from 'vuetify/lib'
import TopToolbar from '@/components/TopToolbar.vue'
/**
 * This component is loaded only once and is never re-rendered.
 * Use it to register components that cannot be destroyed.
 * DO NOT PASS PROPS
 */
export default Vue.extend({
  name: 'AppContainer',
  components: {
    TopToolbar,
  },
  sockets: {
    connect(event) {
      console.log('socket connected', this.$socket.client.id)
      this.$store.dispatch('setPlayerId', this.$socket.client.id)
    },
    addUser(event) {
      console.log('addUser', event)
      this.$store.dispatch('room/addUser', event)
    },
    removeUser(event) {
      console.log('removeUser', event)
      this.$store.dispatch('room/removeUser', event)
    },
    updateHostId(event) {
      console.log('updateHostId', event)
      this.$store.dispatch('room/setHostId', event)
    },
  },
})
</script>

<style lang="scss">
@import "./assets/scss/app";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
