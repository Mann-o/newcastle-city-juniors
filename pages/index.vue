<template>
  <div>
    <Hero
      v-if="homepageConfig"
      :hero="homepageHero"
      is-on-homepage
    />
    <!-- <ProvenTrackRecord />
    <div>Affiliations</div>
    <div>Club Sponsors</div> -->
  </div>
</template>

<script>
export default {
  name: 'PageIndex',

  components: {
    Hero: () => import('@/components/contentful-blocks/Hero.vue'),
    ProvenTrackRecord: () => import('@/components/home/ProvenTrackRecord.vue'),
  },

  scrollToTop: true,

  layout: 'full-bleed',

  async asyncData ({ $config, $contentful }) {
    const homepageConfig = await $contentful.getEntry($config.contentfulHomepageConfig)
    return { homepageConfig }
  },

  data: () => ({
    hompageConfig: null,
  }),

  head: () => ({
    title: 'Home',
  }),

  computed: {
    /** @return {object} */
    homepageHero () {
      return {
        ...(this.homepageConfig && this.homepageConfig.fields.homepageHero.fields),
      }
    },
  },
}
</script>
