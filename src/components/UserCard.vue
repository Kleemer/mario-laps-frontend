<template>
  <VCard shaped :outlined="playerUsername !== user.username">
      <VImg :src="source" class="w-full" />
      <VCardText class="text-start">
        <VIcon v-if="hostId === user.id">
          mdi-crown-outline
        </VIcon>
          {{ user.username }}
      </VCardText>
  </VCard>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator'
import { User } from '@/types/models'

export interface Props {
  user?: User;
}

@Component({ })
export default class UserCard extends Vue {
  @Prop(Object) public readonly user!: Props['user']

  // @ts-ignore
  private random: number = +(this.user.id.charCodeAt(this.user.id.length - 1) % 2 === 0)

  private publicPath = process.env.BASE_URL

  private get hostId() {
    return this.$store.state.room.hostId
  }

  private get playerUsername() {
    return this.$store.state.user.username
  }

  private get source() {
    // @todo move images in asset
    return `${this.publicPath}sob${this.random + 1}.png`
  }
}
</script>
