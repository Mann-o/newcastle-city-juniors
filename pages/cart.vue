<template>
  <div>
    <h1>Cart</h1>

    <CartEmpty v-if="cartIsEmpty" />

    <template v-else>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <p class="mb-6 md:mb-12">
          Please review your cart to continue to checkout:
        </p>

        <div class="flex-grow flex flex-col gap-4">
          <CartItem
            v-for="item in cart"
            :key="item.id"
            :item="item"
          />
        </div>

        <CartSubtotal />

        <div
          v-if="cartContainsPresentationTickets"
          class="flex w-full justify-end mb-8 mt-6 md:mt-12"
        >
          <div class="max-w-2xl bg-grey-200 p-4">
            <h2>Presentation Ticket Info</h2>

            <p class="mb-4">
              It appears you are purchasing {{ cartItemDeepCount > 1 ? 'tickets' : 'a ticket' }} to an NCJ presentation event. Please provide the following information:
            </p>

              <div class="flex flex-col w-full items-left gap-2 mb-4 md:flex-row md:justify-between">
                <label class="font-bold">
                  Player Name
                </label>

                <ValidationProvider
                  v-slot="{ errors }"
                  class="w-full md:w-auto md:flex-[0_0_75%]"
                  rules="required"
                  vid="playerName"
                  tag="div"
                >
                  <input
                    class="border border-black w-full"
                    type="text"
                    name="playerName"
                    :value="presentationTicketInfo.playerName"
                    @input="updatePresentationTicketInfo"
                  >
                  <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <!-- <div class="flex flex-col w-full items-left gap-2 md:flex-row md:justify-between">
                <label class="font-bold">
                  Age Group
                </label>

                <ValidationProvider
                  v-slot="{ errors }"
                  class="w-full md:w-auto md:flex-[0_0_75%]"
                  rules="required"
                  vid="ageGroup"
                  tag="div"
                  immediate
                >
                  <select
                    class="border border-black w-full"
                    name="ageGroup"
                    :value="presentationTicketInfo.ageGroup"
                    @input="updatePresentationTicketInfo"
                  >
                    <option
                      v-for="{ key, value } in ageGroups"
                      :key="`age-group-${key}`"
                      :value="key"
                    >
                      {{ value }}
                    </option>
                  </select>
                  <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                </ValidationProvider>
              </div> -->

              <div class="flex flex-col w-full items-left gap-2 md:flex-row md:justify-between">
                <label class="font-bold">
                  Team
                </label>

                <ValidationProvider
                  v-slot="{ errors }"
                  class="w-full md:w-auto md:flex-[0_0_75%]"
                  rules="required"
                  vid="team"
                  tag="div"
                  immediate
                >
                  <select
                    class="border border-black w-full"
                    name="team"
                    :value="presentationTicketInfo.team"
                    @input="updatePresentationTicketInfo"
                  >
                    <option
                      v-for="{ key, value } in teams"
                      :key="`team-${key}`"
                      :value="key"
                    >
                      {{ value }}
                    </option>
                  </select>
                  <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

          </div>
        </div>

        <div class="md:flex md:w-full md:justify-end">
          <CartCheckout
            :disabled="invalid"
            :loading="checkingOut"
            @checkout="handleSubmit(checkout)"
          />
        </div>`
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PageCart',

  components: {
    CartEmpty: () => import('@/components/layout/cart/CartEmpty.vue'),
    CartItem: () => import('@/components/layout/cart/CartItem.vue'),
    CartSubtotal: () => import('@/components/layout/cart/CartSubtotal.vue'),
    CartCheckout: () => import('@/components/layout/cart/CartCheckout.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    // ageGroups: [
    //   { key: 'u6', value: 'Under 6s' },
    //   { key: 'u7', value: 'Under 7s' },
    //   { key: 'u8', value: 'Under 8s' },
    //   { key: 'u9', value: 'Under 9s' },
    //   { key: 'u10', value: 'Under 10s' },
    //   { key: 'u11', value: 'Under 11s' },
    //   { key: 'u12', value: 'Under 12s' },
    //   { key: 'u13', value: 'Under 13s' },
    //   { key: 'u14', value: 'Under 14s' },
    //   { key: 'u15', value: 'Under 15s' },
    //   { key: 'u16', value: 'Under 16s' },
    // ],
    teams: [
      { key: 'development', value: 'Development (3-7yrs)' },
      { key: 'u7-inter', value: 'U7 Inter' },
      { key: 'u7-juve', value: 'U7 Juve' },
      { key: 'u7-milan', value: 'U7 Milan' },
      { key: 'u8-saturday', value: 'U8 (Saturday)' },
      { key: 'u8-atlanta', value: 'U8 Atlanta' },
      { key: 'u8-fiorentina-saturday', value: 'U8 Fiorentina (Saturday)' },
      { key: 'u8-girls-saturday', value: 'U8 Girls (Saturday)' },
      { key: 'u8-inter', value: 'U8 Inter' },
      { key: 'u8-juve', value: 'U8 Juve' },
      { key: 'u8-lazio', value: 'U8 Lazio' },
      { key: 'u8-napoli-saturday', value: 'U8 Napoli (Saturday)' },
      { key: 'u8-roma', value: 'U8 Roma' },
      { key: 'u8-torino', value: 'U8 Torino' },
      { key: 'u9-girls-saturday', value: 'U9 Girls (Saturday)' },
      { key: 'u9-inter', value: 'U9 Inter' },
      { key: 'u9-juve', value: 'U9 Juve' },
      { key: 'u9-milan', value: 'U9 Milan' },
      { key: 'u10-inter', value: 'U10 Inter' },
      { key: 'u10-juve', value: 'U10 Juve' },
      { key: 'u10-juve-saturday', value: 'U10 Juve (Saturday)' },
      { key: 'u10-milan', value: 'U10 Milan' },
      { key: 'u10-milan-saturday', value: 'U10 Milan (Saturday)' },
      { key: 'u10-napoli-saturday', value: 'U10 Napoli (Saturday)' },
      { key: 'u10-sparta', value: 'U10 Sparta' },
      { key: 'u10-sparta-saturday', value: 'U10 Sparta (Saturday)' },
      { key: 'u12-juve', value: 'U12 Juve' },
      { key: 'u12-milan', value: 'U12 Milan' },
      { key: 'u12-roma', value: 'U12 Roma' },
      { key: 'u13-saturday', value: 'U13 (Saturday)' },
      { key: 'u13-juve', value: 'U13 Juve' },
      { key: 'u13-milan', value: 'U13 Milan' },
      { key: 'u14-saturday', value: 'U14 (Saturday)' },
      { key: 'u14-juve', value: 'U14 Juve' },
      { key: 'u14-milan', value: 'U14 Milan' },
      { key: 'u15', value: 'U15' },
      { key: 'u16', value: 'U16' },
    ],
    checkingOut: false,
  }),

  computed: {
    ...mapState('cart', [
      'cart',
      'presentationTicketInfo',
    ]),
    ...mapGetters('cart', [
      'cartIsEmpty',
      'cartContainsPresentationTickets',
      'cartItemCount',
      'cartItemDeepCount',
    ]),
  },

  methods: {
    ...mapActions('cart', [
      'updatePresentationTicketInfo',
    ]),
    goToShop() {
      this.$router.push('/shop')
    },
    async checkout() {
      this.checkingOut = true

      const { data: { checkoutUrl } } = await this.$axios.post('/api/stripe/create-checkout', {
        ...(this.$auth.loggedIn && {
          customer: this.$auth.user[0].stripe_customer_id,
        }),
        line_items: this.cart.reduce((lineItems, lineItem) => {
          lineItems.push({
            price: lineItem.id,
            quantity: lineItem.quantity,
            adjustable_quantity: {
              enabled: true,
              ...((lineItem.product.metadata?.limit ?? false) && {
                maximum: lineItem.product.metadata.limit,
              }),
            },
          })

          return lineItems
        }, []),
        ...(this.cartContainsPresentationTickets && {
          metadata: {
            presentationTicketPlayerName: this.presentationTicketInfo.playerName,
            // presentationTicketAgeGroup: this.presentationTicketInfo.ageGroup,
            presentationTicketTeam: this.presentationTicketInfo.team,
          },
          payment_intent_data: {
            metadata: {
              presentationTicketPlayerName: this.presentationTicketInfo.playerName,
              // presentationTicketAgeGroup: this.presentationTicketInfo.ageGroup,
              presentationTicketTeam: this.presentationTicketInfo.team,
            },
          },
        }),
        success_url: `http${
            (process.env.NODE_ENV === 'development')
              ? '://localhost:3000'
              : 's://newcastlecityjuniors.co.uk'
          }/thank-you`,
        cancel_url: `http${
            (process.env.NODE_ENV === 'development')
              ? '://localhost:3000'
              : 's://newcastlecityjuniors.co.uk'
          }/cart`,
      })

      window.location.href = checkoutUrl
    },
  },
}
</script>
