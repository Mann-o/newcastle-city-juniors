<template>
  <div
    :id="id"
    class="pb-8 last:pb-0 lg:pb-16"
  >
    <h2>
      {{ ageGroup.fields.title }}
    </h2>

    <div
      v-if="ageGroup.fields.teams"
      class="grid gap-4 lg:grid-cols-3 lg:gap-8"
    >
      <TeamCard
        v-for="team in ageGroup.fields.teams"
        :key="team.fields.title"
        :team="team"
        :age-group="ageGroup"
      />
    </div>
    <div v-else>
      <p>No teams exist in this age group.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgeGroup',

  components: {
    TeamCard: () => import('@/components/teams/TeamCard.vue'),
  },

  props: {
    ageGroup: {
      type: Object,
      required: true,
    },
    noHeader: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    id () {
      return `age-group-${this.ageGroup.fields.slug}`
    },
  },
}
</script>
