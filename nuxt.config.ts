import { auth } from './config/auth'
import { axios } from './config/axios'
import { build } from './config/build'
import { buildModules } from './config/build-modules'
import { css } from './config/css'
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
import { vue } from './config/vue'

export default {
  auth,
  axios,
  build: Object.assign({
    watch: ['config'],
  }, build),
  buildModules,
  css,
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
  vue,
}
