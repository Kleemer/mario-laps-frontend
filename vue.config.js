const ENV = process.env
const REST_API_HOST = `${ENV.VUE_APP_API_PROTOCOL}${ENV.VUE_APP_API_HOST}:${ENV.VUE_APP_API_PORT}`

module.exports = {
  transpileDependencies: [ "vuetify" ],
  chainWebpack: config => {
    ;[ 'vue-modules', 'vue', 'normal-modules', 'normal' ].forEach((match) => {
      config.module.rule('sass').oneOf(match).use('sass-loader').tap(opt => ({
        ...opt,
        additionalData: "@import '@/assets/scss/_variables.scss'",
      }))
    })

    config.plugins.delete('prefetch')
  },
  devServer: {
    proxy: {
      '^/api': {
        target: REST_API_HOST,
      },
    }
  },
  css: {
    loaderOptions: {
      scss: {
        implementation: require('sass'),
        additionalData: "@import '@/assets/scss/_variables.scss';",
      }
    },
  },
}
