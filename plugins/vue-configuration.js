import Vue from 'vue'

import * as filters from '@/filters'

export default () => {
  Vue.config.productionTip = false
  Vue.config.devtools = (process.env.NODE_ENV !== 'production')

  Object
    .keys(filters)
    .forEach(filter => Vue.filter(filter, filters[filter]))
}
