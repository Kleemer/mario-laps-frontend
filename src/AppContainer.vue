<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VApp } from 'vuetify/lib'
import { Socket } from 'vue-socket.io-extended'
import {
  Component as ComponentType,
  CreateElement,
  VNode,
} from 'vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

@Component({ })
export default class AppContainer extends Vue {
  @Socket()
  private connect() {
    console.log('socket connected', this.$socket.client.id)
    this.$store.dispatch('setPlayerId', this.$socket.client.id)
  }

  @Socket()
  private addUser(event: any) {
    console.log('addUser', event)
    this.$store.dispatch('room/addUser', event)
  }

  @Socket()
  private removeUser(event: any) {
    console.log('removeUser', event)
    this.$store.dispatch('room/removeUser', event)
  }

  @Socket()
  private updateHostId(event: any) {
    console.log('updateHostId', event)
    this.$store.dispatch('room/setHostId', event)
  }

  @Socket()
  private startGame(event: any) {
    console.log('startGame', event)
    this.$store.dispatch('marioLap/setMarioLap', event)
    this.$router.push('game')
  }

  @Socket()
  private endGame(event: any) {
    console.log('endGame')
    this.$store.dispatch('marioLap/reset')
    this.$store.dispatch('room/reset')
    this.$router.push('/home')
    this.$socket.client.emit('leaveRoom', event)
  }

  @Socket()
  private updateStore(
    { action, data }: { action: string, data: Record<string, any>},
  ) {
    this.$store.dispatch(action, data)
  }

  public get layoutComponent(): ComponentType | null {
    if (this.$route?.meta?.layout === false) {
      return null
    }

    return this.$route?.meta?.layout || DefaultLayout
  }

  private render(h: CreateElement): VNode {
    const { layoutComponent } = this

    if (!layoutComponent) {
      return h('RouterView')
    }

    return h(
      layoutComponent,
      {
        scopedSlots: {
          default: () => h('RouterView'),
        },
      },
    )
  }
}
</script>

<style lang="scss">
@import "./assets/scss/app";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.v-application--wrap {
  align-items: center;
}

.v-content__wrap {
  max-width: 500px !important;
}
</style>
