<template>
  <div class="flex gap-4 w-full">
    <div class="flex items-center justify-center w-16 h-16 bg-gold border border-black">
      <FontAwesomeIcon :icon="['fad', icon]" />
    </div>
    <div class="flex-grow">
      <div class="flex gap-4">
        <div class="text-xs">
          <div class="mb-2">
            {{ item.product.name }}
          </div>
          <div class="flex gap-4 items-center">
            <button @click="decreaseQuantityInCart(item)">
              <FontAwesomeIcon :icon="['fal', 'minus']" />
            </button>
            <div>{{ item.quantity }}</div>
            <button @click="increaseQuantityInCart(item)">
              <FontAwesomeIcon :icon="['fal', 'plus']" />
            </button>
          </div>
        </div>
        <div class="flex-grow text-xs text-right">
          <div class="mb-2">
            {{ productPrice }}
          </div>
          <div>
            <button
              class="uppercase text-grey-600 border-b border-grey-600"
              @click="removeFromCart(item)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MiniCartItem',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    icon() {
      return this.item?.product?.metadata?.['fa-icon'] ?? 'image-slash'
    },
    productPrice() {
      const price = (this.item.unit_amount * this.item.quantity) / 100
      return price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
    },
  },

  methods: {
    ...mapActions('cart', [
      'removeFromCart',
      'decreaseQuantityInCart',
      'increaseQuantityInCart',
    ]),
  },
}
</script>
