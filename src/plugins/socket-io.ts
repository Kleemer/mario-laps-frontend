import { VueConstructor } from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_SOCKET_URL)

export default (Vue: VueConstructor): void => {
    Vue.use(VueSocketIOExt, socket)
}

