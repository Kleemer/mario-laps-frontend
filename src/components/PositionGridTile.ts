import Vue from 'vue'
import { VCard, VImg } from 'vuetify/lib'
import { PositionScoreTuple } from '@/shared/score'
import './PositionGridTile.scss'

interface Props extends Record<string, any> {
  position?: PositionScoreTuple[0],
  selected?: boolean,
}

const provideDefaultClass = (classes: any, selected: Props['selected']): any[] => {
  return [ classes, 'position-grid-tile', selected ? 'info' : 'grey darken-3' ]
}

const provideClassImg = (selected: Props['selected']): any[] => {
  return [ 'position-grid-tile__image', { 'position-grid-tile__image--selected': selected } ]
}

export default Vue.extend<Props>({
  name: 'PositionGridTile',

  functional: true,

  props: {
    position: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  render(h, { data, props }) {
    return h(VCard, {
      ...data,
      class: provideDefaultClass(data.class, props.selected),
      props: { flat: true },
    },
    [
      genImg(h, props.position, props.selected),
    ],
    )
  },
})

const genImg = (h: Function, position: Props['position'], selected: Props['selected']) => {
  const publicPath = process.env.BASE_URL
  return h(VImg, {
    class: provideClassImg(selected),
    props: { src: `${publicPath}position/${position}.png`, contain: true },
  })
}
