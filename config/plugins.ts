import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin'

export const plugins: NuxtOptionsPlugin[] = [
  '@/plugins/vue-configuration',
  '@/plugins/contentful',
  '@/plugins/vee-validate',
  // '@/plugins/persisted-state',
  '@/plugins/vue-accessible-modal',
]
