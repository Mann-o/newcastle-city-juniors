import { NuxtOptionsRouter } from '@nuxt/types/config/router'

export const router: NuxtOptionsRouter = {
  base: '/',

  middleware: [
    'close-mobile-navigation',
    'collapse-all-navigation',
  ],

  // extendRoutes (routes) {
  //   routes.push({

  //   })
  // },
}
