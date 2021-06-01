<template>
  <div class="mt-4 first-of-type:mt-0">
    <label class="block text-sm font-bold mb-1">
      {{ label }}
    </label>
    <p class="font-bold text-2xl">£{{ total }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormTotalCost',

  props: {
    label: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
  },
}
</script>
