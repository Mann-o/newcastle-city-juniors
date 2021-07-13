<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching the selected player. This likely means you do not have access to this player.
    </div>
    <div v-else>
      <h1>Player Management - {{ player.full_name }}</h1>

      <div>
        <h2>One-Off Payments</h2>
        <table class="table-auto border-collapse w-full lg:w-auto text-sm">
          <thead>
            <tr>
              <th class="text-left p-2 pl-0">Amount</th>
              <th class="text-left p-2">Description</th>
              <th class="text-left p-2 pr-0">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2 pl-0 align-top">{{ player.payment_intent.amount | gbp }}</td>
              <td class="p-2 align-top">
                <span v-if="player.membership_fee_option === 'upfront'">
                  1x payment to cover annual subscriptions for the 2021-22 season
                </span>
                <span v-if="player.membership_fee_option === 'subscription'">
                  1x payment to cover £28.50 registration fee and £28.50 July monthly subscription
                </span>
              </td>
              <td class="p-2 pr-0 align-top">
                <span v-if="player.payment_intent.status !== 'succeeded'">
                  Due - <a class="underline" href="#" @click.prevent="pay()">Pay Now</a>
                </span>
                <span v-else class="bg-success text-white py-1 px-2 rounded-sm">
                  <FontAwesomeIcon class="mr-1" :icon="['fal', 'check']" />
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-show="paying" class="mt-8">
          <form @submit.prevent="finalisePay()" ref="stripe-payment-form">
            <div class="border border-grey-400 p-4 max-w-md" ref="stripe-card-element" />
            <button
              type="submit"
              :disabled="buttonDisabled || paymentProcessing"
              class="
                mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
              "
            >
              {{ buttonLabel }}
            </button>
            <p class="mt-4 text-danger" v-if="cardError">{{ cardError }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalPlayerId',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    player: null,
    paying: false,
    paymentProcessing: false,
    stripe: null,
    elements: null,
    card: null,
    buttonDisabled: true,
    cardError: null,
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

  async fetch () {
    const { data: { data: player } } = await this.$axios.get(`/api/club/players/${this.$nuxt.context.params.id}`)
    this.player = player
  },

  computed: {
    buttonLabel() {
      return this.paymentProcessing
        ? 'Please wait...'
        : 'Pay Now'
    },
  },

  methods: {
    stripeLoadedCallback () {
      this.stripe = window.Stripe(this.$config.stripeApiKey)
      this.elements = this.stripe.elements()

      // const style = {
      //   base: {
      //     color: '#32325d',
      //     fontFamily: 'Arial, sans-serif',
      //     fontSmoothing: 'antialiased',
      //     fontSize: '16px',
      //     "::placeholder": {
      //       color: '#32325d',
      //     },
      //   },
      //   invalid: {
      //     fontFamily: 'Arial, sans-serif',
      //     color: '#fa755a',
      //     iconColor: '#fa755a',
      //   },
      // }
    },
    pay() {
      this.card = this.elements.create('card')

      this.card.mount(this.$refs['stripe-card-element'])

      this.card.on('change', event => {
        this.buttonDisabled = event.empty
        this.cardError = event.error ? event.error.message : null
      })

      this.paying = true
    },
    async finalisePay() {
      this.cardError = null
      this.paymentProcessing = true

      try {
        const result = await this.stripe.confirmCardPayment(this.player.payment_intent.client_secret, {
          payment_method: {
            card: this.card,
          },
          receipt_email: this.$auth.user.email,
        })

        if (result.error) {
          this.cardError = result.error.message
        } else {
          this.removeStripeForm()
          this.reloadPlayer()
        }
      } catch (error) {
        this.cardError = error.message
      } finally {
        this.paymentProcessing = false
      }
    },
    removeStripeForm() {
      this.paying = false
      this.card = null
      this.buttonDisabled = true
      this.cardError = null
    },
    async reloadPlayer() {
      const { data: { data: player } } = await this.$axios.get(`/api/club/players/${this.player.id}`)
      this.player = player;
    },
  },
}
</script>
