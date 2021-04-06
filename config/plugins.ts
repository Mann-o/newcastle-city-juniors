import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

export const plugins: NuxtOptionsPlugin[] = [
  '@/plugins/contentful',
  '@/plugins/google-maps',
]
