<template>
  <div class="py-80">
    <p>Home</p>
    <!-- <pre>{{ page }}</pre> -->
  </div>
</template>

<script>
// import { createClient } from '@/plugins/contentful'

export default {
  name: 'PageIndex',

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
