<template>
  <NuxtChild />
</template>

<script>
export default {
  name: 'PageAboutUs',

  scrollToTop: true,

  head: () => ({
    title: 'About Us',
  }),
}
</script>
