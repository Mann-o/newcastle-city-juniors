<template>
  <div
    class="absolute w-full bottom-0 left-0 h-0.5 bg-black bg-opacity-50"
    :style="timerStyle"
  />
</template>

<script>
export default {
  name: 'NotificationTimer',

  props: {
    duration: {
      type: Number,
      required: true,
    },
  },

  computed: {
    timerStyle() {
      return { animation: `notification-timer linear ${this.duration}s 1 forwards` };
    },
  },
};
</script>

<style lang="postcss">
@keyframes notification-timer {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
