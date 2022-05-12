<template>
  <div>
    <button
      class="text-white text-center p-4 uppercase w-full"
      :class="[
        ...(disabled ? ['bg-grey-400', 'cursor-not-allowed'] : ['bg-black'])
      ]"
      :disabled="disabled"
      @click="$emit('checkout')"
    >
      Checkout
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
  },
}
</script>
