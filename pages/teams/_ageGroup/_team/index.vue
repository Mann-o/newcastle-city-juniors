<template>
  <div>
    <div v-if="$fetchState.pending">
      Fetching age group + teams...
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching age group + teams!
    </div>
    <div v-else>
      <pre v-html="team.fields" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTeamsAgeGroupTeamIndex',

  data: () => ({
    team: {},
  }),

  async fetch () {
    this.team = await this.$contentful
      .getEntries({
        content_type: this.$config.contentfulAgeGroupContentType,
        'fields.slug': this.$route.params.ageGroup,
        include: 1,
      })
      .then(({ items: ageGroups }) => {
        for (const ageGroup of ageGroups) {
          for (const team of ageGroup.fields.teams) {
            if (team.fields.slug === this.$route.params.team) {
              return team
            }
          }
        }
      })
  },

  // head () {
  //   return {
  //     title: this.team.fields.title,
  //   }
  // },
}
</script>
