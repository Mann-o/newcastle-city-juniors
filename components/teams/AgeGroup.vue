<template>
  <div class="pb-16 last:pb-0">
    <h2>{{ age }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AgeGroup',

  props: {
    age: {
      type: String,
      required: true,
    },
  },
}
</script>
