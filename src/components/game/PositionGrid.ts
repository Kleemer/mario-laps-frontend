import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator'
import { VCard, VRow, VCol } from 'vuetify/lib'
import { PositionScoreTuple } from '@/shared/score'
import PositionGridTile from './PositionGridTile'
import './PositionGrid.scss'

interface Props extends Record<string, any> {
  selected?: PositionScoreTuple[0],
  disabled?: Array<PositionScoreTuple[0]>,
}

const provideDefaultClass = (classes: any): any[] => {
  return [ classes, 'position-grid' ]
}

@Component({ components: { VCard, VRow, VCol } })
export default class PositionGrid extends Vue {
  @Prop({ type: Number, default: 0 }) private readonly selected?: Props['selected']
  @Prop({ type: Array, default: () => [] }) private readonly disabled?: Props['disabled']

  private render(h: Function) {
    const vnode = this.$vnode.data

    return h(VCard, {
      class: provideDefaultClass(vnode?.class),
      props: { flat: true },
    },
    [
      this.genFirstRow(h, this.selected),
      this.genSecondRow(h, this.selected),
      this.genThirdRow(h, this.selected),
    ],
    )
  }

  private genTile = (h: Function, position: number, selected: boolean) => {
    return h(VCol, {
      props: { cols: 3 },
    }, [
      h(
        PositionGridTile,
        {
          props: { position, selected, disabled: this.disabled?.includes(position) },
          on: {
            ...this.$listeners,
            'input': (position: number) => {
              this.onInput(position)
            },
          },
        },
      ),
    ])
  }

  private genRow = (h: Function, selected: Props['selected'], column: number) => {
    const firstPosition = (column - 1) * 4 + 1
    return h(VRow, {}, [
      this.genTile(h, firstPosition, selected === firstPosition),
      this.genTile(h, firstPosition + 1, selected === firstPosition + 1),
      this.genTile(h, firstPosition + 2, selected === firstPosition + 2),
      this.genTile(h, firstPosition + 3, selected === firstPosition + 3),
    ])
  }

  private genFirstRow = (h: Function, selected: Props['selected']) => {
    return this.genRow(h, selected, 1)
  }

  private genSecondRow = (h: Function, selected: Props['selected']) => {
    return this.genRow(h, selected, 2)
  }

  private genThirdRow = (h: Function, selected: Props['selected']) => {
    return this.genRow(h, selected, 3)
  }

  private onInput(position: number) {
    this.$emit('change', position)
  }
}
