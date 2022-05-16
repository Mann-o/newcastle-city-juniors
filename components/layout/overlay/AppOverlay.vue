<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-70 cursor-pointer transition-opacity z-40"
    :class="[
      ...(overlayActive ? ['opacity-100', 'pointer-events-auto'] : ['opacity-0', 'pointer-events-none']),
    ]"
    @click="closeMiniCart()"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppOverlay',

  computed: {
    ...mapState('app', [
      'overlayActive',
    ]),
  },

  methods: {
    ...mapActions('app', [
      'closeMiniCart',
    ]),
  },
}
</script>
