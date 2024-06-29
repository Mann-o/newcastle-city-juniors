<template>
  <div>
    <h1>NCJ Portal</h1>
    <PortalNavigation />
    <NuxtChild />
  </div>
</template>

<script>
export default {
  name: 'PagePortalIndex',

  components: {
    PortalNavigation: () => import('@/components/portal/PortalNavigation.vue'),
  },

  scrollToTop: true,

  head: () => ({
    title: 'NCJ Portal',
  }),

  middleware: 'auth',
}
</script>
