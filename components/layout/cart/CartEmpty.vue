<template>
  <p class="px-4 pt-8 text-center text-grey-600 text-xs">
    You have no items in your cart, why not visit our <a href="/shop" @click.prevent="goToShop()">Shop</a> to purchase something?
  </p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CartEmpty',

  methods: {
    ...mapActions('app', [
      'closeMiniCart',
    ]),
    goToShop() {
      this.closeMiniCart()

      if (this.$route.name !== 'shop') {
        this.$router.push('/shop')
      }
    },
  },
}
</script>
