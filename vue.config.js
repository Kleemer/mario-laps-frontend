module.exports = {
  transpileDependencies: [ "vuetify" ],
  chainWebpack: config => {
    ;[ 'vue-modules', 'vue', 'normal-modules', 'normal' ].forEach((match) => {
      config.module.rule('sass').oneOf(match).use('sass-loader').tap(opt => ({
        ...opt,
        prependData: "@import '@/assets/scss/_variables.scss'",
      }))
    })

    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      scss: {
        implementation: require('sass'),
        prependData: "@import '@/assets/scss/_variables.scss';",
      }
    },
  },
}