<template>
  <div class="border border-gold col-span-4 py-8 px-4 mb-8 last:mb-0 lg:mb-0">
    <div class="text-center text-4xl text-gold pb-8">
      <FontAwesomeIcon :icon="['fad', icon]" />
    </div>
    <div class="uppercase text-center font-bold pb-4">
      {{ label }}
    </div>
    <div class="text-center">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfoBlock',

  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
