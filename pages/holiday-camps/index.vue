<template>
  <div>
    <h1>Holiday Camps - Half Term</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching this page!
    </div>
    <div v-else>
      <img :src="leaflet.file.url">
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
      .getAsset('4mzk9P56SgDxXHPHZ0CWeq')
      .then(({ fields }) => fields)
  },
}
</script>
