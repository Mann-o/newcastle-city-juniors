<template>
  <NuxtChild />
</template>

<script>
export default {
  name: 'PageNewsAndEvents',

  scrollToTop: true,

  head: () => ({
    title: 'News & Events',
  }),
}
</script>
