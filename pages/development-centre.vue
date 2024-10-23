<template>
  <div>
    <h1>Newcastle City Juniors Football Development Programme || ⚽️ 🥅 </h1>

    <div class="mb-16 text-center">
      <img
        class="mx-auto w-full"
        src="/images/etc/development-camps-banner.jpg"
        alt="Poster for Football Development at Newcastle City Juniors in the 2024-25 season"
      >
    </div>

    <!-- <DevelopmentCentreBlock
      v-for="(block, index) in blocks"
      :key="index"
      :block="block"
      :index="index"
    /> -->

    <!-- <div class="text-lg lg:text-center mb-8 lg:mb-16">
      <p class="mb-8 lg:mb-4">
        It's a great opportunity for all those who wish to take their first steps into football and play the game we love every Friday!
      </p>
      <p class="mb-8 lg:mb-4">
        Your child's first session is free and then £5 per session. All parents/guardians must register their child before attending any sessions.
      </p>
      <p>For more information and to register contact Adam on <a href="tel:+447518389898">07518389898</a> or email: <a href="mailto:ncj.adamjones@hotmail.com">ncj.adamjones@hotmail.com</a></p>
    </div> -->

    <div class="text-lg lg:text-center mb-8 lg:mb-16">
      <p class="mb-8 lg:mb-4">
        Here at Newcastle City Juniors we look to continue to offer the boys and girls a unique and bespoke training package.
      </p>
      <p class="mb-8 lg:mb-4">
        Our football development programme for all boys and girls aged 3-6 years.
      </p>
      <p class="mb-8 lg:mb-4">Our programme offers your child:</p>
      <ul class="mb-8 lg:mb-4">
        <li>⚽️ Small Group Training</li>
        <li>⚽️ Flexible Training Days/Times</li>
        <li>⚽️ Monday/Wednesday - Ball Manipulation/Mastery</li>
        <li>⚽️ Saturday/Sunday - In-House Matches</li>
        <li>⚽️ Winter @ Gibside Gardens NE15 7PP</li>
      </ul>
      <p class="mb-8 lg:mb-4">To express your child's interest please contact Adam on:<br /><FontAwesomeIcon :icon="['fad', 'phone']" class="mr-2" /><a href="tel:+447518389898">07518389898</a><br /><FontAwesomeIcon :icon="['fad', 'envelope']" class="mr-2" /><a href="mailto:ncj.adamjones@hotmail.com">ncj.adamjones@hotmail.com</a></p>
      <p><strong>#TheFutureIsBlackAndWhite</strong></p>
    </div>

    <!-- <img
      class="mx-auto"
      src="/images/etc/development-camps-3.jpg"
    > -->
  </div>
</template>

<script>
export default {
  name: 'PageNewcastleCityDevelopmentCentre',

  components: {
    DevelopmentCentreBlock: () => import('@/components/development-centre/DevelopmentCentreBlock.vue'),
  },

  scrollToTop: true,

  // data: () => ({
  //   blocks: [
  //     {
  //       imgUrl: '/images/etc/development-camps-1.jpg',
  //       content: [
  //         'Boys and Girls aged 3-7 years old',
  //         'Fully qualified coaches',
  //         'Coaches have enhanced DBS and Safeguarding',
  //         'Every Friday',
  //       ],
  //     },
  //     {
  //       imgUrl: '/images/etc/development-camps-2.jpg',
  //       content: [
  //         'Nursery/Reception - 5:00-5:50PM',
  //         'School years 1/2 - 6:00-6:50PM',
  //         'Venue - Gibside Gardens, Benwell, NE15 7PP',
  //         'Following all government and FA guidelines',
  //       ],
  //     },
  //   ],
  // }),

  head: () => ({
    title: 'Newcastle City Development Centre',
  }),
}
</script>
