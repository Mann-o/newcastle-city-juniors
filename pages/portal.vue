<template>
  <NuxtChild />
</template>

<script>
export default {
  name: 'PagePortal',

  scrollToTop: true,

  head: () => ({
    title: 'NCJ Portal',
  }),

  middleware: 'auth',
}
</script>
