<template>
  <CenteredSmallCard to="/">
    <VCardTitle class="justify-center font-weight-bold headline">
      Rejoindre un Mario Lap
    </VCardTitle>
    <VCardText>
      <RoomInput/>
    </VCardText>
  </CenteredSmallCard>
</template>

<script>
import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RoomInput from '@/components/RoomInput.vue'

export default {
  name: 'join-room',
  components: {
    CenteredSmallCard,
    RoomInput,
  },
}
</script>
