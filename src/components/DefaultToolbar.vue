<template>
  <VToolbar flat color="transparent">
    <VToolbarTitle class="pt-2 display-2 font-weight-bold">
      {{ title }}
    </VToolbarTitle>
    <VSpacer/>
    <div class="pr-2">{{ isPending ? 'Logging out...' : username }}</div>
    <VAvatar
      :on="{
        click: isLoggedIn ? onLogout : undefined
      }"
      color="grey"
      size="36">
      <VProgressCircular v-if="isPending" indeterminate color="primary"/>
      <VIcon v-else-if="!avatar" class="white--text">mdi-account</VIcon>
      <VImg v-else :src="avatar"/>
    </Vavatar>
  </VToolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { logout } from '@/api/types/routes/auth'
import { getLoggedInCookie } from '@/shared/auth'

@Component({ })
export default class DefaultToolbar extends Vue {
  private isPending: boolean = false

  private get isLoggedIn(): boolean {
    return getLoggedInCookie()
  }

  private get title(): string {
    return this.$route.meta?.title || 'Mario Laps'
  }

  private get username(): string {
    return this.$store.state.player?.username || 'Guest'
  }

  private get avatar(): string | null {
    return this.$store.state.player?.avatar || null
  }

  private async onLogout(): Promise<void> {
    try {
      this.isPending = true
      await logout()
      this.$router.replace('login')
    } catch (err) {
      console.log('Something went wrong')
    } finally {
      this.isPending = false
    }
  }
}
</script>
