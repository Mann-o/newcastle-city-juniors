<template>
  <div>
    <h1>NCJ Presentation - 2023-2024 Season</h1>
    <p class="mb-8">Newcastle City Juniors Annual Club Presentation for the 2023-2024 season is being held on Friday 31st May 2024 for all our members at <a href="https://www.google.com/maps/place/The+Fed/@54.9540525,-1.659847,17z/data=!3m1!5s0x487e77639f10bc91:0x522d0945f69766b1!4m14!1m7!3m6!1s0x487e77637ab64571:0xd685d09279b5f6e!2sThe+Fed!8m2!3d54.9540494!4d-1.6572721!16s%2Fg%2F1tj88_fh!3m5!1s0x487e77637ab64571:0xd685d09279b5f6e!8m2!3d54.9540494!4d-1.6572721!16s%2Fg%2F1tj88_fh?entry=ttu" target="_blank">The Fed, Lancaster Road, Dunston, Gateshead, NE11 9JR</a>.</p>
    <p class="mb-8">The event will be for all our teams (Under 6s - Under 16s). Doors will open from 6pm with a prompt 7pm start.</p>
    <p class="mb-8">Costs for our club presentation is £5.00 per person with ALL Newcastle City Juniors players having FREE entry.</p></p>
    <p class="mb-8">There is a dress code for ALL players to adhere to which is: white shirt, NCJ club tie, dress pants and shoes. Club ties can be purchased via the club directly for £6.00.</p>
    <p class="mb-8">If you have any questions about our Presentation please contact your child's team coach.</p>
    <p class="mb-8">Please click the link below to register your child's attendance with a FREE ticket, and to purchase up to TWO additional ticket(s). You will receive an email confirmation of your purchased ticket(s).</p>

    <button
      v-if="!formActive"
      class="
        py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
        hover:bg-black hover:text-white
      "
      @click="showSignupForm()"
    >
      Purchase Tickets
    </button>

    <div v-if="formActive">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form class="mt-8 md:max-w-2xl" @submit.prevent="handleSubmit(completePayment)">
          <FormSection label="NCJ Presentation (2023-2024 Season) - Ticket Purchase">
            <p class="mb-8"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
            <p class="mb-8">Tickets are currently limited to 2 per FREE player.</p>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Child Name" v-model="form.childName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <FormSelect class="mb-4" label="Age Group" :options="ageGroupOptions" v-model="form.ageGroup" required />
            <FormSelect class="mb-4" label="Team Name" :options="filteredTeamNameOptions" v-model="form.teamName" required />
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Coaches Name" v-model="form.coachName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <FormSelect
              class="mb-4"
              label="No. of Tickets Required"
              help-text="Please select the number of ADDITIONAL tickets you require to your FREE player ticket."
              :options="[
                { key: 1, value: 1 },
                { key: 2, value: 2 },
              ]"
              v-model="form.ticketsRequired"
              required
            />
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Guest Names" v-model="form.guestNames" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required|email" tag="div" mode="eager">
              <FormElement label="Email Address" field-type="email" help-text="This is where your payment receipt will be sent" v-model="form.emailAddress" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </FormSection>
          <div v-if="stripe.elements.showBlockError" class="mb-4">
            <p class="text-danger">Your browser appears to be blocking our payment provider, Stripe, from loading on this page. Please disable any tracking/ad blockers such as uBlock Origin or AdBlock, and then reload the page.</p>
          </div>
          <div id="payment-element" class="mb-4" />
          <button
            type="submit"
            class="
              py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
              hover:bg-black hover:text-white
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
            "
            :disabled="invalid || stripe.payment.loading || stripe.elements.showBlockError"
          >
            {{ stripe.payment.loading ? 'Processing payment...' : `Pay £${activePrice}` }}
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
  name: 'PageNewsAndEventsPresentation2023',

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
    form: {
      childName: null,
      ageGroup: 'under-6s',
      teamName: 'under-6s',
      coachName: null,
      ticketsRequired: 1,
      guestNames: null,
      emailAddress: null,
    },
    ageGroupOptions: [
      { key: 'under-6s', value: 'Under 6s' },
      { key: 'under-7s', value: 'Under 7s' },
      { key: 'under-8s', value: 'Under 8s' },
      { key: 'under-9s', value: 'Under 9s' },
      { key: 'under-10s', value: 'Under 10s' },
      { key: 'under-11s', value: 'Under 11s' },
      { key: 'under-12s', value: 'Under 12s' },
      { key: 'under-13s', value: 'Under 13s' },
      { key: 'under-14s', value: 'Under 14s' },
      { key: 'under-15s', value: 'Under 15s' },
      { key: 'under-16s', value: 'Under 16s' },
    ],
    teamNameOptions: [
      { key: 'under-6s', value: 'Under 6s', ageGroup: 'under-6s' },
      { key: 'under-7s', value: 'Under 7s', ageGroup: 'under-7s' },
      { key: 'under-8s', value: 'Under 8s', ageGroup: 'under-8s' },
      { key: 'under-9s', value: 'Under 9s', ageGroup: 'under-9s' },
      { key: 'under-10s', value: 'Under 10s', ageGroup: 'under-10s' },
      { key: 'under-11s', value: 'Under 11s', ageGroup: 'under-11s' },
      { key: 'under-12s', value: 'Under 12s', ageGroup: 'under-12s' },
      { key: 'under-13s', value: 'Under 13s', ageGroup: 'under-13s' },
      { key: 'under-14s', value: 'Under 14s', ageGroup: 'under-14s' },
      { key: 'under-15s', value: 'Under 15s', ageGroup: 'under-15s' },
      { key: 'under-16s', value: 'Under 16s', ageGroup: 'under-16s' },
    ],
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
    activePrice() {
      return (this.form.ticketsRequired * 5).toFixed(2);
    },
    filteredTeamNameOptions() {
      return this.teamNameOptions.filter(({ ageGroup }) => ageGroup === this.form.ageGroup);
    },
  },

  watch: {
    'form.ticketsRequired': function updatePaymentIntent() {
      this.$nextTick(async () => {
        await this.$axios.post('/api/stripe/payment-intents/presentation-2023', {
          amount: this.activePrice * 100,
          paymentIntentId: this.stripe.payment.intent,
        });

        this.stripe.elements.root.fetchUpdates();
      });
    },
    'form.ageGroup': function updateSelectedTeam() {
      this.$nextTick(() => {
        this.form.teamName = this.filteredTeamNameOptions[0].key;
      });
    },
  },

  methods: {
    async showSignupForm() {
      if (!this.formActive) {
        this.formActive = true;

        try {
          this.stripe.client = window.Stripe(this.$config.stripeApiKey);

          const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/presentation-2023', {
            amount: this.activePrice * 100,
            form: this.form,
            paymentIntentId: this.stripe.payment.intent,
          });

          this.stripe.payment.intent = paymentIntent.id;

          this.stripe.elements.root = this.stripe.client.elements({
            clientSecret: paymentIntent.client_secret,
          });

          this.stripe.elements.payment = this.stripe.elements.root.create('payment', { layout: 'tabs' });
          this.stripe.elements.payment.mount('#payment-element');
        } catch {
          this.stripe.elements.showBlockError = true;
        }
      }
    },
    async completePayment() {
      this.stripe.payment.error = null;
      this.stripe.payment.loading = true;

      try {
        await this.$axios.post('/api/stripe/payment-intents/presentation-2023', {
          amount: this.activePrice * 100,
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
        console.log(error);
      }
    },
  },
};
</script>
