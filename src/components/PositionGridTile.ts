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
}

const provideDefaultClass = (classes: any, selected: Props['selected']): any[] => {
  return [ classes, 'position-grid-tile', selected ? 'info' : 'blue-grey darken-4' ]
}

const provideClassImg = (selected: Props['selected']): any[] => {
  return [ 'position-grid-tile__image', { 'position-grid-tile__image--selected': selected } ]
}

@Component({ components: { VCard, VImg } })
export default class PositionGridTile extends Vue {
  @Prop(Number) private readonly position?: Props['position']
  @Prop({ type: Boolean, default: false }) private readonly selected?: Props['selected']

  private render(h: Function) {
    const vnode = this.$vnode.data

    return h(VCard, {
      class: provideDefaultClass(vnode?.class, this.selected),
      props: { flat: true },
      on: {
        ...this.$listeners,
        'click': ($event: Event) => {
          $event.stopPropagation()
          this.$emit('input', this.position)
        },
      },
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
