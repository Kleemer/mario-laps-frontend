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
})
</script>

<style lang="scss">
@import "./assets/scss/app";

#app {
  font-family: $base-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $base-font-color;
}
</style>
