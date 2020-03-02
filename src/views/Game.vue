<template>
  <div class="pa-4">
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
    <PositionGrid
      :selected="positionGridValue"
      @change="onChange"/>
  </div>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RaceInfoCard from '@/components/RaceInfoCard'
import PositionGrid from '@/components/PositionGrid'

export default {
  name: 'game',
  components: {
    CenteredSmallCard,
    RaceInfoCard,
    PositionGrid,
  },
  data: () => ({
    isPending: false,
    positionGridValue: 0,
  }),
  computed: {
    username() {
      return this.$store.state.player.username
    },
  },
  methods: {
    onChange(position) {
      this.positionGridValue = position
    },
  },
}
</script>
