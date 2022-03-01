<template>
  <div
    class="p-4 bg-blackish lg:hidden"
    @click="toggle()"
  >
    <span class="inline-block w-6 text-center">
      <FontAwesomeIcon :icon="mobileNavIcon" />
    </span>
    <span class="ml-2 uppercase">Menu</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MobileNavigationToggle',

  computed: {
    ...mapState('mobile-navigation', [
      'active',
    ]),
    mobileNavIcon () {
      return [
        'fal',
        this.active ? 'xmark' : 'bars',
      ]
    },
  },

  methods: {
    ...mapActions('mobile-navigation', [
      'toggle',
    ]),
  },
}
</script>
