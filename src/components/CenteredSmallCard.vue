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
          text
          color="primary"
          small
          class="ml-0 mb-2">
          <VIcon>mdi-chevron-left</VIcon>
          Back {{ backLabel ? 'to' : '' }} {{ backLabel }}
        </VBtn>
        <VCard
          :width="450"
          class="pa-4">
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
  @Prop(String) public readonly backLabel!: string
}
</script>
