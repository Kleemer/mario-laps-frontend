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
export default class UsernameSelector extends Vue {
  @Prop(String) public readonly value!: Props['value']

  // @todo use API user list
  private items: string[] = [ 'Ouzt', 'Pandalves', 'Nathou', 'Yass' ]

  private onChange(username: string) {
    localStorage.setItem('username', username)
    this.$emit('input', username)
  }
}
</script>
