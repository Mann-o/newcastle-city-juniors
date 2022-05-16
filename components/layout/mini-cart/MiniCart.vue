<template>
  <div
    class="fixed right-0 top-0 bottom-0 w-full bg-white z-40 transition-transform transform-gpu p-4 md:border-l md:border-black md:w-96"
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
        <CartEmpty v-if="cartIsEmpty" />

        <template v-else>
          <CartItem
            v-for="item in cart"
            :key="item.id"
            :item="item"
          />
        </template>
      </div>

      <CartSubtotal
        v-if="!cartIsEmpty"
        in-mini-cart
      />

      <CartCheckout
        :disabled="cartIsEmpty"
        @checkout="checkout()"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MiniCart',

  components: {
    MiniCartClose: () => import('./MiniCartClose.vue'),
    CartEmpty: () => import('@/components/layout/cart/CartEmpty.vue'),
    CartCheckout: () => import('@/components/layout/cart/CartCheckout.vue'),
    CartItem: () => import('@/components/layout/cart/CartItem.vue'),
    CartSubtotal: () => import('@/components/layout/cart/CartSubtotal.vue'),
  },

  computed: {
    ...mapState('cart', [
      'cart',
    ]),
    ...mapState('app', [
      'miniCartOpen',
    ]),
    ...mapGetters('cart', [
      'cartItemCount',
      'cartItemCountLabel',
      'cartIsEmpty',
      'cartContainsPresentationTickets',
    ]),
  },

  methods: {
    ...mapActions('app', [
      'closeMiniCart',
    ]),
    checkout() {
      this.closeMiniCart()

      if (this.$route.name !== 'cart') {
        this.$router.push('/cart')
      }
    },
  },
}
</script>
