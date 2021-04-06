import { Middleware } from '@nuxt/types'

const collapseAllNavigation: Middleware = ({ store }) => {
  store.dispatch('routes/collapseAll')
}

export default collapseAllNavigation
