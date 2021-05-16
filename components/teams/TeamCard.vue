<template>
  <div class="bg-gold w-full h-80 relative">
    <NuxtLink
      class="absolute inset-0 flex items-center justify-center hover:text-black"
      :to="`/teams/${ageGroup.fields.slug}/${team.fields.slug}`"
    >
      {{ team.fields.name }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',

  props: {
    ageGroup: {
      type: Object,
      required: true,
    },
    team: {
      type: Object,
      required: true,
    },
  },
}
</script>
