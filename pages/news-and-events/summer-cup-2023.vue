<template>
  <div>
    <h1>Newcastle City Juniors Summer Cup 2023</h1>

    <!-- <div class="mx-auto max-w-5xl">
      <img src="https://images.ctfassets.net/yv1glylq11v9/6n31tCBhUfUgPEdkrSnGEN/6d8d5a888eedc3a543c5a57e7355f344/image__1_.png">
    </div> -->

    <p class="py-8">
      <strong>Unfortunately, due to lack of interest we have made the decision to cancel the NCJ Summer Cup 2023.</strong>
    </p>

    <p>We apologise for any inconvenience. Refunds are in the process of being issued where appropriate and should be with registered teams shortly.</p>

    <!-- <div class="pb-8">
      <ul class="list-disc list-inside">
        <li>Mini Soccer Teams - £50</li>
        <li>Junior 9-a-side Teams - £60</li>
        <li>August at Bullocksteads Sports Ground, Kingston Park, Newcastle</li>
        <li>State of the art 3G facilities</li>
        <li>Cup and Trophy event</li>
      </ul>
    </div>

    <p class="pb-8">To register, simply tap the button below, complete all fields and make payment.</p>

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
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required|email" tag="div" mode="eager">
              <FormElement label="Email Address" field-type="email" help-text="This is where your payment receipt will be sent" v-model="form.emailAddress" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Club Name" v-model="form.clubName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Team Name" v-model="form.teamName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <FormSelect class="mb-4" label="Age group (2023/24 season)" :options="ageGroupOptions" :help-text="ageGroupPricingInfo" v-model="form.ageGroup" required />
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Name of coach/manager" v-model="form.coachName" required />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Contact number" v-model="form.contactNumber" required />
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
                <p class="ml-4">Please tick to confirm you agree to abide by all decisions of the tournament organisers.</p>
              </div>
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
            :disabled="invalid || stripe.payment.loading"
          >
            {{ stripe.payment.loading ? 'Processing payment...' : `Pay £${ activePrice }` }}
          </button>
          <div class="mt-4" v-if="stripe.payment.error">
            <span id="payment-message" class="text-danger">{{ stripe.payment.error }}</span>
          </div>
        </form>
      </ValidationObserver>
    </div> -->
  </div>
</template>

<script>
// import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'PageNewsAndEventsSummerCup2023',

  scrollToTop: true,

  // components: {
  //   Loader: () => import('@/components/layout/Loader.vue'),
  //   FormSection: () => import('@/components/elements/forms/FormSection.vue'),
  //   FormElement: () => import('@/components/elements/forms/FormElement.vue'),
  //   FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
  //   FormTotalCost: () => import('@/components/elements/forms/FormTotalCost.vue'),
  //   ValidationObserver,
  //   ValidationProvider,
  // },

  // head () {
  //   return {
  //     script: [
  //       {
  //         hid: 'stripe',
  //         src: 'https://js.stripe.com/v3/',
  //         defer: true,
  //       },
  //     ],
  //   }
  // },

  // data: () => ({
  //   formActive: false,
  //   form: {
  //     emailAddress: null,
  //     clubName: null,
  //     teamName: null,
  //     ageGroup: 'under-7-boys',
  //     coachName: null,
  //     contactNumber: null,
  //     acceptedCoachQualificationAgreement: false,
  //     acceptedOrganiserDecisionAgreement: false,
  //   },
  //   ageGroupOptions: [
  //     { key: 'under-7-boys', value: 'Under 7 Boys - Sat 26th Aug', age: 6 },
  //     // { key: 'under-7-girls', value: 'Under 7 Girls - Sat 12th Aug', age: 6 },
  //     { key: 'under-8-boys', value: 'Under 8 Boys - Sun 27th Aug', age: 7 },
  //     // { key: 'under-8-girls', value: 'Under 8 Girls - Sat 12th Aug', age: 7 },
  //     { key: 'under-9-boys', value: 'Under 9 Boys - Sat 26th Aug', age: 8 },
  //     // { key: 'under-9-girls', value: 'Under 9 Girls - Sat 12th Aug', age: 8 },
  //     { key: 'under-10-boys', value: 'Under 10 Boys - Sun 27th Aug', age: 9 },
  //     // { key: 'under-10-girls', value: 'Under 10 Girls - Sat 12th Aug', age: 9 },
  //     // { key: 'under-11', value: 'Under 11 - Sun 13th Aug', age: 10 },
  //     // { key: 'under-12', value: 'Under 12 - Sun 13th Aug', age: 11 },
  //   ],
  //   stripe: {
  //     client: null,
  //     elements: {
  //       root: null,
  //       payment: null,
  //       showBlockError: false,
  //     },
  //     payment: {
  //       intent: null,
  //       error: null,
  //       loading: false,
  //     },
  //   },
  // }),

  // computed: {
  //   activePrice() {
  //     return this.ageGroupOptions.find(({ key }) => key === this.form.ageGroup).age <= 9 ? 50 : 60;
  //   },
  //   ageGroupPricingInfo() {
  //     return `This age group requires an upfront payment of £${this.activePrice}`;
  //   },
  // },

  // watch: {
  //   'form.ageGroup': function updatePaymentIntent() {
  //     this.$nextTick(async () => {
  //       await this.$axios.post('/api/stripe/payment-intents/summer-camp-2023', {
  //         amount: this.activePrice * 100,
  //         paymentIntentId: this.stripe.payment.intent,
  //       });

  //       this.stripe.elements.root.fetchUpdates();
  //     });
  //   },
  // },

  // methods: {
  //   toggleCoachQualificationAgreement() {
  //     this.form.acceptedCoachQualificationAgreement = !this.form.acceptedCoachQualificationAgreement;
  //   },
  //   toggleOrganiserDecisionAgreement() {
  //     this.form.acceptedOrganiserDecisionAgreement = !this.form.acceptedOrganiserDecisionAgreement;
  //   },
  //   async showSignupForm() {
  //     if (!this.formActive) {
  //       this.formActive = true;

  //       try {
  //         this.stripe.client = window.Stripe(this.$config.stripeApiKey);

  //         const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/summer-camp-2023', {
  //           amount: this.activePrice * 100,
  //           form: this.form,
  //           paymentIntentId: this.stripe.payment.intent,
  //         });

  //         this.stripe.payment.intent = paymentIntent.id;

  //         this.stripe.elements.root = this.stripe.client.elements({
  //           clientSecret: paymentIntent.client_secret,
  //         });

  //         this.stripe.elements.payment = this.stripe.elements.root.create('payment', { layout: 'tabs' });
  //         this.stripe.elements.payment.mount('#payment-element');
  //       } catch {
  //         this.stripe.elements.showBlockError = true;
  //       }
  //     }
  //   },
  //   async completePayment() {
  //     this.stripe.payment.error = null;
  //     this.stripe.payment.loading = true;

  //     try {
  //       await this.$axios.post('/api/stripe/payment-intents/summer-camp-2023', {
  //         amount: this.activePrice * 100,
  //         form: this.form,
  //         paymentIntentId: this.stripe.payment.intent,
  //       });

  //       await this.stripe.elements.root.fetchUpdates();

  //       const { error } = await this.stripe.client.confirmPayment({
  //         elements: this.stripe.elements.root,
  //         confirmParams: {
  //           receipt_email: this.form.emailAddress,
  //           return_url: `${window.location.origin}/payment-success`,
  //         },
  //       });

  //       if (error.type === 'card_error' || error.type === 'validation_error') {
  //         this.stripe.payment.error = error.message;
  //       } else {
  //         this.stripe.payment.error = 'An unexpected error occurred, please try again';
  //       }

  //       this.stripe.payment.loading = false;
  //     } catch (error) {
  //       this.stripe.payment.loading = false;
  //       console.log(error);
  //     }
  //   },
  // },
};
</script>
