<template>
  <div
    class="fixed right-0 top-0 bottom-0 w-full bg-white z-50 transition-transform transform-gpu p-4 md:border-l md:border-black md:w-96"
    :class="[
      ...(miniCartOpen ? ['translate-x-0'] : ['translate-x-full'])
    ]"
  >
    <div class="relative flex flex-col h-full justify-space-between">
      <MiniCartClose />
      <div>
        <h2 class="mb-0">
          Cart ({{ cartItemCountLabel }})
        </h2>
      </div>
      <div class="flex-grow flex flex-col gap-4 py-8">
        <p
          v-if="cartIsEmpty"
          class="px-4 pt-8 text-center text-grey-600 text-xs"
        >
          You have no items in your cart, why not visit our <a href="/shop" @click.prevent="goToShop()">Shop</a> to purchase something?
        </p>
        <template v-else>
          <MiniCartItem
            v-for="item in cart"
            :key="item.id"
            :item="item"
          />
        </template>
      </div>
      <div
        v-if="!cartIsEmpty"
        class="flex w-full justify-between text-xs italic pb-4"
      >
        <p>Subtotal</p>
        <p>{{ cartTotalString }}</p>
      </div>
      <div>
        <button
          class="text-white text-center p-4 uppercase w-full"
          :class="[
            ...(cartIsEmpty ? ['bg-grey-400', 'cursor-not-allowed'] : ['bg-black'])
          ]"
          :disabled="cartIsEmpty"
          @click="checkout()"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MiniCart',

  components: {
    MiniCartClose: () => import('./MiniCartClose.vue'),
    MiniCartItem: () => import('./MiniCartItem.vue'),
  },

  computed: {
    ...mapState('cart', [
      'cart',
      'miniCartOpen',
    ]),
    ...mapGetters('cart', [
      'cartItemCount',
      'cartItemCountLabel',
      'cartIsEmpty',
      'cartTotalString',
    ]),
  },

  methods: {
    ...mapActions('cart', [
      'closeMiniCart',
    ]),
    goToShop() {
      this.closeMiniCart()

      if (this.$route.name !== 'shop') {
        this.$router.push('/shop');
      }
    },
  },
}
</script>
