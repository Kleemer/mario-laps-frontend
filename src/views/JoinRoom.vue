<template>
  <CenteredSmallCard>
    <VCardTitle class="justify-center font-weight-bold headline">
      Entrez le code:
    </VCardTitle>
    <VCardText>
      <RoomInput/>
    </VCardText>
    <VCardActions>
      <VSpacer/>
      <VBtn
        class="caption"
        color="transparent"
        depressed
        small
        @click="onCancel">
        Annuler
      </VBtn>
      <VSpacer/>
    </VCardActions>
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
  methods: {
    onCancel() {
      this.$router.push('home')
    },
  },
}
</script>
