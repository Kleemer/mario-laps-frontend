<template>
  <VSelect
    :items="items"
    :value="value"
    label="Joueur"
    @change="onChange"
    />
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator'
import { User } from '@/types'

type FormState = Pick<User, 'username'> | null

export interface Props {
  value: FormState
}

@Component({ })
export default class PlayerSelector extends Vue {
  @Prop(String) public readonly value!: Props['value']

  private items: string[] = [ 'Ouzt', 'Alves', 'Nathou', 'Yass' ]

  private onChange(player: string) {
    this.$store.dispatch('setPlayer', player)
    localStorage.setItem('player', player)
  }
}
</script>