<template>
  <div>
    <div class="flex items-center justify-center w-full py-12 text-5xl bg-gold">
      <FontAwesomeIcon :icon="['fad', icon]" />
    </div>
    <div class="bg-grey-200 text-sm p-6 text-center">
      <div>
        <strong>{{ price.product.name }}</strong>
      </div>
      <div class="mt-6">
        {{ price.product.description }}
      </div>
      <button
        class="bg-black text-white mt-6 py-4 px-6 w-full text-center"
        @click="addToCart(price)"
      >
        Add to Cart - {{ productPrice }}
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
      if (this.price.unit_amount === 0) {
        return 'FREE';
      }

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
