<template>
  <div class="mt-8 first:mt-0">
    <h2>{{ label }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormSection',

  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
