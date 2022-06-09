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
            <button
              :class="[
                ...(limitReached ? ['opacity-50', 'cursor-not-allowed'] : []),
              ]"
              :disabled="limitReached"
              @click="increaseQuantityInCart(item)"
            >
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CartItem',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters('cart', [
      'quantityOfProductInCart',
    ]),
    icon() {
      return this.item?.product?.metadata?.['fa-icon'] ?? 'image-slash'
    },
    productPrice() {
      if (this.item.unit_amount === 0) {
        return 'FREE'
      }

      const price = (this.item.unit_amount * this.item.quantity) / 100
      return price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
    },
    productLimit() {
      return this.item.product?.metadata?.limit ?? null;
    },
    productInCart() {
      return this.quantityOfProductInCart(this.item.id);
    },
    limitReached() {
      return (this.productLimit != null)
        && (this.productInCart >= parseInt(this.productLimit));
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
