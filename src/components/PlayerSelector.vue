<template>
  <VSelect
    :items="items"
    v-model="player"
    label="T ki"
    @change="onChange"
    />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      player: null as string | null,
      items: [ 'Ouzt', 'Alves', 'Nathou', 'Yass' ] as string[],
    }
  },
  created() {
    const existingPlayer = localStorage.getItem('player')
    if (existingPlayer) {
      this.player = existingPlayer
      this.onChange(existingPlayer)
    }
  },
  methods: {
    onChange(player: string) {
      this.$store.dispatch('SET_PLAYER', player)
      localStorage.setItem('player', player)
    },
  },
})
</script>