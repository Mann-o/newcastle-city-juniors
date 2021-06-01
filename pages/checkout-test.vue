<template>
  <div>
    <button
      v-if="isStripeLoaded"
      @click.prevent="checkout()"
      class="bg-black text-white"
    >
      Checkout
    </button>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsCheckoutTest',

  data: () => ({
    isStripeLoaded: false,
    adultNames: [
      'Steve Gilroy',
      'Liam Potter',
      'Adam Jones',
    ],
    childNames: [
      'Suzanne Potter'
    ],
    playerNames: [
      'Owen Potter',
      'Jake Potter',
    ],
  }),

  head () {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://js.stripe.com/v3/',
          defer: true,
          callback: () => this.stripeLoadedCallback(),
        },
      ],
    }
  },

  methods: {
    stripeLoadedCallback () {
      this.isStripeLoaded = true

      this.stripe = window.Stripe(this.$config.stripeApiKey)
    },
    async checkout() {
      this.$nuxt.$loading.start();

      const { data: { id: checkoutSessionId } } = await this.$axios.post('/api/stripe/create-checkout', {
        customer_email: 'me@liam-potter.co.uk',
        line_items: [
          {
            price: 'price_1IvVEDJgy48auTmoYQya6IWa',
            quantity: 3,
          },
          {
            price: 'price_1IwAxzJgy48auTmo63Cd3IsU',
            quantity: 1,
          },
          {
            price: 'price_1IwAyXJgy48auTmoK9FEJRRW',
            quantity: 2,
          },
        ],
        metadata: {
          ...(this.adultNames.length && this.adultNames.reduce((acc, curr, i) => ({
            ...acc,
            [`adult_name_${i + 1}`]: curr,
          }), {})),
          ...(this.childNames.length && this.childNames.reduce((acc, curr, i) => ({
            ...acc,
            [`child_name_${i + 1}`]: curr,
          }), {})),
          ...(this.playerNames.length && this.playerNames.reduce((acc, curr, i) => ({
            ...acc,
            [`player_name_${i + 1}`]: curr,
          }), {})),
        },
        success_url: 'http://localhost:3000/payment-success',
        cancel_url: 'http://localhost:3000/news-and-events/presentation-2021',
      })

      this.stripe.redirectToCheckout({ sessionId: checkoutSessionId })
    },
  },
}
</script>
