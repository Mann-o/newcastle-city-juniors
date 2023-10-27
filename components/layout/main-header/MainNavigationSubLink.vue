<template>
  <li class="pl-4 py-2 text-sm border-b border-grey-800 last:border-b-0 lg:pr-4 lg:whitespace-nowrap lg:transition-all">
    <a
      v-if="childRoute.external"
      :href="route.to"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ childRoute.label }}
    </a>
    <NuxtLink
      v-else
      class="block text-white"
      :to="childRoute.to"
      @click.prevent="$emit('navigate')"
    >
      {{ childRoute.label }}
    </NuxtLink>
  </li>
</template>

<script>
export default {
  name: 'MainNavigationSubLink',

  props: {
    childRoute: {
      type: Object,
      required: true,
      validator: route => route.to && route.label,
    },
  },
}
</script>
