<template>
  <div>
    <HomeHero />
  </div>
</template>

<script>
// import { createClient } from '@/plugins/contentful'

export default {
  name: 'PageIndex',

  components: {
    HomeHero: () => import('@/components/home/HomeHero.vue'),
  },

  layout: 'full-bleed',

  head: () => ({
    title: 'Home',
  }),

  // async asyncData ({ $config }) {
  //   const client = createClient({
  //     space: $config.contentfulSpace,
  //     accessToken: $config.accessToken,
  //   })

  //   const page = await client.getEntry('1eqeDDZBR8gLF3HiFSy5o2')

  //   return {
  //     page,
  //   }
  // },
}
</script>
