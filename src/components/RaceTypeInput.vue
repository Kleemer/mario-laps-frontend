<template>
  <VBottomSheet
    v-model="isVisible"
    persistent
    scrollable
    width="300">
    <template v-slot:activator="{ on }">
      <VImg
        v-on="on"
        v-show="value"
        :disabled="disabled"
        :src="getRaceTypeImg(value)" />
      <VBtn
        v-on="on"
        v-show="!value"
        :disabled="disabled"
        depressed
        x-large>
        Circuit...
      </VBtn>
    </template>
    <VCard
      flat
      class="py-2 px-0">
      <VCardTitle class="justify-center font-weight-bold">
        Sélection du circuit
        <VBtn
          :disabled="isPending"
          :loading="isPending"
          icon
          small
          @click="onClose">
          <VIcon small>
            mdi-close-circle-outline
          </VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText class="text-center">
        <VRow>
          <template v-for="raceType in RACE_TYPES">
            <VCol
              :key="raceType.id"
              cols="6">
              <VImg
                :src="getRaceTypeImg(raceType.id)"
                :class="{
                  'race-type-input__image': true,
                  'race-type-input__image--selected': raceType.id === internalValue
                }"
                :disabled="isPending"
                @click="onClick(raceType.id)" />
              <div class="subheading">
                {{ raceType.name }}
              </div>
            </VCol>
          </template>
        </VRow>
      </VCardText>
    </VCard>
  </VBottomSheet>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { RACE_TYPES } from '@/shared/race'
import { getRandomString } from '@/shared/string'
import { Race, RaceType } from '@/types'
import { updateRaceType } from '@/api/routes/race-type'
import { Maybe } from '@/api'

@Component({ })
export default class RaceTypeInput extends Vue {
  @Prop(String) public readonly raceId!: Race['id']
  @Prop(String) public readonly value!: Maybe<RaceType['id']>
  @Prop({ type: Boolean, default: false }) public readonly disabled!: boolean

  private RACE_TYPES: typeof RACE_TYPES = RACE_TYPES
  private publicPath: string = process.env.BASE_URL

  private isVisible: boolean = false
  private isPending: boolean = false
  private internalValue: Maybe<RaceType['id']> = this.value

  private getRaceTypeImg(raceTypeId: RaceType['id']): string {
    return `${this.publicPath}race-types/${raceTypeId}.png`
  }

  private onClick(raceTypeId: RaceType['id']): void {
    this.internalValue = this.internalValue !== raceTypeId ? raceTypeId : null
  }

  private async onClose(): Promise<void> {
    if (this.value === this.internalValue) {
      this.isVisible = false
      return
    }

    try {
      this.isPending = true
      const race = await updateRaceType(
        this.raceId,
        { raceTypeId: this.internalValue },
      )

      if (race) {
        console.log('race', race)
        this.$socket.client.emit('updateStore', {
          action: 'races/updateRace',
          data: {
            raceId: this.raceId,
            data: { raceType: race.raceType },
          },
        })
        this.isVisible = false
      } else {
        // @todo handle error
      }

    } catch (err) {
      console.trace('Something went wrong', err)
    } finally {
      this.isPending = false
    }
  }
}
</script>

<style lang="scss" scoped>
.race-type-input {
  &__image {
    border: solid;
    border-color: transparent;
    &--selected {
      border-color: white;
    }
  }
}
</style>
