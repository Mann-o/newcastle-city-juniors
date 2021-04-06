<template>
  <div class="bg-black text-white">
    <div class="container mx-auto pt-8 overflow-visible relative lg:flex lg:justify-between lg:pt-0 lg:pb-0 lg:text-sm">
      <MainLogo />
      <MobileNavigationToggle />
      <nav
        class="lg:block"
        :class="[
          ...(active ? ['block'] : ['hidden']),
        ]"
      >
        <ul class="lg:flex">
          <MainNavigationLink
            v-for="(route, index) in routes"
            :key="index"
            :route="route"
          >
            <template v-if="route.children">
              <MainNavigationSubLink
                v-for="(childRoute, childIndex) in route.children"
                :key="childIndex"
                :child-route="childRoute"
              />
            </template>
          </MainNavigationLink>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainNavigation',

  components: {
    MobileNavigationToggle: () => import('./MobileNavigationToggle.vue'),
    MainLogo: () => import('./MainLogo.vue'),
    MainNavigationLink: () => import('./MainNavigationLink.vue'),
    MainNavigationSubLink: () => import('./MainNavigationSubLink.vue'),
  },

  computed: {
    ...mapState('routes', [
      'routes',
    ]),
    ...mapState('mobile-navigation', [
      'active',
    ]),
  },
}
</script>
