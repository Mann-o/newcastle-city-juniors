<template>
  <li class="border-b border-dark-grey py-1 first:pt-0 last:pb-0 last:border-b-0 text-grey hover:text-white transition-colors">
    <ExternalLink
      v-if="external"
      :to="to"
      show-external-icon
    >
      <FontAwesomeIcon
        :icon="['fal', 'angle-right']"
        class="mr-2"
      />
      {{ label }}
    </ExternalLink>
    <NuxtLink
      v-else
      class="text-white"
      :to="to"
    >
      <FontAwesomeIcon
        :icon="['fal', 'angle-right']"
        class="mr-2"
      />
      {{ label }}
    </NuxtLink>
  </li>
</template>

<script>
export default {
  name: 'UsefulLink',

  components: {
    ExternalLink: () => import('@/components/elements/ExternalLink.vue'),
  },

  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
