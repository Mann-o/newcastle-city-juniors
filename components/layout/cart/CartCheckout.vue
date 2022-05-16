<template>
  <div>
    <button
      class="text-white text-center p-4 uppercase w-full"
      :class="[
        ...((disabled || loading) ? ['bg-grey-400', 'cursor-not-allowed'] : ['bg-black'])
      ]"
      :disabled="disabled || loading"
      @click="$emit('checkout')"
    >
      {{ checkoutButtonLabel }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CartCheckout',

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    checkoutButtonLabel() {
      return this.loading
        ? 'Please wait...'
        : 'Checkout'
    },
  },
}
</script>
