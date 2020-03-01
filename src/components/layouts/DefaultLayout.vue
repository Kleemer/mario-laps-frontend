<template>
  <VApp>
    <VContent>
      <div class="h-full">
        <DefaultToolbar />
        <RouterView />
      </div>
    </VContent>
  </VApp>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultToolbar from '@/components/DefaultToolbar.vue'

@Component({ components: { DefaultToolbar } })
export default class DefaultLayout extends Vue {
}
</script>
