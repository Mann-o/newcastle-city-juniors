<template>
  <div>
    <div class="font-bold mb-2">
      Categories
    </div>
    <ul class="flex mb-12 gap-4">
      <li
        @click="$emit('set-category', null)"
        class="p-2 transition-colors select-none cursor-pointer"
        :class="[
          ...(selectedCategory === null ? ['bg-gold', 'text-white'] : ['bg-white']),
        ]"
      >
        All
      </li>
      <li
        v-for="(category, index) in categories"
        :key="`shop-category-${index}`"
        class="p-2 transition-colors select-none cursor-pointer"
        :class="[
          ...(selectedCategory === category ? ['bg-gold', 'text-white'] : ['bg-white']),
        ]"
        @click="$emit('set-category', category)"
      >
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ShopFilters',

  props: {
    categories: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    selectedCategory: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
