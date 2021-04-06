<template>
  <div class="pb-16 last:pb-0">
    <div class="font-bold pb-2">
      {{ age }}
    </div>
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
