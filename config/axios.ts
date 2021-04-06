import { NuxtOptionsAxios } from '@/types/config'

export const axios: NuxtOptionsAxios = {
  // baseURL: process.env.BACKEND_URL,
  proxy: true,
  debug: (process.env.DEBUG === 'true'),
  retry: true,
}
