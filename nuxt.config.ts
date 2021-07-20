import { NuxtConfig } from '@nuxt/types'
import { auth } from './config/auth'
import { axios } from './config/axios'
import { build } from './config/build'
import { buildModules } from './config/build-modules'
import { fontawesome } from './config/font-awesome'
import { googleFonts } from './config/google-fonts'
import { head } from './config/head'
import { modules } from './config/modules'
import { plugins } from './config/plugins'
import { privateRuntimeConfig } from './config/private-runtime-config'
import { proxy } from './config/proxy'
import { publicRuntimeConfig } from './config/public-runtime-config'
import { pwa } from './config/pwa'
import { render } from './config/render'
import { router } from './config/router'
import { sentry } from './config/sentry'
import { server } from './config/server'
import { serverMiddleware } from './config/server-middleware'
import { tailwindcss } from './config/tailwindcss'
import { vue } from './config/vue'

const config: NuxtConfig = {
  auth,
  axios,
  build: Object.assign({
    watch: ['config'],
  }, build),
  buildModules,
  components: false,
  fontawesome,
  googleFonts,
  head,
  modern: process.env.NODE_ENV === 'production',
  modules,
  plugins,
  privateRuntimeConfig,
  proxy,
  publicRuntimeConfig,
  pwa,
  render,
  router,
  sentry,
  server,
  serverMiddleware,
  tailwindcss,
  vue,
}

export default config
