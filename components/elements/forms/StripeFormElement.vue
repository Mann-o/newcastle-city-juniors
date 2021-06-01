<template>
  <div
    class="mt-4 first-of-type:mt-0"
    :class="[
      ...element ? ['block'] : ['hidden'],
    ]"
  >
    <label class="block text-sm font-bold mb-1">
      {{ label }}
    </label>
    <div
      :ref="stripeRef"
      class="border border-grey-400 p-2"
    />
  </div>
</template>

<script>
export default {
  name: 'StripeFormElement',

  props: {
    label: {
      type: String,
      required: true,
    },
    element: {
      type: Object,
      required: false,
      default: null,
    },
    stripeRef: {
      type: String,
      required: true,
    },
  },
}
</script>
