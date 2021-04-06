<template>
  <div class="bg-gold py-3 px-4 text-xs md:px-0 md:text-sm">
    <div class="container mx-auto flex justify-between">
      <a
        class="text-black hover:text-black"
        href="mailto:info@newcastlecityjuniors.co.uk"
      >
        <FontAwesomeIcon :icon="['fal', 'envelope']" />
        <span class="ml-2">info@newcastlecityjuniors.co.uk</span>
      </a>
      <SocialLinks light />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoBanner',

  components: {
    SocialLinks: () => import('@/components/social-links/SocialLinks.vue'),
  },
}
</script>
