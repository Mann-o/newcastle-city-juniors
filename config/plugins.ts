import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

export const plugins: NuxtOptionsPlugin[] = [
  '@/plugins/vue-configuration',
  '@/plugins/contentful',
  '@/plugins/vee-validate',
  {
    src: '@/plugins/google-maps',
    ssr: true,
  },
  // '@/plugins/vue-accessible-modal',
]
