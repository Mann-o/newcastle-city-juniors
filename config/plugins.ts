import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

export const plugins: NuxtOptionsPlugin[] = [
  '@/plugins/vue-configuration',
  '@/plugins/contentful',
  {
    src: '@/plugins/google-maps',
    ssr: true,
  },
]
