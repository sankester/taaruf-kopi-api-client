module.exports = {
  mode : "universal",
  /*
  ** Headers of the page
  */
  head: {
    title: 'Admin Ta`aruf Kopi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'api client fot taaruf api server' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css : [
    'vue-awesome-notifications/dist/styles/style.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Module Config
  */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios'
  ],
  // vuetify module config
  vuetify: {
    // Vuetify options
    theme: {
      primary: '#00897B',
      secondary: '#26A69A',
      accent: '#29B6F6',
      error: '#b71c1c'
    }
  },
  // axios module config
  axios: {
    baseURL : process.env.BASE_URL || 'http://api.taaruf-kopi.com/api/'
  },
  // Plugin Config
  plugins: [
    {src: '~plugins/vee-validate.js', ssr: true},
    {src: '~plugins/vue-awesome-notification.js', ssr: false},
    {src: '~plugins/confirm-dialog.js', ssr :false},
    {src: '~plugins/vue2-editor.js', ssr :false},
  ],
  /*
  ** Build configuration
  */
  build: {
    cssSourceMap: false,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    },
    vendor:['axios','vee-validate','js-cookie']
  },
  env : {
    client_id : 2,
    client_secret : 'XXDSLS2OP2css0bUJBfN0wpNjEkrLl4ABxmAgJQS',
    grant_type : 'password',
    scope : '*',
    BASE_URL : 'http://api.taaruf-kopi.com/api/'
  }
}
