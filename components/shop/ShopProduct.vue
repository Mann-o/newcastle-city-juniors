<template>
  <div>
    <div class="flex items-center justify-center w-full py-12 text-5xl bg-gold">
      <FontAwesomeIcon :icon="['fad', icon]" />
    </div>
    <div class="bg-grey-200 text-sm p-6 text-center">
      <div>{{ price.product.name }}</div>
      <div>{{ productPrice }}</div>
      <button @click="addToCart(price)">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ShopProduct',

  props: {
    price: {
      type: Object,
      required: true,
    },
  },

  computed: {
    icon() {
      return this.price.product?.metadata?.['fa-icon'] ?? 'image-slash';
    },
    productPrice() {
      const price = (this.price.unit_amount / 100)
      return price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
    },
  },

  methods: {
    ...mapActions('cart', [
      'addToCart',
    ]),
  },
};
</script>
