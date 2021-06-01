<template>
  <div>
    <h1>Club Philosophy</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching this page!
    </div>
    <div v-else>
      <video
        class="w-full"
        autoplay
        muted
        controls
      >
        <source :src="clubPhilosophyVideo.file.url">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageAboutUsClubPhilosophy',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  head: () => ({
    title: 'Club Philosophy',
  }),

  data: () => ({
    clubPhilosophyVideo: {},
  }),

  async fetch () {
    this.clubPhilosophyVideo = await this.$contentful
      .getAsset('7L9NwLH1p0kVlzQFO1GDMd')
      .then(({ fields }) => fields)
  },
}
</script>
