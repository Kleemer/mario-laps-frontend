import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fr from 'vuetify/src/locale/fr'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#62c87a',
        info: '#4c98d5',
        error: '#d85745',
      },
    },
  },
  lang: {
    locales: { fr },
    current: 'fr',
  },
  icons: {
    iconfont: 'mdi',
  },
})
