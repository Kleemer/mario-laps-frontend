<template>
  <div v-if="true" class="pa-4">
      <VRow>
        <VCol cols="4">
          <RaceInfoCard
            :mainLabel="10"
            bottomLabel="Score"/>
        </VCol>
        <VCol cols="4">
          <RaceInfoCard
            :topLabel="2"
            :mainLabel="11"
            bottomLabel="Laps"/>
        </VCol>
        <VCol cols="4">
          <RaceInfoCard
            :mainLabel="0"
            rank
            bottomLabel="Rang"/>
        </VCol>
      </VRow>
  </div>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RaceInfoCard from '@/components/RaceInfoCard'

export default {
  name: 'game',
  components: {
    CenteredSmallCard,
    RaceInfoCard,
  },
  data: () => ({
    isPending: false,
  }),
  computed: {
    username() {
      return this.$store.state.player.username
    },
  },
}
</script>
