<template>
  <div
    class="absolute top-2 right-2 h-4 w-4 text-opacity-50 text-center transition-colors duration-300 cursor-pointer hover:text-opacity-100"
    @click="dismiss()"
  >
    <FontAwesomeIcon :icon="['fal', 'xmark']" />
  </div>
</template>

<script>
export default {
  name: 'NotificationClose',

  methods: {
    dismiss() {
      this.$emit('dismiss');
    },
  },
};
</script>
