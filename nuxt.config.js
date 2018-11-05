const pkg = require('./package')

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  /*
  ** Nuxt.js modules
  */
  middleware: ['middleware/feathers.js'],
  modules: [
    [
      '@nuxtjs/pwa',
      'nuxt-feathers-vuex',
      'bootstrap-vue/nuxt',
      {
        url: 'http://localhost:3030',
        id: '_id',
        userService: 'users',
        authModule: 'auth',
        cookie: 'feathers-jwt',
        plugin: true,
        generate: true,
        verbose: true,
        services: ['Devices']
      }
    ],
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
//  buildDir: 'src-cordova/www',

  build: {
    /*
    ** You can extend webpack config here
    */
//  publicPath: './src-cordova/www',
  // generate: {
  //   dir: './src-cordova/www'
  // },
  

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  generate: {
    dir: 'src-cordova/www'
  }
}
