<template>
  <li class="border border-grey-400 ml-2 first:ml-0 hover:bg-gold hover:border-gold transition-all">
    <NuxtLink
      class="block p-2 text-grey-700 hover:text-black transition-all"
      :to="`#age-group-${ageGroup.fields.slug}`"
    >
      {{ ageGroup.fields.title }}
    </NuxtLink>
  </li>
</template>

<script>
export default {
  name: 'TeamsNavigationItem',

  props: {
    ageGroup: {
      type: Object,
      required: true,
    },
  },
}
</script>
