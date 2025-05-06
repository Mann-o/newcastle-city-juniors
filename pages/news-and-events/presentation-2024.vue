<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching page configuration!
    </div>

    <div v-else-if="parseInt(ticketsRemaining.earlyTicketsRemaining, 10) === 0 && parseInt(ticketsRemaining.lateTicketsRemaining, 10) === 0">
      <h1>NCJ Presentation - 2024-2025 Season</h1>

      <div class="bg-gold p-4 inline-block mb-8">
        <h2 class="border-0">TICKET SALES CLOSED</h2>
        <p>Unfortunately no further tickets are available and ticket sales are now closed. If you have any questions or concerns please reach out to <a href="info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a>.</p>
      </div>
    </div>

    <div v-else>
      <h1>NCJ Presentation - 2024-2025 Season</h1>

      <p class="mb-8">Newcastle City Juniors Annual Club Presentation for the 2024-2025 season is being held on Saturday 7th June 2025 for all our members at <a href="https://www.google.com/maps/place/The+Fed/@54.9540525,-1.659847,17z/data=!3m1!5s0x487e77639f10bc91:0x522d0945f69766b1!4m14!1m7!3m6!1s0x487e77637ab64571:0xd685d09279b5f6e!2sThe+Fed!8m2!3d54.9540494!4d-1.6572721!16s%2Fg%2F1tj88_fh!3m5!1s0x487e77637ab64571:0xd685d09279b5f6e!8m2!3d54.9540494!4d-1.6572721!16s%2Fg%2F1tj88_fh?entry=ttu" target="_blank">The Fed, Lancaster Road, Dunston, Gateshead, NE11 9JR</a>.</p>
      <p class="mb-8">The event will be split into two sessions on the day.</p>
      <p>11am-3pm - Girls Wildcats 5-11 years, Football development 3-6 years, Girls Under 7s-Under 11s</p>
      <p class="mb-8">Doors will open from 11am with a prompt 12pm start.</p>
      <p>6-10pm - Boys Under 7s - Under 16s</p>
      <p class="mb-8">Doors will open from 6pm with a prompt 7pm start.</p>
      <p class="mb-8">Costs for our club presentation is £5.00 per person with ALL Newcastle City Juniors players having FREE entry.</p>
      <p class="mb-8">There is a dress code for ALL players to adhere to which is: white shirt, NCJ club tie, dress pants and shoes. Club ties can be purchased via the club directly for £6.00.</p>
      <p class="mb-8">If you have any questions about our Presentation please contact your child's team coach.</p>
      <p class="mb-8">Please click the link below to purchase your ticket(s) and provide the information requested. You will receive an email confirmation of your purchased ticket(s). You will be asked before entering to show proof of your ticket on the day.</p>

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
            <FormSection label="NCJ Presentation (2024-2025 Season) - Ticket Purchase">
              <p class="mb-8"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
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
                label="Do you need a FREE ticket for the above named child?"
                help-text="Only select 'Yes' if you, or someone you know, does not already have a player ticket"
                :options="[
                  { key: 'true', value: 'Yes' },
                  { key: 'false', value: 'No' },
                ]"
                v-model="form.needsPlayerTicket"
                required
              />
              <FormSelect
                class="mb-4"
                label="Number of GUEST Tickets Required"
                help-text="Please select the number of tickets you require for guests"
                :options="ticketsRequiredOptions"
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
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'PageNewsAndEventsPresentation2024',

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
      ageGroup: 'development',
      teamName: 'development',
      coachName: null,
      ticketsRequired: 1,
      guestNames: null,
      emailAddress: null,
      needsPlayerTicket: 'true',
      session: 'early',
    },
    ageGroupOptions: [
      { key: 'development', value: 'Football Development (3-6 Years)' },
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
      { key: 'development', value: 'Football Development (3-6 Years)', ageGroup: 'development', session: 'early' },
      { key: 'u7-girls-saturday', value: 'Girls (Saturday)', ageGroup: 'under-7s', session: 'early' },
      { key: 'u7-inter', value: 'Inter', ageGroup: 'under-7s', session: 'late' },
      { key: 'u7-juve', value: 'Juve', ageGroup: 'under-7s', session: 'late' },
      { key: 'u7-milan', value: 'Milan', ageGroup: 'under-7s', session: 'late' },
      { key: 'u7-boys-saturday', value: 'Boys (Saturday)', ageGroup: 'under-7s', session: 'late' },
      { key: 'u8-girls-saturday', value: 'Girls (Saturday)', ageGroup: 'under-8s', session: 'early' },
      { key: 'u8-inter', value: 'Inter', ageGroup: 'under-8s', session: 'late' },
      { key: 'u8-lazio', value: 'Lazio', ageGroup: 'under-8s', session: 'late' },
      { key: 'u8-lazio-saturday', value: 'Lazio (Saturday)', ageGroup: 'under-8s', session: 'late' },
      { key: 'u8-milan', value: 'Milan', ageGroup: 'under-8s', session: 'late' },
      { key: 'u8-milan-saturday', value: 'Milan (Saturday)', ageGroup: 'under-8s', session: 'late' },
      { key: 'u9-girls-atalanta', value: 'Girls Atalanta', ageGroup: 'under-9s', session: 'early' },
      { key: 'u9-girls-lionesses', value: 'Girls Lionesses', ageGroup: 'under-9s', session: 'early' },
      { key: 'u9-girls-lionesses-saturday', value: 'Girls Lionesses (Saturday)', ageGroup: 'under-9s', session: 'early' },
      { key: 'u9-inter', value: 'Inter', ageGroup: 'under-9s', session: 'late' },
      { key: 'u9-juve', value: 'Juve', ageGroup: 'under-9s', session: 'late' },
      { key: 'u9-juve-saturday', value: 'Juve (Saturday)', ageGroup: 'under-9s', session: 'late' },
      { key: 'u9-milan', value: 'Milan', ageGroup: 'under-9s', session: 'late' },
      { key: 'u9-pumas', value: 'Pumas', ageGroup: 'under-9s', session: 'early' },
      { key: 'u10-atalanta', value: 'Atalanta (Boys)', ageGroup: 'under-10s', session: 'late' },
      { key: 'u10-girls-atalanta-saturday', value: 'Girls Atalanta (Saturday)', ageGroup: 'under-10s', session: 'early' },
      { key: 'u10-girls-lionesses', value: 'Girls Lionesses', ageGroup: 'under-10s', session: 'early' },
      { key: 'u10-girls-lionesses-saturday', value: 'Girls Lionesses (Saturday)', ageGroup: 'under-10s', session: 'early' },
      { key: 'u10-milan', value: 'Milan', ageGroup: 'under-10s', session: 'late' },
      { key: 'u10-napoli-saturday', value: 'Napoli (Saturday)', ageGroup: 'under-10s', session: 'late' },
      { key: 'u10-roma', value: 'Roma', ageGroup: 'under-10s', session: 'late' },
      { key: 'u11-girls-lionesses-saturday', value: 'Girls Lionesses (Saturday)', ageGroup: 'under-11s', session: 'early' },
      { key: 'u11-inter', value: 'Inter', ageGroup: 'under-11s', session: 'late' },
      { key: 'u11-inter-saturday', value: 'Inter (Saturday)', ageGroup: 'under-11s', session: 'late' },
      { key: 'u11-jaguars', value: 'Jaguars', ageGroup: 'under-11s', session: 'early' },
      { key: 'u11-juve', value: 'Juve', ageGroup: 'under-11s', session: 'late' },
      { key: 'u11-milan', value: 'Milan', ageGroup: 'under-11s', session: 'late' },
      { key: 'u11-pumas', value: 'Pumas', ageGroup: 'under-11s', session: 'early' },
      { key: 'u12-sparta', value: 'Sparta', ageGroup: 'under-12s', session: 'late' },
      { key: 'u13', value: 'Under 13s', ageGroup: 'under-13s', session: 'late' },
      { key: 'u13-saturday', value: 'Under 13s (Saturday)', ageGroup: 'under-13s', session: 'late' },
      { key: 'u14-juve', value: 'Juve', ageGroup: 'under-14s', session: 'late' },
      { key: 'u15-juve', value: 'Juve', ageGroup: 'under-15s', session: 'late' },
      { key: 'u15-saturday', value: 'Under 15s (Saturday)', ageGroup: 'under-15s', session: 'late' },
      { key: 'u16-juve', value: 'Juve', ageGroup: 'under-16s', session: 'late' },
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
    ticketsRemaining: 0,
  }),

  async fetch() {
    const { data: { data: { ticketsRemaining } } } = await this.$axios.get('/api/presentation-2024/tickets-remaining')
    this.ticketsRemaining = ticketsRemaining
  },

  computed: {
    activePrice() {
      return (this.form.ticketsRequired * 5).toFixed(2);
    },
    filteredTeamNameOptions() {
      return this.teamNameOptions.filter(({ ageGroup }) => ageGroup === this.form.ageGroup);
    },
    ticketsRequiredOptions() {
      let maxTickets = Math.min(10, this.ticketsRemaining[`${this.form.session}TicketsRemaining`]);
      return Array.from({ length: maxTickets }, (_, i) => i + 1).map(i => ({ key: i, value: i }));
    },
  },

  watch: {
    'form.ticketsRequired': function updatePaymentIntent() {
      this.$nextTick(async () => {
        await this.$axios.post('/api/stripe/payment-intents/presentation-2024', {
          amount: this.activePrice * 100,
          paymentIntentId: this.stripe.payment.intent,
          form: this.form,
        });

        this.stripe.elements.root.fetchUpdates();
      });
    },
    'form.ageGroup': function updateSelectedTeam() {
      this.$nextTick(() => {
        this.form.teamName = this.filteredTeamNameOptions[0].key;

        if (this.form.ticketsRequired > this.ticketsRemaining[`${this.form.session}TicketsRemaining`]) {
          this.form.ticketsRequired = this.ticketsRemaining[`${this.form.session}TicketsRemaining`];
        }
      });
    },
    'form.teamName': function updateSelectedSession() {
      this.$nextTick(() => {
        this.form.session = this.teamNameOptions.find(({ key }) => key === this.form.teamName).session;

        if (this.form.ticketsRequired > this.ticketsRemaining[`${this.form.session}TicketsRemaining`]) {
          this.form.ticketsRequired = this.ticketsRemaining[`${this.form.session}TicketsRemaining`];
        }
      });
    },
  },

  methods: {
    async showSignupForm() {
      if (!this.formActive) {
        this.formActive = true;

        try {
          const { data: { data: { ticketsRemaining } } } = await this.$axios.get('/api/presentation-2024/tickets-remaining')

          this.ticketsRemaining = ticketsRemaining

          if (parseInt(this.ticketsRemaining.earlyTicketsRemaining, 10) === 0 && parseInt(this.ticketsRemaining.lateTicketsRemaining, 10) === 0) {
            window.location.reload();
            return;
          }

          this.stripe.client = window.Stripe(this.$config.stripeApiKey);

          const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/presentation-2024', {
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
        const { data: { data: { ticketsRemaining } } } = await this.$axios.get('/api/presentation-2024/tickets-remaining')

        this.ticketsRemaining = ticketsRemaining

        if (this.ticketsRemaining.earlyTicketsRemaining === 0 && this.ticketsRemaining.lateTicketsRemaining === 0) {
          window.location.reload();
          return;
        }

        await this.$axios.post('/api/stripe/payment-intents/presentation-2024', {
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
