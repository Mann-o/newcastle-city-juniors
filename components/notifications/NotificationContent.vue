<template>
  <div
    class="pt-4 pl-4 text-1.3"
    :class="[
      ...(sticky ? ['pb-4'] : ['pb-6']),
      ...(closeable ? ['pr-6'] : ['pr-4']),
    ]"
  >
    <div
      v-if="title != null"
      class="pb-2 text-1.8 font-bold"
    >
      {{ title }}
    </div>
    <div class="text-sm">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationContent',

  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    sticky: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
