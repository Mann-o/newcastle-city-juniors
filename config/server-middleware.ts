import { NuxtOptionsServerMiddleware } from '@nuxt/types/config/server-middleware'

export const serverMiddleware: NuxtOptionsServerMiddleware[] = [
  '~/server-middleware/disable-external-iframes',
]
