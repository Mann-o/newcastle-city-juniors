<template>
  <div>
    <ContactInfo />
  </div>
</template>

<script>
export default {
  name: 'PageContactUs',

  components: {
    ContactInfo: () => import('@/components/contact-us/ContactInfo.vue'),
  },

  scrollToTop: true,

  head: () => ({
    title: 'Contact Us',
  }),
}
</script>
