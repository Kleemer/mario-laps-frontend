import { VueConstructor } from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

export default (Vue: VueConstructor): void => {
    Vue.use(VueSocketIOExt, socket)
}

