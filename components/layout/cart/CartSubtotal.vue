<template>
  <div
    class="flex w-full text-xs italic font-bold gap-6 md:gap-12"
    :class="[
      ...(inMiniCart ? ['justify-between', 'pb-4'] : ['my-6', 'md:my-12']),
    ]"
  >
    <p
      class="flex-grow"
      :class="{
        'text-right': !inMiniCart,
      }"
    >
      Subtotal
    </p>

    <p>{{ cartTotalString }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartSubtotal',

  props: {
    inMiniCart: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    ...mapGetters('cart', [
      'cartTotalString',
    ]),
  },
}
</script>
