<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching the presentation tickets schedule!
    </div>

    <div v-else>
      <table>
        <thead>
          <tr>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Date/time</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Customer Email</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">No. of Tickets</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Player Name</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Team</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments">
            <td class="p-2 border border-grey-200 text-sm">{{ new Date(payment.created * 1000).toLocaleString('en-GB', { timeZone: 'UTC' }) }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ payment.customer }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ payment.visitor_tickets_count }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ payment.player }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ payment.team }}</td>
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
    payments: [],
  }),

  async fetch() {
    const { data: { data: payments } } = await this.$axios.get('/api/admin/presentation-tickets-schedule');

    this.payments = payments;
  },
};
</script>
