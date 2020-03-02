<template>
  <VApp>
    <VContent>
      <div class="h-full">
        <!-- <GameToolbar /> -->
        <div>Game layout</div>
        <RouterView />
      </div>
    </VContent>
  </VApp>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GameToolbar from '@/components/GameToolbar.vue'

@Component({ components: { GameToolbar } })
export default class DefaultLayout extends Vue {
}
</script>
