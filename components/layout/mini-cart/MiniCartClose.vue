<template>
  <div class="absolute top-0 right-0">
    <button @click="closeMiniCart()">
      <FontAwesomeIcon :icon="['fal', 'xmark']" />
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MiniCartClose',

  methods: {
    ...mapActions('app', [
      'closeMiniCart',
    ]),
  },
}
</script>
