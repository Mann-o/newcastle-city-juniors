<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching age group + teams!
    </div>
    <div v-else>
      <h1>{{ ageGroup.fields.title }}</h1>
      <AgeGroup
        :age-group="ageGroup"
        no-header
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTeamsAgeGroupIndex',

  components: {
    AgeGroup: () => import('@/components/teams/AgeGroup.vue'),
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    ageGroup: {},
  }),

  async fetch () {
    this.ageGroup = await this.$contentful
      .getEntries({
        content_type: this.$config.contentfulAgeGroupContentType,
        'fields.slug': this.$route.params.ageGroup,
        include: 1,
      })
      .then(({ items: ageGroups }) => ageGroups[0])
  },

  // head () {
  //   return {
  //     title: this.$fetchState.pending || this.$fetchState.error
  //       ? 'Teams'
  //       : this.ageGroup.fields.title,
  //   }
  // },
}
</script>
