<template>
  <div>
    <h1>Newcastle City Juniors Summer Cup 2025</h1>

    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching page configuration!
    </div>

    <div v-else-if="noPlacesAvailable">
      <p class="my-4"><strong>Unfortunately, all places for the Newcastle City Juniors Summer Cup 2025 have now been filled.</strong></p>
      <p>If you would like to be added to the waiting list, please email <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a>.</p>
    </div>

    <div v-else>
      <div class="mx-auto max-w-5xl">
        <img src="https://images.ctfassets.net/yv1glylq11v9/2SzVYqYfkRGqxhiVuqNGgq/0cd7416c0318ae0df34d6bd9a3cfbdee/image__1___1_.png">
      </div>

      <p class="p-6 bg-info text-white inline-flex gap-6 items-center mt-12">
        <span class="text-3xl">
          <FontAwesomeIcon :icon="['fad', 'circle-info']" />
        </span>
        <span>LIMITED TIME OFFER - 25% OFF!</span>
      </p>

      <p class="my-8">Thanks for your enquiry about the Newcastle City Juniors Summer Cup 2025, set to be hosted at Bullocksteads Sports Hub state-of-the-art facilities in July 2025.</p>

      <h2>Key Event Information</h2>
      <div class="pb-8">
        <ul class="list-disc list-inside">
          <li>Dates: Saturday 5th July 2025 (Girls) & Sunday 6th July 2025 (Mixed)</li>
          <li>Age groups (in 2025/26 season): U7-U12 (Girls) & U7-U10 (Mixed)</li>
          <li>Tournament Type: Cup and Trophy</li>
          <li>Venue: Bullocksteads Sports Hub</li>
          <li>A reminder that the Newcastle City Juniors Summer Cup 2025 is a pre-season event for the 2025/26 season, so all age groups fall in line with next seasons dates.</li>
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
        Register for NCJ Summer Cup 2025
      </button>

      <div v-if="formActive">
        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form class="mt-8 md:max-w-lg" @submit.prevent="handleSubmit(completePayment)">
            <FormSection label="Summer Cup 2025 - Registration">
              <p class="mb-4"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
              <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
                <FormElement label="Club Name" v-model="form.clubName" required />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
                <FormElement label="Team Name" v-model="form.teamName" required />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <FormSelect class="mb-4" label="Ability Level" :options="abilityLevelOptions" v-model="form.abilityLevel" required />
              <div class="mb-4 p-4 bg-grey-200">If the tournament you wish to enter is not available in the dropdown below, unfortunately this means we no longer have any spaces available.</div>
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
                  <p class="ml-4">Please tick to confirm you are entering the tournament based on NEXT SEASONS AGE GROUPS (2025/2026 season)</p>
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
            <div v-if="showSoldOutError" class="mb-4">
              <p class="text-danger">Unfortunately the session you were trying to book is now sold out. Please reach out to <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> with the details provided above and we may be able to put on on a waiting list.</p>
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
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'PageNewsAndEventsSummerCup2025',

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
      tournamentEntry: null,
      coachName: null,
      contactNumber: null,
      emailAddress: null,
      acceptedNextYearsAgeGroupAgreement: false,
      acceptedCoachQualificationAgreement: false,
      acceptedOrganiserDecisionAgreement: false,
    },
    ageGroupOptions: [
      { key: 'sat-5-july-u7-u8-girls', value: 'Sat 5th July - U7/U8 Girls', price: 33.75 },
      { key: 'sat-5-july-u9-girls', value: 'Sat 5th July - U9 Girls', price: 37.50 },
      { key: 'sat-5-july-u10-girls', value: 'Sat 5th July - U10 Girls', price: 37.50 },
      { key: 'sat-5-july-u11-girls', value: 'Sat 5th July - U11 Girls', price: 37.50 },
      { key: 'sat-5-july-u12-girls', value: 'Sat 5th July - U12 Girls', price: 41.25 },
      { key: 'sun-6-july-u7-mixed-mid-low', value: 'Sun 6th July - U7 Mixed (Mid/Low)', price: 33.75 },
      { key: 'sun-6-july-u8-mixed-mid-low', value: 'Sun 6th July - U8 Mixed (Mid/Low)', price: 33.75 },
      { key: 'sun-6-july-u9-mixed-mid-low', value: 'Sun 6th July - U9 Mixed (Mid/Low)', price: 37.50 },
      { key: 'sun-6-july-u10-mixed-mid-low', value: 'Sun 6th July - U10 Mixed (Mid/Low)', price: 37.50 },
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
    placesRemaining: {},
    disableSubmit: true,
    showSoldOutError: false,
  }),

  async fetch() {
    const { data: { data: { placesRemaining } } } = await this.$axios.get('/api/stripe/summer-cup-2025-places')

    this.placesRemaining = placesRemaining

    this.ageGroupOptions = this.ageGroupOptions.filter(({ key }) => placesRemaining[key] > 0)
  },

  computed: {
    activePrice() {
      return this.ageGroupOptions?.find(({ key }) => key === this.form.tournamentEntry)?.price ?? 55;
    },
    ageGroupPricingInfo() {
      return `This entry requires an upfront payment of £${this.activePrice.toFixed(2)}`;
    },
    noPlacesAvailable() {
      return this.ageGroupOptions.length === 0;
    },
  },

  mounted() {
    if (this.ageGroupOptions.length > 0) {
      this.form.tournamentEntry = this.ageGroupOptions[0].key
    }
  },

  watch: {
    'form.tournamentEntry': function updatePaymentIntent() {
      this.$nextTick(async () => {
        this.disableSubmit = (this.placesRemaining[this.form.tournamentEntry] === 0)

        const interval = setInterval(async () => {
          if (this?.stripe?.elements?.root) {
            if (this.placesRemaining[this.form.tournamentEntry] !== 0) {
              await this.$axios.post('/api/stripe/payment-intents/summer-cup-2025', {
                amount: this.activePrice * 100,
                paymentIntentId: this.stripe.payment.intent,
              });

              this.stripe.elements.root.fetchUpdates();
            }

            clearInterval(interval);
          }
        }, 100)
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

          const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/summer-cup-2025', {
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
      this.showSoldOutError = false;
      this.stripe.payment.error = null;
      this.stripe.payment.loading = true;

      try {
        const { data: { data: { placesRemaining } } } = await this.$axios.get('/api/stripe/summer-cup-2025-places')

        if (placesRemaining[this.form.tournamentEntry] === 0) {
          this.showSoldOutError = true;
          this.stripe.payment.loading = false;
          return;
        }

        await this.$axios.post('/api/stripe/payment-intents/summer-cup-2025', {
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
