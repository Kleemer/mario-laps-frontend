<template>
  <VToolbar flat color="transparent">
    <VToolbarTitle class="pt-2 display-2 font-weight-bold">
      {{ title }}
    </VToolbarTitle>
    <VSpacer/>
    <VAvatar color="grey" size="36">
      <VIcon v-if="!avatar" class="white--text">mdi-account</VIcon>
      <VImg v-else :src="avatar"/>
    </Vavatar>
  </VToolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ })
export default class TopToolbar extends Vue {

  private get title() {
    return this.$route.meta?.title || 'Mario Laps'
  }

  private get avatar() {
    return this.$store.state.player?.avatar || null
  }
}
</script>
