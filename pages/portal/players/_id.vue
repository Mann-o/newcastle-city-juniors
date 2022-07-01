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
              <th class="text-left px-4 py-2 pl-0">Amount</th>
              <th class="text-left px-4 py-2">Description</th>
              <th class="text-left px-4 py-2 pr-0">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 pl-0 align-top">{{ player.payment_intent.amount | gbp }}</td>
              <td class="px-4 py-2 align-top">
                <span v-if="player.membership_fee_option === 'upfront'">
                  1x payment to cover annual subscriptions for the 2021-22 season
                </span>
                <span v-if="player.membership_fee_option === 'subscription'">
                  1x payment to cover £28.50 registration fee and £28.50 July monthly subscription
                </span>
              </td>
              <td class="px-4 py-2 pr-0 align-top">
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

      <div class="mt-16" v-if="player.membership_fee_option === 'subscription'">
        <h2>Subscriptions</h2>
        <div v-if="player.subscription">
          <table class="table-auto border-collapse w-full lg:w-auto text-sm">
            <thead>
              <tr>
                <th class="text-left px-4 py-2 pl-0">Amount</th>
                <th class="text-left px-4 py-2">Description</th>
                <!-- <th class="text-left px-4 py-2">Last payment made</th> -->
                <th class="text-left px-4 py-2 pr-0">Next payment date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2 pl-0 align-top">{{ player.subscription.plan.amount | gbp }}</td>
                <td class="px-4 py-2 align-top">Monthly subs for the 2021-22 season</td>
                <!-- <td class="px-4 py-2 align-top">N/A</td> -->
                <td class="px-4 py-2 pr-0 align-top">{{ nextSubscriptionDate }}</td>
              </tr>
            </tbody>
          </table>
          <p class="mt-4">
            If you have not yet already done so, you should visit the Subscriptions Portal using the button below to provide a default payment method for your subscription payments.</p>
          <p class="mt-4">You can also use the Subscriptions Portal to view your active subscription(s), billing history, invoices, and manage your personal billing information.
          </p>
          <p class="mt-4">
            <button
              @click="redirectToSubscriptionPortal()"
              class="
                mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
              "
            >
              Subscriptions Portal
            </button>
          </p>
        </div>
        <div v-else>
          <div v-if="!settingUpSubscription">
            <p class="mb-4">You do not currently have an active subscription for <strong>{{ player.full_name }}</strong>.</p>
            <p>You <strong>must</strong> set up this subscription before your first monthly payment is due in <strong>{{ subscriptionMonthDue }}</strong>.</p>
            <button
              @click="setupSubscription()"
              class="
                mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
              "
            >
              Subscription Setup
            </button>
          </div>
          <div v-else>
            <p class="mb-4">The cost of your monthly membership fee for <strong>{{ player.full_name }}</strong> is <strong>{{ player.sex === 'male' ? '2850' : '2000' | gbp }} per month</strong>.
            <p class="mb-4">You <strong>must</strong> set up this subscription before your first monthly payment is due in <strong>{{ subscriptionMonthDue }}</strong>.</p>
            <p class="mb-4">Due to the nature of our subscription service, when creating this subscription it will start immediately but under a "free trial" mode up until your chosen payment date in {{ subscriptionMonthDue }}.</p>
            <p class="mb-4">On your chosen payment date the free trial will expire and your first monthly subscription payment will be taken. This payment date will be used for all future payments, and your subscription will automatically cancel itself after your final payment in May 2022.</p>
            <p class="mb-8">To proceed with setting up the subscription, please choose a payment date below and submit:</p>
            <div class="max-w-lg">
              <ValidationObserver v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(createSubscription)">
                  <div>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      tag="div"
                    >
                      <FormSelect
                        label="Choose Payment Date:"
                        :options="subscriptionPaymentDateOptions"
                        v-model="subscriptionForm.subscriptionDate"
                        :invalid="errors.length > 0"
                        help-text="This is the date each month your subscription payment will be taken, and must be between the 1st and 15th of each month"
                      />
                      <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <button
                    type="submit"
                    :disabled="invalid || creatingSubscription"
                    class="
                      mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                      hover:bg-black hover:text-white
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
                    "
                  >
                    Create Subscription
                  </button>
                  <p
                    class="mt-4 text-danger"
                    v-if="createSubscriptionError"
                  >
                    {{ createSubscriptionError }}
                  </p>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, fromUnixTime, getMonth } from 'date-fns'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PagePortalPlayerId',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
    FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
    ValidationObserver,
    ValidationProvider,
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
    subscriptionPaymentDateOptions: [
      { key: '01', value: '1st' },
      { key: '02', value: '2nd' },
      { key: '03', value: '3rd' },
      { key: '04', value: '4th' },
      { key: '05', value: '5th' },
      { key: '06', value: '6th' },
      { key: '07', value: '7th' },
      { key: '08', value: '8th' },
      { key: '09', value: '9th' },
      { key: '10', value: '10th' },
      { key: '11', value: '11th' },
      { key: '12', value: '12th' },
      { key: '13', value: '13th' },
      { key: '14', value: '14th' },
      { key: '15', value: '15th' },
    ],
    settingUpSubscription: false,
    subscriptionForm: {
      subscriptionDate: null,
    },
    creatingSubscription: false,
    createSubscriptionError: null,
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
    nextSubscriptionDate() {
      return format(fromUnixTime(this.player.subscription.current_period_end), 'dd/MM/yyyy')
    },
    subscriptionMonthDue() {
      const currentDate = new Date()

      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      return months[getMonth(currentDate) + 1]
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
          receipt_email: this.$auth.user[0].email,
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
    async redirectToSubscriptionPortal() {
      const { data: { data: { url } } } = await this.$axios.post('/api/stripe/create-customer-portal-session', {
        returnUrl: window.location.href,
      })
      window.location.replace(url)
    },
    setupSubscription() {
      this.settingUpSubscription = true
    },
    async createSubscription() {
      this.creatingSubscription = true
      this.createSubscriptionError = null

      try {
        const { data } = await this.$axios.post('/api/stripe/create-subscription', {
          playerId: this.player.id,
          subscriptionDate: this.subscriptionForm.subscriptionDate,
        })

        if (data.status.toLowerCase() === 'ok') {
          window.location.reload()
        } else {
          throw new Error('Unable to create subscription')
        }
      } catch (error) {
        this.subscriptionError = error
      } finally {
        this.creatingSubscription = false
      }
    },
  },

  mounted() {
    this.subscriptionForm.subscriptionDate = this.subscriptionPaymentDateOptions[0].key
  },
}
</script>
