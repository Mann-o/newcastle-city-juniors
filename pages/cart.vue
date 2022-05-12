<template>
  <div>
    <h1>Cart</h1>

    <CartEmpty v-if="cartIsEmpty" />

    <template v-else>
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
      />
      <CartSubtotal />
      <div class="md:flex md:w-full md:justify-end">
        <CartCheckout
          :disabled="cartIsEmpty || true"
          @checkout="checkout()"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageCart',

  components: {
    CartEmpty: () => import('@/components/layout/cart/CartEmpty.vue'),
    CartItem: () => import('@/components/layout/cart/CartItem.vue'),
    CartSubtotal: () => import('@/components/layout/cart/CartSubtotal.vue'),
    CartCheckout: () => import('@/components/layout/cart/CartCheckout.vue'),
  },

  computed: {
    ...mapState('cart', [
      'cart',
    ]),
    ...mapGetters('cart', [
      'cartIsEmpty',
      'cartContainsPresentationTickets',
    ]),
  },

  methods: {
    goToShop() {
      this.$router.push('/shop')
    },
    checkout() {
      console.log('checking out')
    },
  },
}
</script>
