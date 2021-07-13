<template>
  <div>
    <h1>Newcastle City Development Centre</h1>

    <DevelopmentCentreBlock
      v-for="(block, index) in blocks"
      :key="index"
      :block="block"
      :index="index"
    />

    <div class="text-lg lg:text-center mb-8 lg:mb-16">
      <p class="mb-8 lg:mb-4">
        It's a great opportunity for all those who wish to take their first steps into football and play the game we love every Friday!
      </p>
      <p class="mb-8 lg:mb-4">
        Your child's first session is free and then £3 per session. All parents/guardians must register their child before attending any sessions.
      </p>
      <p>For more information and to register contact Adam on <a href="tel:+447518389898">07518389898</a> or email: <a href="mailto:ncj.adamjones@hotmail.com">ncj.adamjones@hotmail.com</a></p>
    </div>

    <img
      class="mx-auto"
      src="/images/etc/development-camps-3.jpg"
    >
  </div>
</template>

<script>
export default {
  name: 'PageNewcastleCityDevelopmentCentre',

  components: {
    DevelopmentCentreBlock: () => import('@/components/development-centre/DevelopmentCentreBlock.vue'),
  },

  scrollToTop: true,

  data: () => ({
    blocks: [
      {
        imgUrl: '/images/etc/development-camps-1.jpg',
        content: [
          'Boys and Girls aged 3-7 years old',
          'Fully qualified coaches',
          'Coaches have enhanced DBS and Safeguarding',
          'Every Friday',
        ],
      },
      {
        imgUrl: '/images/etc/development-camps-2.jpg',
        content: [
          'Nursery/Reception - 5:00-5:50PM',
          'School years 1/2 - 6:00-6:50PM',
          'Venue - Gibside Gardens, Benwell, NE15 7PP',
          'Following all government and FA guidelines',
        ],
      },
    ],
  }),

  head: () => ({
    title: 'Newcastle City Development Centre',
  }),
}
</script>
