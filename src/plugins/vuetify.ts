import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fr from 'vuetify/src/locale/fr'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.base,
        success: '#7adb89',
        info: '#84bdff',
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
