<template>
  <div>
    <h1>Order Complete</h1>

    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      <p class="pb-8">An error occurred whilst fetching order: {{ $route.query.orderId }}.</p>
      <p>Your order was likely processed successfully, however if you do have any problems please <NuxtLink to="/contact-us">contact us</NuxtLink>.</p>
    </div>

    <div v-else>
      <p class="pb-8">Thank you for your order. Your payment has been processed and your order is now complete. Your order number is: <strong>{{ $route.query.orderId }}</strong></p>
      <p class="pb-8">If you have purchased any digital products (e.g. tickets to an event) these will be sent to you by email shortly.</p>
      <p class="pb-8">A summary of your order is below:</p>

      <table v-if="order">
        <thead>
          <tr>
            <th class="p-4 pl-0 text-left border-b border-black">Product</th>
            <th class="p-4 text-center border-b border-black">Quantity</th>
            <th class="p-4 text-left border-b border-black">Cost</th>
            <th class="p-4 pr-0 text-right border-b border-black">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lineItem in order.line_items.data">
            <td class="p-4 pl-0">{{ lineItem.description }}</td>
            <td class="p-4 text-center">{{ lineItem.quantity }}</td>
            <td class="p-4">{{ (lineItem.price.unit_amount / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) }}</td>
            <td class="p-4 pr-0 text-right">{{ (lineItem.amount_subtotal / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) }}</td>
          </tr>
          <tr>
            <td
              class="text-right border-t border-black py-4"
              colspan="4"
            >
              <strong>Total: {{ (order.amount_total / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageThankYou',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  validate({ query }) {
    return query.orderId != null
  },

  scrollToTop: true,

  head: () => ({
    title: 'Order Complete',
  }),

  async fetch () {
    const { data: order } = await this.$axios.post('/api/stripe/get-order', {
      orderId: this.$route.query.orderId,
    })

    this.order = order
  },

  data: () => ({
    order: null,
  }),
}
</script>
