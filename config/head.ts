import { NuxtOptionsHead } from '@nuxt/types/config/head'
import { headMeta } from './head.meta'

export const head: NuxtOptionsHead = {
  htmlAttrs: {
    lang: 'en',
  },

  // title: 'Newcastle City Juniors',
  titleTemplate: '%s :: Newcastle City Juniors',

  meta: headMeta,

  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#fbbe24',
    },
  ],

  noscript: [{
    innerHTML: `
      <h1>Javascript Disabled</h1>
      <p>It appears that you do not have Javascript enabled. The Newcastle City Juniors website relies on Javascript for the majority of our features.<p>
      <p>Please enable Javascript and <a href=".">reload</a> in order to use our website.</p>
    `,
  }],
}
