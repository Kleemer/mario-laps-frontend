<template>
  <VToolbar flat color="transparent">
    <VToolbarTitle class="pt-2 display-2 font-weight-bold">
      {{ title }}
    </VToolbarTitle>
    <VSpacer/>
    <div class="pr-2">{{ username }}</div>
    <VAvatar color="grey" size="36">
      <VIcon v-if="!avatar" class="white--text">mdi-account</VIcon>
      <VImg v-else :src="avatar"/>
    </Vavatar>
  </VToolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ })
export default class DefaultToolbar extends Vue {

  private get title() {
    return this.$route.meta?.title || 'Mario Laps'
  }

  private get username() {
    return this.$store.state.player?.username || 'Guest'
  }

  private get avatar() {
    return this.$store.state.player?.avatar || null
  }
}
</script>
