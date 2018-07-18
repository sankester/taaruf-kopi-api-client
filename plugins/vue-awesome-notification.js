import Vue from "vue"
import VueAWN from "vue-awesome-notifications"

Vue.use(VueAWN, {
  position : 'top-right',
  icons: {
    prefix :'<i class="large material-icons">',
    suffix : '</i>',
    tip : 'help',
    alert : 'error',
    warning : 'warning',
    info : 'info',
    success : 'done',
    confirm : 'warning',
  },
})

