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

              <div class="flex flex-col w-full items-left gap-2 md:flex-row md:justify-between">
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
    ageGroups: [
      { key: 'u6', value: 'Under 6s' },
      { key: 'u7', value: 'Under 7s' },
      { key: 'u8', value: 'Under 8s' },
      { key: 'u9', value: 'Under 9s' },
      { key: 'u10', value: 'Under 10s' },
      { key: 'u11', value: 'Under 11s' },
      { key: 'u12', value: 'Under 12s' },
      { key: 'u13', value: 'Under 13s' },
      { key: 'u14', value: 'Under 14s' },
      { key: 'u15', value: 'Under 15s' },
      { key: 'u16', value: 'Under 16s' },
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
            presentationTicketAgeGroup: this.presentationTicketInfo.ageGroup,
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
