<template>
  <div class="ncj-app">
    <MainHeader />
    <Nuxt />
    <MainFooter />
    <BackToTop />
    <AppOverlay />
    <MiniCart />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',

  components: {
    MainHeader: () => import('@/components/layout/main-header/MainHeader.vue'),
    MainFooter: () => import('@/components/layout/main-footer/MainFooter.vue'),
    BackToTop: () => import('@/components/layout/overlay/BackToTop.vue'),
    AppOverlay: () => import('@/components/layout/overlay/AppOverlay.vue'),
    MiniCart: () => import('@/components/layout/mini-cart/MiniCart.vue'),
  },
}
</script>
