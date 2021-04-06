export interface NuxtOptionsAxios {
  baseURL?: string
  browserBaseURL?: string
  https?: boolean
  progress?: boolean,
  proxy?: boolean
  retry?: boolean | {
    retries: number
  }
  debug?: boolean
  proxyHeaders?: boolean
  proxyHeadersIgnore?: string[]
}
