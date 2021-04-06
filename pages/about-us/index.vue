<template>
  <p>About Us (Index)</p>
</template>

<script>
// import { createClient } from '@/plugins/contentful'

export default {
  name: 'PageAboutUsIndex',

  head: () => ({
    title: 'About Us',
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
