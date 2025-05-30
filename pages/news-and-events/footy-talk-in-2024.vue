<template>
  <div>
    <h1>Newcastle City Juniors - Football Talk-In 2024</h1>

    <div class="mx-auto max-w-5xl">
      <img src="https://images.ctfassets.net/yv1glylq11v9/23ynpOXw77ObES0hSJRJZi/55e1bf61ffd2642a35900ebf36545713/image__5___1_.png">
    </div>

    <p class="py-8">Newcastle City Juniors are happy to announce our upcoming Football Talk-In 2024!</p>

    <div class="pb-8">
      <ul class="list-disc list-inside">
        <li>Friday, 15th November 2024</li>
        <li>An evening with Robert Lee</li>
        <li>Pies and Peas included</li>
        <li>Drinks package</li>
        <li>Raffle Prizes</li>
        <li>Doors open from 6pm</li>
      </ul>
    </div>

    <p><strong>This event is in the past and can no longer be booked.</strong></p>

    <!-- <p class="pb-8"><strong>Table bookings are a fixed price of £200 for a table of 10. No partial tables/payments accepted. Full payment is required up-front to secure your booking.</strong></p>

    <p class="pb-8">To book a table, simply tap the button below, complete all fields and make payment!</p>

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
          <FormSection label="Football Talk-In 2024 - Registration">
            <p class="mb-8"><em><strong>IMPORTANT:</strong> All fields are required!</em></p>
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
            <ValidationProvider class="mb-4" v-slot="{ errors }" rules="required" tag="div" mode="eager">
              <FormElement label="Table Name for Booking" v-model="form.bookingName" required />
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
            {{ stripe.payment.loading ? 'Processing payment...' : 'Pay £200' }}
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
  name: 'PageNewsAndEventsFootyTalkIn2024',

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
  //     fullName: null,
  //     houseNameAndNumber: null,
  //     city: null,
  //     contactNumber: null,
  //     emailAddress: null,
  //     bookingName: null,
  //   },
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

  // methods: {
  //   async showSignupForm() {
  //     if (!this.formActive) {
  //       this.formActive = true;

  //       try {
  //         this.stripe.client = window.Stripe(this.$config.stripeApiKey);

  //         const { data: { paymentIntent } } = await this.$axios.post('/api/stripe/payment-intents/footy-talk-in-2024', {
  //           amount: 20000,
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
  //       await this.$axios.post('/api/stripe/payment-intents/footy-talk-in-2024', {
  //         amount: 20000,
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
