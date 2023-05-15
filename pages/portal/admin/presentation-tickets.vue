<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching the presentation tickets schedule!
    </div>

    <div v-else>
      <h2>Totals</h2>
      <p><strong>Player:</strong> {{ totals.player }}<br /><strong>Visitor:</strong> {{ totals.visitor }}</p>
      <table class="mt-12">
        <thead>
          <tr>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Date/time</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Customer Email</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Player Tickets</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Visitor Tickets</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Player Name</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Team</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders">
            <td class="p-2 border border-grey-200 text-sm">
              {{ new Date(order.created * 1000).toLocaleString('en-GB', { timeZone: 'UTC' }) }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ order.customer }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ order.tickets.player }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ order.tickets.visitor }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ order.player }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ order.team }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalAdminPresentationTickets',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    orders: [],
    totals: {
      player: 0,
      visitor: 0,
    },
  }),

  async fetch() {
    const { data: { data } } = await this.$axios.get('/api/admin/presentation-tickets-schedule');

    this.orders = data.orders;
    this.totals = data.totals;
  },
};
</script>
