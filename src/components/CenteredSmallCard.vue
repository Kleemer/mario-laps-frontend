<template>
  <VContainer class="fill-height">
    <VRow
      class="fill-height"
      align="center"
      justify="center">
      <div :style="{ width: '450px' }" class="text-left">
        <VBtn
          v-if="to"
          :to="to"
          color="primary"
          small
          class="ml-0 mb-2 white--text">
          <VIcon>mdi-chevron-left</VIcon>
          Retour
        </VBtn>
        <VCard
          :width="450"
          flat
          class="py-2 px-0">
          <VCardText>
            <slot />
          </VCardText>
        </VCard>
      </div>
    </VRow>
  </VContainer>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator'

@Component({ })
export default class CenteredSmallCard extends Vue {
  @Prop([ Object, String ]) public readonly to!: string | { name: string }
}
</script>
