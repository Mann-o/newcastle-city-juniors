<template>
  <div>
    <h1>Payment Success!</h1>
    <p class="mb-8">Your payment was successful. Payment details will appear below:</p>
    <Loader v-if="stripe.payment.intent == null" class="mb-8"/>
    <p v-if="stripe.payment.intent != null" class="mb-8">
      <ul class="list-inside">
        <li><strong>Payment ID:</strong> {{ stripe.payment.id }}</li>
        <li><strong>Amount:</strong> £{{ (stripe.payment.intent.amount / 100).toFixed(2) }}</li>
        <li><strong>Status:</strong> {{ stripe.payment.intent.status | uppercaseFirst }}</li>
        <li><strong>Email address for receipt:</strong> {{ stripe.payment.intent.receipt_email }}</li>
        <li><strong>Date/time:</strong> {{ new Date(stripe.payment.intent.created * 1000).toLocaleString() }}</li>
      </ul>
    </p>
    <p>You should receive an email receipt shortly. For any questions or concerns, please <NuxtLink to="/contact-us">contact us</NuxtLink>.</p>
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty';
import { uppercaseFirst } from '~/filters';

export default {
  name: 'PagePaymentSuccess',

  scrollToTop: true,

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  head() {
    return {
      title: 'Payment Success',
      script: [
        {
          hid: 'stripe',
          src: 'https://js.stripe.com/v3/',
          defer: true,
        },
      ],
    }
  },

  data: () => ({
    stripe: {
      client: null,
      payment: {
        id: null,
        clientSecret: null,
        intent: null,
      },
    },
  }),

  mounted() {
    if (isEmpty(this.$route.query)) {
      this.$router.push('/');
    }

    if (this.$route.query.payment_intent && this.$route.query.payment_intent_client_secret) {
      this.stripe.payment.id = this.$route.query.payment_intent;
      this.stripe.payment.clientSecret = this.$route.query.payment_intent_client_secret;

      // window.history.replaceState(null, null, window.location.pathname);

      this.stripe.client = window.Stripe(this.$config.stripeApiKey);

      this.fetchPaymentIntent();
    }
  },

  methods: {
    async fetchPaymentIntent() {
      const { paymentIntent } = await this.stripe.client.retrievePaymentIntent(
        this.stripe.payment.clientSecret,
      );

      this.stripe.payment.intent = paymentIntent;
    },
  },
};
</script>
