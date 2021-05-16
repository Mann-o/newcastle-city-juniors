<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching age groups!
    </div>
    <div v-else>
      <AgeGroup
        v-for="({ fields: { title, slug } }) in ageGroups"
        :key="title"
        :age="title"
      >
        <NuxtLink :to="`/teams/${slug}`">
          View
        </NuxtLink>
      </AgeGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTeamsIndex',

  components: {
    AgeGroup: () => import('@/components/teams/AgeGroup.vue'),
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    ageGroups: [],
  }),

  async fetch () {
    this.ageGroups = await this.$contentful
      .getEntries({
        content_type: this.$config.contentfulAgeGroupContentType,
        order: 'fields.ageGroup',
      })
      .then(({ items: ageGroups }) => ageGroups)
  },

  head: () => ({
    title: 'Teams',
  }),
}
</script>
