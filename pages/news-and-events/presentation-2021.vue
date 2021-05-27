<template>
  <div>
    <h1>2021 Presentation</h1>
    <p class="pb-4">
      This is the test page for the 2021 Presentation ticket purchasing.
    </p>
    <p>Purchase a ticket below for £2.50!</p>
    <div
      v-if="showStripeForm"
      class="mt-8"
    >
      <div class="mb-4">
        <label for="email-address">Email Address</label>
        <div
          id="email-address"
          class="border border-grey-400"
        >
          <input
            v-model="emailAddress"
            placeholder="Email Address"
            class="block text-sm w-full focus:outline-none"
            type="email"
          >
        </div>
      </div>
      <div class="mb-4">
        <label for="confirm-email-address">Confirm Email Address</label>
        <div
          id="confirm-email-address"
          class="border border-grey-400"
        >
          <input
            v-model="confirmEmailAddress"
            placeholder="Confirm Email Address"
            class="block text-sm w-full focus:outline-none"
            type="email"
          >
        </div>
      </div>
      <div class="mb-4">
        <label for="card-number">Card Number</label>
        <div
          id="card-number"
          ref="stripeCardNumber"
          class="border border-grey-400 p-2"
        />
      </div>
      <div class="mb-4">
        <label for="card-cvv">Card CVV</label>
        <div
          id="card-cvv"
          ref="stripeCardCvc"
          class="border border-grey-400 p-2"
        />
      </div>
      <div class="mb-4">
        <label for="card-expiration">Expiration Date</label>
        <div
          id="card-expiration"
          ref="stripeCardExpiry"
          class="border border-grey-400 p-2"
        />
      </div>
      <div>
        <button
          :disabled="stripePaymentProcessing"
          @click="submitPayment()"
        >
          {{ stripeSubmitPaymentButtonLabel }}
        </button>
      </div>
    </div>
    <div
      v-if="stripeErrorMessage"
      class="mt-8"
    >
      <p>{{ stripeErrorMessage }}</p>
    </div>
    <div
      v-if="stripePaymentSucceeded"
      class="mt-8"
    >
      <p>Your payment was successful. An email will be sent to you shortly confirming your payment!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsPresentation2021',

  data: () => ({
    stripe: null,
    isStripeLoaded: false,
    stripePaymentIntentSecret: null,
    stripeProductsBeingPurchased: [
      {
        id: 'presentation-2021-ticket',
      },
    ],
    stripeCardElement: null,
    stripePaymentProcessing: false,
    stripePaymentSucceeded: false,
    stripeErrorMessage: null,
    emailAddress: null,
    confirmEmailAddress: null,
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

  computed: {
    /** @returns {boolean} */
    showStripeForm () {
      return this.isStripeLoaded && !this.stripePaymentSucceeded
    },
    /** @returns {string} */
    stripeSubmitPaymentButtonLabel () {
      return this.stripePaymentProcessing
        ? 'Please wait...'
        : 'Pay £2.50 now'
    },
  },

  watch: {
    isStripeLoaded (val) {
      if (val) {
        this.mountStripeElements()
      }
    },
  },

  mounted () {
    if (this.isStripeLoaded) {
      this.mountStripeElements()
    }
  },

  methods: {
    stripeLoadedCallback () {
      this.isStripeLoaded = true
    },
    async mountStripeElements () {
      this.stripe = window.Stripe(this.$config.stripeApiKey)

      const { data } = await this.$axios.post('/api/stripe/payment-intents/presentation-2021-event', {
        items: this.stripeProductsBeingPurchased,
      })

      this.stripePaymentIntentSecret = data.clientSecret

      const elements = this.stripe.elements()

      const style = {
        base: {
          color: '#000',
          fontFamily: 'Poppins, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '14px',
          '::placeholder': {
            color: '#a1a1aa',
          },
          letterSpacing: '0em',
          lineHeight: '16px',
        },
        invalid: {
          fontFamily: 'Poppins, sans-serif',
          color: '#ff0000',
        },
      }

      const cardNumber = elements.create('cardNumber', { style })
      cardNumber.mount(this.$refs.stripeCardNumber)

      const cardExpiry = elements.create('cardExpiry', { style })
      cardExpiry.mount(this.$refs.stripeCardExpiry)

      const cardCvc = elements.create('cardCvc', { style })
      cardCvc.mount(this.$refs.stripeCardCvc)

      this.stripeCardElement = cardNumber
    },
    async submitPayment () {
      try {
        this.$nuxt.$loading.start()
        this.stripePaymentProcessing = true
        this.stripeErrorMessage = null

        const res = await this.stripe.confirmCardPayment(this.stripePaymentIntentSecret, {
          payment_method: {
            card: this.stripeCardElement,
          },
        })

        console.log({ res })

        if (res?.paymentIntent?.status === 'succeeded') {
          this.stripePaymentSucceeded = true
          return
        }

        if (res.error) {
          throw res.error
        }
      } catch (error) {
        console.log({ error: error.message })

        this.stripeErrorMessage = error.message
      } finally {
        this.stripePaymentProcessing = false
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
