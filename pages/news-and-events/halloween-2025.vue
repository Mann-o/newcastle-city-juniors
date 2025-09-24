<template>
  <div>
    <h1>Newcastle City Juniors - Halloween 2025</h1>

    <div class="mx-auto max-w-3xl">
      <img src="https://images.ctfassets.net/yv1glylq11v9/1FH2FspB3cEVF94C8uJZ0z/a8ae871f60db0029f3d1095e314f19e7/WhatsApp_Image_2025-08-07_at_19.49.51.jpeg">
    </div>

    <p class="py-8">Newcastle City Juniors are excited to announce our Halloween 2025 event!</p>

    <div class="pb-8">
      <ul class="list-disc list-inside">
        <li>Friday, 31st October 2025</li>
        <li>Come dressed in your spookiest costumes!</li>
        <li>Prizes for the best dressed adult and child</li>
        <li>Fun activities and games for all the family</li>
        <li>6.00pm 'til late'</li>
        <li>Entry - £5 per person (adult or child)</li>
        <li>Venue - Gibside Gardens, Newcastle upon Tyne, NE15 7PP</li>
      </ul>
    </div>

    <p class="pb-8">To book your tickets, simply tap the button below, complete all fields, and make payment!</p>

    <!-- Ticket availability indicator -->
    <div v-if="!ticketAvailability.available" class="mb-6 p-4 border rounded-lg">
      <div class="bg-red-100 border-red-400 text-red-700 p-3 rounded flex gap-4 items-center">
        <FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" class="mr-2 text-xl" />
        <strong>All tickets are currently sold out. Please reach out to <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> if you have any questions.</strong>
      </div>
    </div>

    <button
      v-if="!formActive"
      class="
        py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
        hover:bg-black hover:text-white
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400
      "
      :disabled="!ticketAvailability.available"
      @click="showSignupForm()"
    >
      {{ !ticketAvailability.available ? 'All Tickets Sold Out' : 'Buy Tickets' }}
    </button>

    <div v-if="formActive">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form class="mt-8 md:max-w-lg" @submit.prevent="handleSubmit(completePayment)">
          <FormSection label="Halloween Party 2025 - Ticket Purchase">
            <p class="mb-8"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Full Name" v-model="form.fullName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required|email" tag="div" mode="eager">
              <FormElement label="Email Address" field-type="email" help-text="This is where your payment receipt will be sent" v-model="form.emailAddress" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Contact Number" help-text="A contact number for the ticket purchase" v-model="form.contactNumber" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement
                label="Number of Tickets"
                field-type="number"
                v-model="form.ticketsRequired"
                help-text="£5 per ticket (adult or child)"
                :min="1"
                :max="10"
                :step="1"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <div
              class="flex items-center cursor-pointer border p-4 transition-colors mb-4"
              :class="{
                'border-grey-400': giftAidDeclarationAccepted,
                'border-success': giftAidDeclarationAccepted,
                'bg-grey-200': giftAidDeclarationAccepted,
                'bg-success-bg': giftAidDeclarationAccepted,
              }"
              @click="toggleGiftAidDeclarationAcceptance()"
            >
              <input type="checkbox" v-model="giftAidDeclarationAccepted">
              <p class="ml-4">By ticking this box, I am certifying that I want to Gift Aid any payments/donations to Newcastle City Juniors. This includes any payments/donations that I make in the future, or may have made in the past. I am also certifying that I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my payments/donations in any given tax year, it is my responsibility to pay the difference.</p>
            </div>
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
            :disabled="invalid || stripe.payment.loading || !ticketAvailability.available"
          >
            <span v-if="!ticketAvailability.available">
              All Tickets Sold Out
            </span>
            <span v-else>
              {{ stripe.payment.loading ? 'Processing payment...' : `Pay £${(paymentAmount / 100).toFixed(2)}` }}
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
  name: 'PageNewsAndEventsHalloween2025',

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
          src: 'https://js.stripe.com/v3/',
          defer: true,
        },
      ],
    }
  },

  data: () => ({
    formActive: false,
    giftAidDeclarationAccepted: false,
    ticketAvailability: {
      available: true,
      remaining: null,
    },
    form: {
      fullName: null,
      emailAddress: null,
      contactNumber: null,
      ticketsRequired: 1,
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
      return (this.form.ticketsRequired || 1) * 500; // £5 per ticket in pence
    },
  },

  watch: {
    'form.ticketsRequired': function updatePaymentIntent() {
      this.$nextTick(async () => {
        if (this.stripe.payment.intent) {
          try {
            await this.$axios.post('/api/stripe/payment-intents/halloween-2025', {
              amount: this.paymentAmount,
              form: this.form,
              paymentIntentId: this.stripe.payment.intent,
            });

            this.stripe.elements.root.fetchUpdates();
          } catch (error) {
            this.handleTicketLimitError(error);
          }
        }
      });
    },
  },

  mounted() {
    this.checkTicketAvailability();
  },

  methods: {
    async checkTicketAvailability() {
      try {
        // Make a lightweight request to check availability without creating a payment intent
        const { data } = await this.$axios.get(`/api/stripe/halloween-2025-availability/${this.form.ticketsRequired}`);

        console.log({ data })

        if (data?.availability != null) {
          this.ticketAvailability.available = data.availability.available;
          this.ticketAvailability.remaining = data.availability.remaining;
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

          const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/halloween-2025', {
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
        this.ticketAvailability.available = false;
        this.ticketAvailability.remaining = errorData.remaining;

        // Show user-friendly error message
        this.stripe.payment.error = errorData.message;
      }
    },
    async completePayment() {
      // Prevent submission if tickets are not available
      if (!this.ticketAvailability.available) {
        this.stripe.payment.error = 'Tickets are no longer available.';
        return;
      }

      this.stripe.payment.error = null;
      this.stripe.payment.loading = true;

      try {
        await this.$axios.post('/api/stripe/payment-intents/halloween-2025', {
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
