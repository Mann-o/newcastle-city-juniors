<template>
  <div>
    <h1>Holiday Camp - October 2021</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching this page!
    </div>
    <div v-else>
      <div class="md:grid md:grid-cols-3 md:gap-16">
        <div class="md:order-2 md:col-span-2">
          <p class="mb-4">Newcastle City Juniors can reveal our October 2021 Holiday Camp programme to you all.</p>
          <p class="mb-4">This is for boys and girls aged 4-12 years old and will run in from Monday 25th - Thursday 28th October 2021.</p>
          <p class="mb-4">There are 3 options for you to choose from which include half day camp, full day camp and full day camp + early drop off for all ages 4-12.</p>
          <p class="mb-4">To secure your child's place on our October Half Term holiday camps, simply complete the registration link below for your child and make payment via cash or BACS (BACS Details are listed on the form below):</p>
          <p class="mb-4"><a href="https://forms.office.com/r/qGE3fBg815" target="_blank" rel="noopener">October Half Term Holiday Camps - Registration Form</a></p>
          <p class="mb-4">Please note Newcastle City Juniors members discount £45 for 4 days applies to all children who attend NCJ Football Development programme and play in NCJ teams u7-u12s.</p>
          <p class="mb-4">We will follow the FA and government guidelines so, please do book early to secure your child's place.</p>
          <p class="mb-4">If you have any questions, please don't hesitate to contact us via phone or email.</p>
        </div>
        <div class="md:order-1 md:col-span-1">
          <img
            class="max-w-3xl w-full"
            :src="leaflet.file.url"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHolidayCampsIndex',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    leaflet: null,
  }),

  async fetch () {
    this.leaflet = await this.$contentful
      .getAsset('6nwpUzyQmsE5vYfqogjb6O')
      .then(({ fields }) => fields)
  },
}
</script>
