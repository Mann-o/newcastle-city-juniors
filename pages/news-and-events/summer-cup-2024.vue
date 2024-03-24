<template>
  <div>
    <h1>Newcastle City Juniors Summer Cup 2024</h1>

    <div class="mx-auto max-w-5xl">
      <img src="https://images.ctfassets.net/yv1glylq11v9/SFVRugQs2A3rBuMJMxNIH/3fc474a2432f17fa12683e23e0043f04/image__2___1_.png">
    </div>

    <p class="my-8">Thanks for your enquiry about the Newcastle City Juniors Summer Cup 2024, set to be hosted at Bullocksteads Sports Hub state-of-the-art facilities in July 2024.</p>

    <h2>Key Event Information</h2>
    <div class="pb-8">
      <ul class="list-disc list-inside">
        <li>Dates: Saturday 13th & Sunday 14th July 2024 - Saturday 20th & Sunday 21st July 2024</li>
        <li>Age groups: U7 - U12 Girls & Mixed (2024/25 season)</li>
        <li>Tournament Type: Cup and Trophy</li>
        <li>Venue: Bullocksteads Sports Hub</li>
        <li>A reminder that the Newcastle City Juniors Summer Cup 2024 is a pre-season event for the 2024/25 season, so all age groups fall in line with next seasons dates.</li>
      </ul>
    </div>

    <h2>Next Steps</h2>
    <p class="mb-4">Places at the tournament can be secured on a first come, first served basis, with interest expected to be high.</p>
    <p class="mb-8">If you would like to secure your place at the relevant age group(s), registration can be completed below. <strong>Please complete all fields.</strong></p>


    <button
      v-if="!formActive"
      class="
        py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
        hover:bg-black hover:text-white
      "
      @click="showSignupForm()"
    >
      Register
    </button>

    <div v-if="formActive">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form class="mt-8 md:max-w-lg" @submit.prevent="handleSubmit(completePayment)">
          <FormSection label="Summer Cup 2023 - Registration">
            <p class="mb-8"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Club Name" v-model="form.clubName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Team Name" v-model="form.teamName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <FormSelect class="mb-4" label="Ability Level" :options="abilityLevelOptions" v-model="form.abilityLevel" required />
            <FormSelect class="mb-4" label="Tournament Entry" :options="ageGroupOptions" :help-text="ageGroupPricingInfo" v-model="form.tournamentEntry" required />
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Name of coach/manager" v-model="form.coachName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Contact number" v-model="form.contactNumber" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required|email" tag="div" mode="eager">
              <FormElement label="Email Address" field-type="email" help-text="This is where your payment receipt will be sent" v-model="form.emailAddress" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" rules="is_true" v-slot="{ errors }" tag="div">
              <div
                class="flex items-center cursor-pointer border p-4 transition-colors"
                :class="{
                  'border-danger': !form.acceptedNextYearsAgeGroupAgreement,
                  'border-success': form.acceptedNextYearsAgeGroupAgreement,
                  'bg-success-bg': form.acceptedNextYearsAgeGroupAgreement,
                }"
                @click="toggleNextYearsAgeGroupAgreement()"
              >
                <input type="checkbox" v-model="form.acceptedNextYearsAgeGroupAgreement">
                <p class="ml-4">Please tick to confirm you are entering the tournament based on NEXT SEASONS AGE GROUPS (2024/2025 season)</p>
              </div>
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" rules="is_true" v-slot="{ errors }" tag="div">
              <div
                class="flex items-center cursor-pointer border p-4 transition-colors"
                :class="{
                  'border-danger': !form.acceptedCoachQualificationAgreement,
                  'border-success': form.acceptedCoachQualificationAgreement,
                  'bg-success-bg': form.acceptedCoachQualificationAgreement,
                }"
                @click="toggleCoachQualificationAgreement()"
              >
                <input type="checkbox" v-model="form.acceptedCoachQualificationAgreement">
                <p class="ml-4">Please tick to confirm the above named coach/manager has all of the following: Minimum FA Level 1 Award in Coaching Football or equivalent, First Aid, Safeguarding & DBS</p>
              </div>
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" rules="is_true" v-slot="{ errors }" tag="div">
              <div
                class="flex items-center cursor-pointer border p-4 transition-colors"
                :class="{
                  'border-danger': !form.acceptedOrganiserDecisionAgreement,
                  'border-success': form.acceptedOrganiserDecisionAgreement,
                  'bg-success-bg': form.acceptedOrganiserDecisionAgreement,
                }"
                @click="toggleOrganiserDecisionAgreement()"
              >
                <input type="checkbox" v-model="form.acceptedOrganiserDecisionAgreement">
                <p class="ml-4">Please tick to confirm you agree to abide by all decisions of the tournament organisers</p>
              </div>
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
            :disabled="invalid || stripe.payment.loading"
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
  name: 'PageNewsAndEventsSummerCup2024',

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
      clubName: null,
      teamName: null,
      abilityLevel: 'mid-low',
      tournamentEntry: 'sat-13-july-u7-u8-girls',
      coachName: null,
      contactNumber: null,
      emailAddress: null,
      acceptedNextYearsAgeGroupAgreement: false,
      acceptedCoachQualificationAgreement: false,
      acceptedOrganiserDecisionAgreement: false,
    },
    ageGroupOptions: [
      { key: 'sat-13-july-u7-u8-girls', value: 'Sat 13th July - U7/U8 Girls', price: 40 },
      { key: 'sat-13-july-u9-girls', value: 'Sat 13th July - U9 Girls', price: 45 },
      { key: 'sat-13-july-u10-girls', value: 'Sat 13th July - U10 Girls', price: 45 },
      { key: 'sat-13-july-u11-girls', value: 'Sat 13th July - U11 Girls', price: 45 },
      { key: 'sun-14-july-u7-mixed-mid-low', value: 'Sun 14th July - U7 Mixed (Mid/Low)', price: 40 },
      { key: 'sun-14-july-u8-mixed-mid-low', value: 'Sun 14th July - U8 Mixed (Mid/Low)', price: 40 },
      { key: 'sun-14-july-u7-mixed-high', value: 'Sun 14th July - U7 Mixed (High)', price: 40 },
      { key: 'sun-14-july-u8-mixed-high', value: 'Sun 14th July - U8 Mixed (High)', price: 40 },
      { key: 'sat-20-july-u9-mixed-mid-low', value: 'Sat 20th July - U9 Mixed (Mid/Low)', price: 45 },
      { key: 'sat-20-july-u12-mixed-mid-low', value: 'Sat 20th July - U12 Mixed (Mid/Low)', price: 50 },
      { key: 'sat-20-july-u9-mixed-high', value: 'Sat 20th July - U9 Mixed (High)', price: 45 },
      { key: 'sat-20-july-u12-mixed-high', value: 'Sat 20th July - U12 Mixed (High)', price: 50 },
      { key: 'sun-21-july-u10-mixed-mid-low', value: 'Sun 21st July - U10 Mixed (Mid/Low)', price: 45 },
      { key: 'sun-21-july-u11-mixed-mid-low', value: 'Sun 21st July - U11 Mixed (Mid/Low)', price: 50 },
      { key: 'sun-21-july-u10-mixed-high', value: 'Sun 21st July - U10 Mixed (High)', price: 45 },
      { key: 'sun-21-july-u11-mixed-high', value: 'Sun 21st July - U11 Mixed (High)', price: 50 },
    ],
    abilityLevelOptions: [
      { key: 'mid-low', value: 'Mid/Low (Division 4 or lower)' },
      { key: 'high', value: 'High (Division 1-3)' },
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
      return this.ageGroupOptions.find(({ key }) => key === this.form.tournamentEntry).price;
    },
    ageGroupPricingInfo() {
      return `This entry requires an upfront payment of £${this.activePrice}`;
    },
  },

  watch: {
    'form.tournamentEntry': function updatePaymentIntent() {
      this.$nextTick(async () => {
        await this.$axios.post('/api/stripe/payment-intents/summer-cup-2024', {
          amount: this.activePrice * 100,
          paymentIntentId: this.stripe.payment.intent,
        });

        this.stripe.elements.root.fetchUpdates();
      });
    },
  },

  methods: {
    toggleNextYearsAgeGroupAgreement() {
      this.form.acceptedNextYearsAgeGroupAgreement = !this.form.acceptedNextYearsAgeGroupAgreement;
    },
    toggleCoachQualificationAgreement() {
      this.form.acceptedCoachQualificationAgreement = !this.form.acceptedCoachQualificationAgreement;
    },
    toggleOrganiserDecisionAgreement() {
      this.form.acceptedOrganiserDecisionAgreement = !this.form.acceptedOrganiserDecisionAgreement;
    },
    async showSignupForm() {
      if (!this.formActive) {
        this.formActive = true;

        try {
          this.stripe.client = window.Stripe(this.$config.stripeApiKey);

          const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/summer-cup-2024', {
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
        await this.$axios.post('/api/stripe/payment-intents/summer-cup-2024', {
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
