<template>
  <li class="main-navigation-link border-b border-gray-800 lg:border-none lg:hover:text-gold transition-all lg:relative">
    <NuxtLink
      v-if="!$slots.default"
      :to="route.to"
      class="block py-4 pl-4 text-white lg:py-8"
      active-class="text-gold"
      exact
    >
      {{ route.label }}
    </NuxtLink>
    <template v-else>
      <div
        class="grid grid-cols-7 lg:flex lg:grid-cols-none cursor-pointer lg:hover:text-gold"
        @click="toggleExpand(route)"
      >
        <div class="col-span-6 py-4 pl-4 lg:py-8">
          {{ route.label }}
        </div>
        <div class="text-center bg-gray-900 text-gray-700 py-4 lg:ml-2 lg:hover:text-gold lg:text-white lg:bg-opacity-0 lg:py-8">
          <FontAwesomeIcon :icon="expanderIcon" />
        </div>
      </div>
      <ul
        class="border-t-4 border-b border-gold lg:transition-opacity lg:block lg:absolute lg:bg-black lg:border-b-0 lg:opacity-0 lg:z-50 lg:w-auto lg:pointer-events-none"
        :class="[
          ...(route.expanded ? ['block'] : ['hidden']),
        ]"
      >
        <slot />
      </ul>
    </template>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainNavigationLink',

  props: {
    route: {
      type: Object,
      required: true,
      validator: route => route.to && route.label,
    },
  },

  computed: {
    expanderIcon () {
      return [
        'fal',
        `angle-${this.route.expanded ? 'up' : 'down'}`,
      ]
    },
  },

  methods: {
    ...mapActions('routes', [
      'toggleExpand',
    ]),
  },
}
</script>

<style lang="postcss">
@screen lg {
  .main-navigation-link:hover ul {
    @apply opacity-100 pointer-events-auto;

    top: 84px;
  }
}
</style>
