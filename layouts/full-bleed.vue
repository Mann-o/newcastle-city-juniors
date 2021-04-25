<template>
  <div class="ncj-app">
    <MainHeader />
    <Nuxt />
    <MainFooter />
    <BackToTop />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',

  components: {
    MainHeader: () => import('@/components/layout/main-header/MainHeader.vue'),
    MainFooter: () => import('@/components/layout/main-footer/MainFooter.vue'),
    BackToTop: () => import('@/components/layout/overlay/BackToTop.vue'),
  },
}
</script>
