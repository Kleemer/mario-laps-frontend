import Vue from 'vue'
import { VCard, VCardText, VCardActions, VSpacer } from 'vuetify/lib'
import { ScoreTuple } from '@/shared/score'
import { getRankState } from '@/shared/rank'
import './RaceInfoCard.scss'

interface BadgeProps extends Record<string, any> {
  icon?: string,
  value?: string,
  color?: string,
}

interface Props extends Record<string, any> {
  mainLabel: number;
  topLabel: ScoreTuple[0] | ScoreTuple[1] | number;
  bottomLabel: string;
  rank: boolean;
  badge: BadgeProps;
}

const provideDefaultClass = (classes: any): any[] => {
  return [ classes, 'race-info-card' ]
}

const provideDefaultClassMainLabel = (): any[] => {
  return [
    'race-info-card__main-label',
    'display-2',
    'font-weight-bold',
  ]
}

const provideDefaultClassMainLabelSuffix = (mainLabel: Props['mainLabel']): any[] => {
  return [
    'race-info-card__main-label__suffix',
    'body-2',
    'font-weight-bold',
    { 'no-right': mainLabel > 9 },
  ]
}

const provideDefaultClassTopLabel = (topLabel: Props['topLabel']): any[] => {
  return [ 'caption font-weight-bold', 'race-info-card__top-label', {
    'hidden': topLabel === 0,
  } ]
}

export default Vue.extend<Props>({
  name: 'RaceInfoCard',

  functional: true,

  props: {
    mainLabel: {
      type: Number,
      default: 0,
    },
    topLabel: {
      type: Number,
      default: 0,
    },
    bottomLabel: {
      type: String,
      default: '',
    },
    rank: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Object,
      default: {},
    },
  },



  render(h, { data, props }) {
    return h(VCard, {
      ...data,
      class: provideDefaultClass(data.class),
      props,
    }, [
      genTopLabel(h, props.topLabel, props.rank),
      genMainLabel(h, props.mainLabel, props.rank),
      genBottomLabel(h, props.bottomLabel),
    ],
    )
  },
})

const genTopLabel = (h: Function, topLabel: Props['topLabel'], rank: Props['rank']) => {
  let internalValue: number | string = topLabel
  if (rank) {
    internalValue = getRankState(topLabel)
  }

  let topLabelNumber = internalValue
  if (typeof internalValue === 'number') {
    topLabelNumber = `+${topLabelNumber}`
  }

  return h(VCardText, {
    class: [ 'text-center pt-1 pb-0' ],
  }, [
    h('div', {
      class: provideDefaultClassTopLabel(topLabel),
    }, topLabelNumber),
  ])
}

const genMainLabel = (
  h: Function,
  mainLabel: Props['mainLabel'],
  rank: Props['rank'],
) => {
  return h(VCardText, {
    class: [ 'text-center py-0' ],
  }, [
    h('div', {
      class: provideDefaultClassMainLabel(),
    }, [
      rank ? mainLabel || '-' : mainLabel,
      rank && mainLabel ? genMainLabelSuffix(h, mainLabel) : undefined,
    ]),
  ])
}

const genMainLabelSuffix = (h: Function, mainLabel: Props['mainLabel']) => {
  let suffix = 'e'
  if (mainLabel === 1) {
    suffix = 'er'
  }

  return h('span', {
    class: provideDefaultClassMainLabelSuffix(mainLabel),
  }, suffix)
}

const genBottomLabel = (h: Function, bottomLabel: String) => {
  return h(VCardActions, {
    class: [ 'py-0' ],
  }, [
    h(VSpacer),
    bottomLabel,
    h(VSpacer),
  ])
}
