<template>
  <header>
    <PromoBanner />
    <MainNavigation />
  </header>
</template>

<script>
export default {
  name: 'MainHeader',

  components: {
    PromoBanner: () => import('./PromoBanner.vue'),
    MainNavigation: () => import('./MainNavigation.vue'),
  },
}
</script>
