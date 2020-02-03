<template>
  <VApp>
    <VContent>
      <div class="h-full">
        <RouterView />
      </div>
    </VContent>
  </VApp>
</template>

<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue'
import { VApp } from 'vuetify/lib'

/**
 * This component is loaded only once and is never re-rendered.
 * Use it to register components that cannot be destroyed.
 * DO NOT PASS PROPS
 */
export default Vue.extend({
  name: 'AppContainer',
  sockets: {
    connect() {
      console.log('socket connected')
    },
    addUser(event) {
      console.log('addUser', event)
      this.$store.dispatch('room/addUser', event)
    },
    removeUser(event) {
      console.log('removeUser', event)
      this.$store.dispatch('room/removeUser', event)
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
