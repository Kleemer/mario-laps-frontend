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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import CenteredSmallCard from '@/components/CenteredSmallCard.vue'
import RoomInput from '@/components/RoomInput.vue'

@Component({
  components: {
    CenteredSmallCard,
    RoomInput,
  },
})
export default class JoinRoom extends Vue {
  private onCancel(): void {
    this.$router.push('home')
  }
}
</script>
