import { NuxtOptionsRender } from '@nuxt/types/config/render'

export const render: NuxtOptionsRender = {
  http2: {
    push: true,
  },
}
