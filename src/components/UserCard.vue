<template>
  <VCard outlined>
      <VImg :src="source" class="w-full" />
    {{ user }}
  </VCard>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator'
import { User } from '@/types'

export interface Props {
  user?: User;
}

@Component({ })
export default class UserCard extends Vue {
  @Prop(Object) public readonly user!: Props['user']

  private random = +(Math.floor(Math.random() * 10) % 2 === 0)

  private publicPath = process.env.BASE_URL


  private get source() {
    // @todo move images in asset
    return `${this.publicPath}sob${this.random + 1}.png`
  }
}
</script>
