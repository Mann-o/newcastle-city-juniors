<template>
  <div class="ncj-app">
    <MainHeader />
    <div class="py-8 px-4 container mx-auto lg:pt-32 lg:pb-24 lg:px-0">
      <Nuxt />
    </div>
    <MainFooter />
    <BackToTop />
    <AppOverlay />
    <MiniCart />
    <NotificationList />
    <VueAccessibleModal
      @show="disablePageScrolling()"
      @close="enablePageScrolling()"
    />
  </div>
</template>

<script>
import 'vue-accessible-modal/dist/index.css';

import { mapActions } from 'vuex'

export default {
  name: 'LayoutDefault',

  components: {
    MainHeader: () => import('@/components/layout/main-header/MainHeader.vue'),
    MainFooter: () => import('@/components/layout/main-footer/MainFooter.vue'),
    BackToTop: () => import('@/components/layout/overlay/BackToTop.vue'),
    AppOverlay: () => import('@/components/layout/overlay/AppOverlay.vue'),
    MiniCart: () => import('@/components/layout/mini-cart/MiniCart.vue'),
    NotificationList: () => import('~/components/notifications/NotificationList.vue'),
  },

  data: () => ({
    savedScrollPosition: 0,
  }),

  methods: {
    ...mapActions('app', [
      'showOverlay',
      'hideOverlay',
    ]),
    enablePageScrolling() {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, this.savedScrollPosition);
      this.savedScrollPosition = 0;
    },
    disablePageScrolling() {
      this.savedScrollPosition = window.scrollY;
      document.body.style.overflow = 'hidden';
    },
  },
}
</script>
