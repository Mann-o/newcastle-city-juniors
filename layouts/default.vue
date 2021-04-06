<template>
  <div class="ncj-app">
    <MainHeader />
    <div class="py-8 px-4 container mx-auto lg:pt-32 lg:pb-24 lg:px-0">
      <Nuxt />
    </div>
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
