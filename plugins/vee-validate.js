import Vue from 'vue'
import VeeValidate from 'vee-validate'
import localeID from 'vee-validate/dist/locale/id';

Vue.use(VeeValidate, {
  locale : 'id',
  dictionary: {
    id: localeID
  },
  inject: true
})
