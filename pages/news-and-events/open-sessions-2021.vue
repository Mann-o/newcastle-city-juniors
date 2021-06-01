<template>
  <div>
    <h1>Open Sessions - 2021-22 Season</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching this page!
    </div>
    <div v-else>
      <object
        class="w-full"
        height="1200"
        :data="pdf.file.url"
        type="application/pdf"
      >
        <embed
          :src="pdf.file.url"
          type="application/pdf"
        />
      </object>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsOpenSessions2021',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    pdf: null,
  }),

  async fetch () {
    this.pdf = await this.$contentful
      .getAsset('16gFUdqrld85f3tZK9oYzs')
      .then(({ fields }) => fields)
  },
}
</script>
