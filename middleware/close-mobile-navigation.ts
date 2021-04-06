import { Middleware } from '@nuxt/types'

const closeMobileNavigation: Middleware = ({ store }) => {
  store.dispatch('mobile-navigation/close')
}

export default closeMobileNavigation
