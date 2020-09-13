<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Qui êtes-vous?
    </VCardTitle>
    <VCardText class="text-center">
      <UsernameSelector v-model="username"/>
      <VBtn
        :disabled="isPending"
        :loading="isPending"
        color="info"
        depressed
        x-large
        @click="onSubmit">
        Valider
      </VBtn>
    </VCardText>
  </CenteredSmallCard>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import UsernameSelector from '@/components/UsernameSelector.vue'

import { getRandomString } from '@/shared/string'
import { getPlayerUsername } from '@/shared/user'
import { getLoggedInCookie } from '@/shared/auth'
import { login, logout } from '@/api/routes/auth'

@Component({
  components: {
    CenteredSmallCard,
    UsernameSelector,
  },
})
export default class Login extends Vue {
  private isPending: boolean = false
  private username: string | null = null

  private mounted(): void {
    this.$store.dispatch('reset')
    this.$store.dispatch('setSocketId', this.$socket.client.id)
    this.username = getPlayerUsername()
    if (getLoggedInCookie()) {
      this.goToNext()
      return
    }
  }

  private async onSubmit() {
    try {
      this.isPending = true
      await login({ username: this.username })
      this.$store.dispatch('setPlayerUsername', this.username)
      this.goToNext()
    } catch (err) {
      // @todo add snackbar
      console.log('Something went wrong')
    } finally {
      this.isPending = false
    }
  }

  private goToNext() {
    this.$router.push('home')
  }
}
</script>
