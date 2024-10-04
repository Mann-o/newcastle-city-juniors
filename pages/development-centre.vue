<template>
  <div>
    <h1>Newcastle City Development Centre</h1>

    <div class="mb-16 text-center">
      <img
        class="mx-auto max-w-3xl"
        src="https://images.ctfassets.net/yv1glylq11v9/1L4ZOciRQ23jVSVO8JBlQY/62a748c8b2c208e5fb538a0892ca6ea4/image__4___1_.png"
        alt="Poster for Football Development at Newcastle City Juniors in the 2024-25 season"
      >
    </div>

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
        Your child's first session is free and then £5 per session. All parents/guardians must register their child before attending any sessions.
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
