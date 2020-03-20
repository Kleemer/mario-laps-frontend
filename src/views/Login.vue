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

<script>
import CenteredSmallCard from '../components/CenteredSmallCard.vue'
import UsernameSelector from '../components/UsernameSelector.vue'

import { getRandomString } from '@/shared/string'
import { getPlayerUsername } from '../shared/user'
import { getLoggedInCookie } from '../shared/auth'

import { login, logout } from '@/api/types/routes/auth'

export default {
  name: 'home',
  components: {
    CenteredSmallCard,
    UsernameSelector,
  },
  data: () => ({
    isPending: false,
    username: null,
  }),
  mounted() {
    this.$store.dispatch('reset')
    this.username = getPlayerUsername()
    if (getLoggedInCookie()) {
      this.goToNext()
      return
    }
  },
  methods: {
    async onSubmit() {
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
    },
    goToNext() {
      this.$router.push('home')
    },
  },
}
</script>
