<template>
  <div>
    <h1>Newcastle City Juniors - Football Talk-In</h1>

    <div class="mx-auto max-w-5xl">
      <img src="https://images.ctfassets.net/yv1glylq11v9/7oJ6K1m1U3z75pi9nJE5TP/575d2dd25990a806d0dcb346f908f075/image__2___1_.png">
    </div>

    <p class="py-8">Newcastle City Juniors are happy to announce our upcoming Football Talk-In!</p>

    <div class="pb-8">
      <ul class="list-disc list-inside">
        <li>Friday, 12th September 2025</li>
        <li>The one you have all been waiting for!</li>
        <li>Newcastle United legend Kevin Keegan returns to Benwell</li>
        <li>Join us, and celebrate our 20<sup>th</sup> anniversary in style</li>
        <li>Doors open from 6.00pm</li>
        <li>Meal - Pies &amp; Peas</li>
        <li>Entry - £600 for table of 10 people or individual tickets are £65 per person</li>
        <li>Live - Juve Lounge, NE15 7PP</li>
      </ul>
    </div>

    <!-- <p><strong>This event is in the past and can no longer be booked.</strong></p> -->

    <p class="pb-8"><strong>Full payment is required up-front to secure your booking.</strong></p>

    <p class="pb-8">To book a table or individual ticket, simply tap the button below, complete all fields, and make payment!</p>

    <!-- Ticket availability indicator -->
    <div v-if="!ticketAvailability.table.available || !ticketAvailability.individual.available" class="mb-6 p-4 border rounded-lg">
      <div v-if="!ticketAvailability.table.available && !ticketAvailability.individual.available" class="bg-red-100 border-red-400 text-red-700 p-3 rounded flex gap-4 items-center">
        <FontAwesomeIcon :icon="['fad', 'triangle-exclamation']" class="mr-2 text-xl" />
        <strong>All tickets are currently sold out. Please reach out to <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> if you have any questions.</strong>
      </div>
      <div v-else class="bg-yellow-100 border-yellow-400 text-yellow-700 p-3 rounded flex gap-4 items-center">
        <FontAwesomeIcon :icon="['fad', 'circle-info']" class="mr-2 text-xl" />
        <div>
          <strong>Limited availability:</strong>
          <ul class="list-disc list-inside mt-2 ml-4">
            <li v-if="!ticketAvailability.table.available">Table tickets (£600) - <span class="font-semibold">SOLD OUT</span></li>
            <li v-if="!ticketAvailability.individual.available">Individual tickets (£65) - <span class="font-semibold">SOLD OUT</span></li>
            <li v-if="ticketAvailability.table.available">Table tickets (£600) - <span class="font-semibold text-green-600">AVAILABLE</span></li>
            <li v-if="ticketAvailability.individual.available">Individual tickets (£65) - <span class="font-semibold text-green-600">AVAILABLE</span></li>
          </ul>
        </div>
      </div>
    </div>

    <button
      v-if="!formActive"
      class="
        py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
        hover:bg-black hover:text-white
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400
      "
      :disabled="availableTicketOptions.length === 0"
      @click="showSignupForm()"
    >
      {{ availableTicketOptions.length === 0 ? 'All Tickets Sold Out' : 'Register' }}
    </button>

    <div v-if="formActive">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form class="mt-8 md:max-w-lg" @submit.prevent="handleSubmit(completePayment)">
          <FormSection label="Football Talk-In 2025 - Registration">
            <p class="mb-8"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormSelect
                label="Ticket Option"
                :options="ticketOptions"
                v-model="form.ticketOption"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              <!-- Show availability warnings -->
              <div v-if="!ticketAvailability.table.available && !ticketAvailability.individual.available" class="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                <strong>All ticket types are currently sold out.</strong>
              </div>
              <div v-else-if="!ticketAvailability.table.available || !ticketAvailability.individual.available" class="mt-2 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                <strong>Limited availability:</strong>
                <span v-if="!ticketAvailability.table.available">Table tickets are sold out.</span>
                <span v-if="!ticketAvailability.individual.available">Individual tickets are sold out.</span>
              </div>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Full Name" v-model="form.fullName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="House No. and Street Name" v-model="form.houseNameAndNumber" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="City" v-model="form.city" help-text="Postcode will be collected when entering your payment information below" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required|email" tag="div" mode="eager">
              <FormElement label="Email Address" field-type="email" help-text="This is where your payment receipt will be sent" v-model="form.emailAddress" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Contact Number" v-model="form.contactNumber" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </FormSection>
          <div v-if="stripe.elements.showBlockError" class="mb-4">
            <p class="text-danger">Your browser appears to be blocking our payment provider, Stripe, from loading on this page. Please disable any tracking/ad blockers such as uBlock Origin or AdBlock and reload the page.</p>
          </div>
          <div id="payment-element" class="mb-4" />
          <button
            type="submit"
            class="
              py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
              hover:bg-black hover:text-white
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
            "
            :disabled="invalid || stripe.payment.loading || !isSelectedOptionAvailable || availableTicketOptions.length === 0"
          >
            <span v-if="availableTicketOptions.length === 0">
              All Tickets Sold Out
            </span>
            <span v-else-if="!isSelectedOptionAvailable">
              Selected Option Unavailable
            </span>
            <span v-else>
              {{ stripe.payment.loading ? 'Processing payment...' : `Pay £${paymentAmount / 100}` }}
            </span>
          </button>
          <div class="mt-4" v-if="stripe.payment.error">
            <span id="payment-message" class="text-danger">{{ stripe.payment.error }}</span>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'PageNewsAndEventsFootyTalkIn2025Keegan',

  scrollToTop: true,

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
    FormSection: () => import('@/components/elements/forms/FormSection.vue'),
    FormElement: () => import('@/components/elements/forms/FormElement.vue'),
    FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
    FormTotalCost: () => import('@/components/elements/forms/FormTotalCost.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  head () {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://js.stripe.com/basil/stripe.js',
          defer: true,
        },
      ],
    }
  },

  data: () => ({
    formActive: false,
    ticketAvailability: {
      table: { available: true, remaining: null },
      individual: { available: true, remaining: null },
    },
    form: {
      ticketOption: 'table',
      fullName: null,
      houseNameAndNumber: null,
      city: null,
      contactNumber: null,
      emailAddress: null,
    },
    stripe: {
      client: null,
      elements: {
        root: null,
        payment: null,
        showBlockError: false,
      },
      payment: {
        intent: null,
        error: null,
        loading: false,
      },
    },
  }),

  computed: {
    paymentAmount() {
      return this.form.ticketOption === 'table' ? 60000 : 6500;
    },
    ticketOptions() {
      return [
        {
          key: 'table',
          value: this.ticketAvailability.table.available
            ? 'Table of 10 (£600)'
            : 'Table of 10 (£600) - SOLD OUT',
          disabled: !this.ticketAvailability.table.available
        },
        {
          key: 'individual',
          value: this.ticketAvailability.individual.available
            ? 'Individual (£65)'
            : 'Individual (£65) - SOLD OUT',
          disabled: !this.ticketAvailability.individual.available
        },
      ];
    },
    availableTicketOptions() {
      return this.ticketOptions.filter(option => !option.disabled);
    },
    isSelectedOptionAvailable() {
      return this.ticketAvailability[this.form.ticketOption]?.available;
    },
  },

  watch: {
    'form.ticketOption': function updatePaymentIntent() {
      this.$nextTick(async () => {
        try {
          await this.$axios.post('/api/stripe/payment-intents/footy-talk-in-2025-keegan', {
            amount: this.paymentAmount,
            form: this.form,
            paymentIntentId: this.stripe.payment.intent,
          });

          this.stripe.elements.root.fetchUpdates();
        } catch (error) {
          this.handleTicketLimitError(error);
        }
      });
    },
  },

  async mounted() {
    await this.checkTicketAvailability();
  },

  methods: {
    async checkTicketAvailability() {
      try {
        // Make a lightweight request to check availability without creating a payment intent
        const { data } = await this.$axios.get('/api/stripe/footy-talk-keegan-availability');

        if (data?.availability?.table != null) {
          this.ticketAvailability.table.available = data.availability.table.available;
          this.ticketAvailability.table.remaining = data.availability.table.remaining;
        }

        if (data?.availability?.individual != null) {
          this.ticketAvailability.individual.available = data.availability.individual.available;
          this.ticketAvailability.individual.remaining = data.availability.individual.remaining;
        }

        // Auto-select first available option if current selection is unavailable
        if (!this.isSelectedOptionAvailable && this.availableTicketOptions.length > 0) {
          this.form.ticketOption = this.availableTicketOptions[0].key;
        }
      } catch (error) {
        // If the availability check endpoint doesn't exist, we'll rely on error handling during payment intent creation
        console.log('Ticket availability check not available, will check during payment process');
      }
    },
    async showSignupForm() {
      if (!this.formActive) {
        this.formActive = true;

        // Check availability before showing form
        await this.checkTicketAvailability();

        try {
          this.stripe.client = window.Stripe(this.$config.stripeApiKey);

          const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/footy-talk-in-2025-keegan', {
            amount: this.paymentAmount,
            form: this.form,
            paymentIntentId: this.stripe.payment.intent,
          });

          this.stripe.payment.intent = paymentIntent.id;

          this.stripe.elements.root = this.stripe.client.elements({
            clientSecret: paymentIntent.client_secret,
          });

          this.stripe.elements.payment = this.stripe.elements.root.create('payment', { layout: 'tabs' });
          this.stripe.elements.payment.mount('#payment-element');
        } catch (error) {
          if (error.response?.status === 400 && error.response?.data?.status === 'Ticket Limit Reached') {
            this.handleTicketLimitError(error);
          } else {
            this.stripe.elements.showBlockError = true;
          }
        }
      }
    },
    handleTicketLimitError(error) {
      const errorData = error.response?.data;
      if (errorData?.status === 'Ticket Limit Reached') {
        // Update availability based on the error message
        if (errorData.message.toLowerCase().includes('table')) {
          this.ticketAvailability.table.available = false;
          this.ticketAvailability.table.remaining = errorData.remaining;
        }
        if (errorData.message.toLowerCase().includes('individual')) {
          this.ticketAvailability.individual.available = false;
          this.ticketAvailability.individual.remaining = errorData.remaining;
        }

        // Auto-select the first available option
        const availableOptions = this.availableTicketOptions;
        if (availableOptions.length > 0 && !this.isSelectedOptionAvailable) {
          this.form.ticketOption = availableOptions[0].key;
        }

        // Show user-friendly error message
        this.stripe.payment.error = errorData.message;
      }
    },
    async completePayment() {
      // Prevent submission if selected option is not available
      if (!this.isSelectedOptionAvailable) {
        this.stripe.payment.error = 'The selected ticket type is no longer available. Please select a different option.';
        return;
      }

      this.stripe.payment.error = null;
      this.stripe.payment.loading = true;

      try {
        await this.$axios.post('/api/stripe/payment-intents/footy-talk-in-2025-keegan', {
          amount: this.paymentAmount,
          form: this.form,
          paymentIntentId: this.stripe.payment.intent,
        });

        await this.stripe.elements.root.fetchUpdates();

        const { error } = await this.stripe.client.confirmPayment({
          elements: this.stripe.elements.root,
          confirmParams: {
            receipt_email: this.form.emailAddress,
            return_url: `${window.location.origin}/payment-success`,
          },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
          this.stripe.payment.error = error.message;
        } else {
          this.stripe.payment.error = 'An unexpected error occurred, please try again';
        }

        this.stripe.payment.loading = false;
      } catch (error) {
        this.stripe.payment.loading = false;

        if (error.response?.status === 400 && error.response?.data?.status === 'Ticket Limit Reached') {
          this.handleTicketLimitError(error);
        } else {
          console.log(error);
        }
      }
    },
  },
};
</script>
