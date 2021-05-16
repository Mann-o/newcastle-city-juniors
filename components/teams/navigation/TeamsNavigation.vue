<template>
  <nav class="mb-8 lg:mb-16">
    <ul class="flex">
      <TeamsNavigationItem
        v-for="ageGroup in ageGroups"
        :key="ageGroup.fields.title"
        :age-group="ageGroup"
      />
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TeamsNavigation',

  components: {
    TeamsNavigationItem: () => import('@/components/teams/navigation/TeamsNavigationItem.vue'),
  },

  props: {
    ageGroups: {
      type: Array,
      required: true,
    },
  },
}
</script>
