<template>
  <div class="relative p-8">
    <slot
      v-if="$scopedSlots.preheading"
      name="preheading"
    />

    <slot
      v-if="$scopedSlots.heading"
      id="modal-heading"
      name="heading"
    />

    <slot
      v-if="$scopedSlots.description"
      id="modal-description"
      name="description"
    />

    <slot name="body" />

    <button
      v-if="showClose"
      id="modal-close-dialog"
      aria-label="Close dialog"
      class="absolute top-4 right-4 border-0 bg-white p-0"
      @click="$modal.close()"
    >
      <FontAwesomeIcon :icon="['fal', 'xmark']" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ModalWrapper',

  props: {
    showClose: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
