<template>
  <footer class="bg-black text-white pt-16 pb-4">
    <div class="container mx-auto lg:grid lg:grid-flow-col lg:auto-cols-fr lg:gap-16">
      <AboutUs />
      <UsefulLinks />
      <PlayerRegistration />
    </div>
    <div class="container px-8 text-center mx-auto border-t border-grey pt-4 mt-16 text-sm md:px-0 md:flex md:justify-between">
      <CopyrightNotice />
      <SocialLinks />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',

  components: {
    AboutUs: () => import('./AboutUs.vue'),
    UsefulLinks: () => import('./UsefulLinks.vue'),
    PlayerRegistration: () => import('./PlayerRegistration.vue'),
    CopyrightNotice: () => import('./CopyrightNotice.vue'),
    SocialLinks: () => import('@/components/social-links/SocialLinks.vue'),
  },
}
</script>
