import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator'
import { VCard, VImg } from 'vuetify/lib'
import { PositionScoreTuple } from '@/shared/score'
import './PositionGridTile.scss'

interface Props extends Record<string, any> {
  position?: PositionScoreTuple[0],
  selected?: boolean,
  disabled?: boolean,
}

const provideDefaultClass = (classes: any, selected: Props['selected'], disabled: Props['disabled']): any[] => {
  return [
    classes,
    'position-grid-tile',
    selected ? 'info' : 'blue-grey darken-4',
    disabled && 'position-grid-tile--disabled',
  ]
}

const provideClassImg = (selected: Props['selected']): any[] => {
  return [ 'position-grid-tile__image', { 'position-grid-tile__image--selected': selected } ]
}

@Component({ components: { VCard, VImg } })
export default class PositionGridTile extends Vue {
  @Prop(Number) private readonly position?: Props['position']
  @Prop({ type: Boolean, default: false }) private readonly selected?: Props['selected']
  @Prop({ type: Boolean, default: false }) private readonly disabled?: Props['disabled']

  private render(h: Function) {
    const vnode = this.$vnode.data

    const listeners = {
      ...this.$listeners,
    }

    if (!this.disabled) {
      listeners.click = ($event: Event) => {
        $event.stopPropagation()
        this.$emit('input', this.position)
      }
    }

    return h(VCard, {
      class: provideDefaultClass(vnode?.class, this.selected, this.disabled),
      props: { flat: true },
      on: listeners,
    },
    [
      this.genImg(h, this.position, this.selected),
    ],
    )
  }

  private genImg = (h: Function, position: Props['position'], selected: Props['selected']) => {
    const publicPath = process.env.BASE_URL
    return h(VImg, {
      class: provideClassImg(selected),
      props: { src: `${publicPath}position/${position}.png`, contain: true },
    })
  }
}
