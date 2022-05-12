<template>
  <div class="fixed flex w-full h-full items-center justify-center z-max">
    <div>
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
        class="absolute -top-8 -right-2 border-0 bg-white p-0 md:-right-8"
        @click="$modal.close()"
      >
        <FontAwesomeIcon :icon="['fal', 'xmark']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContentWrapper',

  props: {
    showClose: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
