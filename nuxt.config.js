module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Website Ta`aruf Kopi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'api client fot taaruf api server' },
      { href:'https://fonts.googleapis.com/css?family=Material+Icons', rel : 'stylesheet'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  css : [
    'vue-awesome-notifications/dist/styles/style.css',
    "vue-material-design-icons/styles.css"
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
    '@nuxtjs/axios',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    ['@nuxtjs/pwa', { icon: true }],
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
    baseURL : process.env.BASE_URL || 'https://api.taaruf-kopi.com/api/'
  },
  workbox: {
    runtimeCaching: [
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: 'http://taaruf-kopi.cleverapps.io/.*',
        // Defaults to `networkFirst` if omitted
        handler: 'cacheFirst',
        // Defaults to `GET` if omitted
        method: 'GET',
        strategyOptions: {
          cacheName: 'taaruf-kopi-cache',
          cacheExpiration: {
            maxEntries: 10,
            maxAgeSeconds: 300
          }
        }
      }
    ]
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'mobile-web-app-capable', content: 'true' },
    { name: 'apple-mobile-web-app-capable', content: 'true' },
    { hid: 'description', name: 'description', content: 'api client fot taaruf api server' },
    { href:'https://fonts.googleapis.com/css?family=Material+Icons', rel : 'stylesheet'}
  ],
  // Plugin Config
  plugins: [
    {src: '~plugins/vee-validate.js', ssr: true},
    {src: '~plugins/vue-awesome-notification.js', ssr: false},
    {src: '~plugins/confirm-dialog.js', ssr :false},
    {src: '~plugins/use-component.js', ssr :false},
    {src: '~plugins/use-filter.js', ssr :  false},
  ],
  manifest: {
    name: 'Taaruf Kopi App',
    lang: 'fa'
  },
  /*
  ** Build configuration
  */
  build: {
    cssSourceMap: false,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    vendor:['axios','vee-validate','js-cookie']
  },
  env : {
    client_id : 2,
    client_secret : 'XXDSLS2OP2css0bUJBfN0wpNjEkrLl4ABxmAgJQS',
    grant_type : 'password',
    scope : '*',
    BASE_URL : 'https://api.taaruf-kopi.com/api/',
    DOMAIN_URL : 'https://api.taaruf-kopi.com/'
  }
}
