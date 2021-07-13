<template>
  <div>
    <h1>Our Teams</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching age groups!
    </div>
    <div v-else>
      <!-- <TeamsNavigation :age-groups="ageGroups" /> -->
      <AgeGroup
        v-for="ageGroup in ageGroups"
        :key="ageGroup.fields.title"
        :age-group="ageGroup"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTeamsIndex',

  components: {
    AgeGroup: () => import('@/components/teams/AgeGroup.vue'),
    Loader: () => import('@/components/layout/Loader.vue'),
    // TeamsNavigation: () => import('@/components/teams/navigation/TeamsNavigation.vue'),
  },

  scrollToTop: true,

  data: () => ({
    ageGroups: [],
  }),

  async fetch () {
    this.ageGroups = await this.$contentful
      .getEntries({
        content_type: this.$config.contentfulAgeGroupContentType,
        order: 'fields.ageGroup',
        include: 2,
      })
      .then(({ items: ageGroups }) => ageGroups)
  },

  head: () => ({
    title: 'Teams',
  }),
}
</script>
