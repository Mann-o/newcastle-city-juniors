<template>
  <div>
    <h1>NCJ Presentation - 2020-21 Season</h1>
    <p class="pb-8 text-lg font-bold">Tickets for this event are no longer on sale following the recent government announcement. Please see the <NuxtLink to="/news-and-events/presentation-2020-update">update post</NuxtLink> for more details.</p>
    <p class="pb-4 line-through">Newcastle City Juniors are happy to announce that tickets are now available for our Presentation 2020-21 Season, being held on 26th June 2021!</p>
    <p class="pb-4 line-through">Each year we want to recognise all of the special talent we have here at Newcastle City Juniors, and present all of the children with a participation trophy for the season.</p>
    <p class="pb-4 line-through">All attending players <strong>MUST</strong> wear their home stripe (Black/White Top, White Shorts/Socks) on the day. All players will be asked to hand in their Black/White Top at the end of the presentation by their team coaches so please bring a change of top for your child. White Shorts/Socks can be kept.</p>
    <p class="pb-4 line-through">Hot/cold food, refreshments and alcoholic beverages will be available on the day.</p>
    <p class="pb-4 line-through">Tickets are £3.00 per adult or £1.00 per additional child (player tickets are free). Tickets can only be purchased here on this page. Simply complete the form below and checkout. An email will be sent to you shortly after checkout confirming your order, and you must bring this email with you on the day as it acts as your ticket to the event.</p>
    <p class="line-through">If you have any questions about our Presentation please contact your child's team coach.</p>

    <h2 class="mt-8">Timetable</h2>
    <p class="font-bold">Football Development</p>
    <ul class="list-disc list-inside pb-4">
      <li>Doors Open: 10:00am</li>
      <li>Presentation: 10:30am - 11:30am</li>
    </ul>
    <p class="font-bold">Mini Soccer (Under 7s - Under 10s)</p>
    <ul class="list-disc list-inside pb-4">
      <li>Doors Open: 12:30pm</li>
      <li>Presentation: 1:00pm - 3:30pm</li>
    </ul>
    <p class="font-bold">Juniors (Under 11s - Under 16s)</p>
    <ul class="list-disc list-inside">
      <li>Doors Open: 5:00pm</li>
      <li>Presentation: 5:30pm - 8:00pm</li>
    </ul>

    <!-- <div class="mt-8 md:max-w-lg">
      <FormSection label="Order Tickets">
        <FormElement
          label="Email Address"
          field-type="email"
          help-text="This is where your ticket(s) will be sent"
          v-model="emailAddress"
        />
        <FormSelect
          label="No. of Adult tickets (£3.00 per ticket)"
          :options="adultTicketsOptions"
          v-model="adultTicketsCount"
        />
        <FormElement
          v-for="adultTicket in adultTickets"
          :key="`adult-${adultTicket}`"
          :label="`Adult ${adultTicket} Name`"
          v-model="adultNames[adultTicket - 1]"
        />
        <FormSelect
          label="No. of additional child tickets (£1.00 per ticket)"
          :options="childTicketsOptions"
          v-model="childTicketsCount"
        />
        <FormElement
          v-for="childTicket in childTickets"
          :key="`child-${childTicket}`"
          :label="`Child ${childTicket} Name`"
          v-model="childNames[childTicket - 1]"
        />
        <FormSelect
          label="No. of Player tickets (FREE)"
          :options="playerTicketsOptions"
          v-model="playerTicketsCount"
        />
        <FormElement
          v-for="playerTicket in playerTickets"
          :key="`player-${playerTicket}`"
          :label="`Player ${playerTicket} Name`"
          v-model="playerNames[playerTicket - 1]"
        />
        <FormTotalCost
          label="Total Cost"
          :total="totalCost"
        />
        <button
          :disabled="!canCheckout || checkingOut"
          class="
            mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
            hover:bg-black hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
          "
          @click="checkout()"
        >
          {{ checkoutButtonLabel }}
        </button>
      </FormSection>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsPresentation2020',

  // components: {
  //   FormSection: () => import('@/components/elements/forms/FormSection.vue'),
  //   FormElement: () => import('@/components/elements/forms/FormElement.vue'),
  //   FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
  //   FormTotalCost: () => import('@/components/elements/forms/FormTotalCost.vue'),
  // },

  scrollToTop: true,

  // data: () => ({
  //   stripe: null,
  //   adultTicketsCount: '1',
  //   childTicketsCount: '0',
  //   playerTicketsCount: '1',
  //   adultNames: ['', '', '', '', ''],
  //   childNames: ['', '', '', '', ''],
  //   playerNames: ['', '', ''],
  //   checkingOut: false,
  //   emailAddress: '',
  // }),

  // head () {
  //   return {
  //     script: [
  //       {
  //         hid: 'stripe',
  //         src: 'https://js.stripe.com/v3/',
  //         defer: true,
  //         callback: () => this.stripeLoadedCallback(),
  //       },
  //     ],
  //   }
  // },

  // computed: {
  //   /** @returns {boolean} */
  //   showStripeForm () {
  //     return this.stripe != null
  //   },
  //   /** @returns {string} */
  //   stripeCheckoutButtonLabel () {
  //     return this.checkingOut
  //       ? 'Please wait...'
  //       : 'Pay £2.50 now'
  //   },
  //   /** @returns {array} */
  //   adultTickets () {
  //     return [...Array(parseInt(this.adultTicketsCount, 10)).keys()].map(x => x + 1)
  //   },
  //   /** @returns {array} */
  //   childTickets () {
  //     return [...Array(parseInt(this.childTicketsCount, 10)).keys()].map(x => x + 1)
  //   },
  //   /** @returns {array} */
  //   playerTickets () {
  //     return [...Array(parseInt(this.playerTicketsCount, 10)).keys()].map(x => x + 1)
  //   },
  //   /** @returns {array} */
  //   adultTicketsOptions () {
  //     return [...Array(5).keys()].map(x => ({
  //       key: (x + 1).toString(),
  //       value: (x + 1).toString(),
  //     }))
  //   },
  //   /** @returns {array} */
  //   childTicketsOptions () {
  //     return [...Array(6).keys()].map(x => ({
  //       key: x.toString(),
  //       value: x.toString(),
  //     }))
  //   },
  //   /** @returns {array} */
  //   playerTicketsOptions () {
  //     return [...Array(4).keys()].map(x => ({
  //       key: x.toString(),
  //       value: x.toString(),
  //     }))
  //   },
  //   /** @returns {number} */
  //   totalCost () {
  //     return (
  //       (parseInt(this.adultTicketsCount, 10) * 3)
  //       + (parseInt(this.childTicketsCount, 10) * 1)
  //     ).toFixed(2)
  //   },
  //   /** @returns {boolean} */
  //   canCheckout() {
  //     return this.stripe != null || this.checkingOut
  //   },
  //   /** @returns {string} */
  //   checkoutButtonLabel() {
  //     return this.checkingOut
  //       ? 'Please wait...'
  //       : `Pay Now - £${this.totalCost}`
  //   },
  // },

  // methods: {
  //   stripeLoadedCallback () {
  //     this.stripe = window.Stripe(this.$config.stripeApiKey)
  //   },
  //   async checkout () {
  //     try {
  //       if (this.canCheckout) {
  //         this.error = null

  //         if (this.emailAddress == null || this.emailAddress == '') {
  //           this.error = 'Invalid email address'
  //         }

  //         this.$nuxt.$loading.start()

  //         this.checkingOut = true

  //         const { data: { id: checkoutSessionId } } = await this.$axios.post('/api/stripe/create-checkout', {
  //           customer_email: this.emailAddress,
  //           line_items: [
  //             ...(this.adultTicketsCount > 0 ? [{
  //               price: 'price_1IxgxbJgy48auTmoWWoEfpmQ',
  //               quantity: this.adultTicketsCount,
  //             }] : []),
  //             ...(this.childTicketsCount > 0 ? [{
  //               price: 'price_1IxgxsJgy48auTmohIvUZjzR',
  //               quantity: this.childTicketsCount,
  //             }] : []),
  //             ...(this.playerTicketsCount > 0 ? [{
  //               price: 'price_1Ixgy6Jgy48auTmoM7iox1O3',
  //               quantity: this.playerTicketsCount,
  //             }] : []),
  //           ],
  //           metadata: {
  //             event: 'presentation-2021',
  //             ...(this.adultTicketsCount > 0 && this.adultNames.filter(x => x !== '').reduce((acc, curr, i) => ({
  //               ...acc,
  //               [`adult_name_${i + 1}`]: curr,
  //             }), {})),
  //             ...(this.childTicketsCount > 0 && this.childNames.filter(x => x !== '').reduce((acc, curr, i) => ({
  //               ...acc,
  //               [`child_name_${i + 1}`]: curr,
  //             }), {})),
  //             ...(this.playerTicketsCount > 0 && this.playerNames.filter(x => x !== '').reduce((acc, curr, i) => ({
  //               ...acc,
  //               [`player_name_${i + 1}`]: curr,
  //             }), {})),
  //           },
  //           success_url: 'https://newcastlecityjuniors.co.uk/payment-success',
  //           cancel_url: 'https://newcastlecityjuniors.co.uk/news-and-events/presentation-2020',
  //         })

  //         this.stripe.redirectToCheckout({ sessionId: checkoutSessionId })
  //       }
  //     } catch (error) {
  //       this.error = error.message
  //     } finally {
  //       this.$nuxt.$loading.finish()
  //       this.checkingOut = false
  //     }
  //   },
  // },
}
</script>
