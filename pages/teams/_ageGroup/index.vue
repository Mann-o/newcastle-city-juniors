<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching age group + teams!
    </div>
    <div v-else>
      <p
        v-for="(team, index) in ageGroup.fields.teams"
        :key="index"
      >
        {{ team.fields.name }}
        -
        <NuxtLink :to="`/teams/${ageGroup.fields.slug}/${team.fields.slug}`">
          View
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTeamsAgeGroupIndex',

  components: {
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
