<template>
  <div class="flex justify-between w-full mb-2 text-xs last:mb-0">
    <div>{{ label }}</div>
    <a
      v-if="link"
      :href="link"
      class="text-black underline hover:text-black"
    >
      {{ value }}
    </a>
    <div v-else>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommitteCardRow',

  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
