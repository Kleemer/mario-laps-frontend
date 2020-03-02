import Vue from 'vue'
import { VCard, VRow, VCol } from 'vuetify/lib'
import { PositionScoreTuple } from '@/shared/score'
import PositionGridTile from './PositionGridTile'
import './PositionGrid.scss'

interface Props extends Record<string, any> {
  selected?: PositionScoreTuple[0],
}

const provideDefaultClass = (classes: any): any[] => {
  return [ classes, 'position-grid' ]
}

export default Vue.extend<Props>({
  name: 'PositionGrid',

  functional: true,

  props: {
    selected: {
      type: Number,
      default: 0,
    },
  },

  render(h, { data, props }) {
    return h(VCard, {
      ...data,
      class: provideDefaultClass(data.class),
      props: { flat: true },
    },
    [
      genFirstRow(h, props.selected),
      genSecondRow(h, props.selected),
      genThirdRow(h, props.selected),
    ],
    )
  },
})

const genTile = (h: Function, position: number, selected: boolean) => {
  return h(VCol, {
    props: { cols: 3 },
  }, [
    h(
      PositionGridTile,
      { props: { position, selected } },
    ),
  ])
}

const genRow = (h: Function, selected: Props['selected'], column: number) => {
  const firstPosition = (column - 1) * 4 + 1
  return h(VRow, {}, [
    genTile(h, firstPosition, selected === firstPosition),
    genTile(h, firstPosition + 1, selected === firstPosition + 1),
    genTile(h, firstPosition + 2, selected === firstPosition + 2),
    genTile(h, firstPosition + 3, selected === firstPosition + 3),
  ])
}

const genFirstRow = (h: Function, selected: Props['selected']) => {
  return genRow(h, selected, 1)
}

const genSecondRow = (h: Function, selected: Props['selected']) => {
  return genRow(h, selected, 2)
}

const genThirdRow = (h: Function, selected: Props['selected']) => {
  return genRow(h, selected, 3)
}
