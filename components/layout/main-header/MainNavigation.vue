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
          <template v-for="(route, index) in routes">
            <MainNavigationLink
              v-if="
                route.alwaysDisplay ||
                (!$auth.loggedIn && route.hideWhenAuthenticated) ||
                ($auth.loggedIn && route.requiresAuth)
              "
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
          </template>
          <li
            v-if="$auth.loggedIn"
            class="main-navigation-link">
            <a
              class="block py-4 pl-4 text-white lg:py-8"
              href="/logout"
              @click.prevent="$auth.logout()"
            >
              Logout
            </a>
          </li>
          <li>
            <a
              class="block py-4 pl-4 text-white lg:py-8"
              href="/cart"
              @click.prevent="openMiniCart()"
            >
              <FontAwesomeIcon :icon="['fad', 'basket-shopping']" />
              <span
                v-if="cartItemCount > 0"
                class="inline-block text-center text-black bg-gold rounded-full p-px w-4 h-4 text-xs"
              >
                {{ cartItemCount }}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapGetters('cart', [
      'cartItemCount',
    ]),
  },

  methods: {
    ...mapActions('cart', [
      'openMiniCart',
    ]),
  },
}
</script>
