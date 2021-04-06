<template>
  <div class="mb-16 lg:mb-8 lg:grid lg:grid-cols-12 lg:gap-16 lg:pb-16">
    <div class="lg:col-span-6">
      <img :src="block.imgUrl">
    </div>
    <div
      class="pt-8 text-lg lg:pt-0 lg:col-span-6 lg:flex lg:items-center"
      :class="[
        ...(isEvenIndex ? [] : ['lg:order-first']),
      ]"
    >
      <ul>
        <li
          v-for="(item, itemIndex) in block.content"
          :key="itemIndex"
          class="mb-4 flex"
        >
          <span class="text-gold text-2xl align-middle mr-4">
            <FontAwesomeIcon :icon="['fad', 'futbol']" />
          </span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevelopmentCentreBlock',

  props: {
    block: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isEvenIndex () {
      return this.index % 2 === 0
    },
  },
}
</script>
