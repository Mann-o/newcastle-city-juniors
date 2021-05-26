<template>
  <div>
    <h1>2021 Presentation</h1>
    <div v-if="isStripeLoaded">
      <form
        ref="stripePaymentForm"
        @submit.prevent="submitPayment"
      >
        <div ref="stripeCardElement" />
        <button id="submit">
          <div class="spinner hidden" />
          <span id="button-text">Pay now</span>
        </button>
        <p id="card-error" role="alert" />
        <p class="result-message hidden">
          Payment succeeded.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsPresentation2021',

  data: () => ({
    isStripeLoaded: false,
    paymentIntentSecret: null,
    purchasing: [
      {
        id: 'presentation-2021-ticket',
      },
    ],
  }),

  head () {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://js.stripe.com/v3/',
          defer: true,
          callback: () => {
            this.isStripeLoaded = true
          },
        },
      ],
    }
  },

  watch: {
    async isStripeLoaded (val) {
      if (val) {
        const stripe = window.Stripe(this.$config.stripeApiKey)

        const { data } = await this.$axios.post('/api/stripe/payment-intents/presentation-2021-event', {
          items: this.purchasing,
        })

        this.paymentIntentSecret = data.clientSecret

        const elements = stripe.elements()

        const style = {
          base: {
            color: '#32325d',
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#32325d',
            },
          },
          invalid: {
            fontFamily: 'Arial, sans-serif',
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        }

        const card = elements.create('card', { style })

        card.mount(this.$refs.stripeCardElement)
      }
    },
  },

  methods: {
    submitPayment () {

    },
  },
}
</script>
