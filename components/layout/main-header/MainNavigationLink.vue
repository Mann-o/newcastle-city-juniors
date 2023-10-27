<template>
  <li class="main-navigation-link border-b border-grey-800 lg:border-none lg:hover:text-gold transition-all lg:relative">
    <template v-if="!$slots.default">
      <a
        v-if="isExternalLink(route.to)"
        :href="route.to"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          v-if="route.icon"
          :icon="['fad', route.icon]"
        />
        {{ route.label }}
      </a>
      <NuxtLink
        v-else
        :to="route.to"
        class="block py-4 pl-4 text-white lg:py-8"
        active-class="text-gold"
        :exact="isHomepageRoute"
      >
        <FontAwesomeIcon
          v-if="route.icon"
          :icon="['fad', route.icon]"
        />
        {{ route.label }}
      </NuxtLink>
    </template>
    <template v-else>
      <div
        class="grid grid-cols-7 lg:flex lg:grid-cols-none cursor-pointer lg:hover:text-gold"
        :class="[
          ...(isParentOfCurrentRoute ? ['text-gold'] : []),
        ]"
        @click="toggleExpand(route)"
      >
        <div class="col-span-6 py-4 pl-4 lg:py-8">
          {{ route.label }}
        </div>
        <div class="text-center bg-grey-900 py-4 text-white lg:ml-2 lg:hover:text-gold lg:bg-opacity-0 lg:py-8">
          <FontAwesomeIcon :icon="expanderIcon" />
        </div>
      </div>
      <ul
        class="
          border-t-4 border-b border-gold transition-all
          lg:block lg:absolute lg:bg-black lg:border-b-0 lg:opacity-0 lg:z-50 lg:w-auto lg:pointer-events-none lg:top-36
        "
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
    isHomepageRoute () {
      return this.route.to === '/'
    },
    isParentOfCurrentRoute () {
      return this.$route.path.startsWith(this.route.to)
    },
  },

  methods: {
    ...mapActions('routes', [
      'toggleExpand',
    ]),
    isExternalLink(link) {
      return link.startsWith('http')
    },
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
