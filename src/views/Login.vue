<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Qui êtes-vous?
    </VCardTitle>
    <VCardText class="text-center">
      <UsernameSelector v-model="username"/>
      <VBtn
        :disabled="pending"
        :loading="pending"
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
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import UsernameSelector from '@/components/UsernameSelector.vue'

import { getRandomString } from '@/shared/string.js'
import { getPlayerUsername } from '@/shared/user.js'

import { login, logout } from '@/api/types/routes/auth'
import { createMarioLap } from '@/api/types/routes/mario-lap'

export default {
  name: 'home',
  components: {
    CenteredSmallCard,
    UsernameSelector,
  },
  data: () => ({
    pending: false,
    username: null,
  }),
  mounted() {
    this.$store.dispatch('reset')
    this.username = getPlayerUsername()
  },
  methods: {
    async onSubmit() {
      try {
        this.pending = true
        await login({ username: this.username })
        this.$store.dispatch('setPlayerUsername', this.username)
        if (this.$route.params.nextUrl) {
          this.$router.push(this.$route.params.nextUrl)
        } else {
          this.$router.push('home')
        }
      } catch (err) {
        // @todo add snackbar
        console.log('Something went wrong')
      } finally {
        this.pending = false
      }
    },
  },
}
</script>
