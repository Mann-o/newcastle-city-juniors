<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching the presentation tickets schedule!
    </div>

    <div v-else>
      <div class="bg-gold p-4 inline-block">
        <h2 class="border-0">TICKET COUNTS</h2>
        <p><strong>Player:</strong> {{ orders.length }}</p>
        <p><strong>Guest:</strong> {{ guestTicketsCount }}</p>
        <p><strong>Total:</strong> {{ totalTicketsCount }} (£{{ (guestTicketsCount * 5).toFixed(2) }})</p>
      </div>
      <div class="mt-12 mb-6 flex gap-12">
        <div>
          <label class="block pb-2 font-bold text-sm">Age Group:</label>
          <select
            class="border border-black"
            v-model="ageGroup"
          >
            <option
              v-for="ageGroup in ageGroups"
              :key="`filter-${ageGroup.key}`"
              :value="ageGroup.key"
            >
              {{ ageGroup.value }}
            </option>
          </select>
        </div>
        <div>
          <label class="block pb-2 font-bold text-sm">Team:</label>
          <select
            class="border border-black"
            v-model="team"
          >
            <option
              v-for="team in filteredTeams"
              :key="`filter-${team.key}`"
              :value="team.key"
            >
              {{ team.value }}
            </option>
          </select>
        </div>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Child Name</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Age Group</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Team</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Coach</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Guest Tickets</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Guest Names</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Email</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredOrders.length === 0">
            <tr>
              <td class="p-2 text-center text-sm border border-grey-200" colspan="8">No orders have been placed for this team yet!</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="order in filteredOrders">
              <td class="p-2 border border-grey-200 text-sm">{{ order.child_name }}</td>
              <td class="p-2 border border-grey-200 text-sm">{{ order.age_group.charAt(0).toUpperCase() + order.age_group.slice(1).replace('-', ' ') }}</td>
              <td class="p-2 border border-grey-200 text-sm">{{ order.team_name.charAt(0).toUpperCase() + order.team_name.slice(1).replace(/-/g, ' ') }}</td>
              <td class="p-2 border border-grey-200 text-sm">{{ order.coach_name }}</td>
              <td class="p-2 border border-grey-200 text-sm">{{ order.tickets_ordered }}</td>
              <td class="p-2 border border-grey-200 text-sm">{{ order.guest_names }}</td>
              <td class="p-2 border border-grey-200 text-sm">{{ order.email_address }}</td>
              <td class="p-2 border border-grey-200 text-sm">£{{ order.amount_paid.toFixed(2) }}</td>
            </tr>
          </template>
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
    ageGroups: [
      { key: 'under-6s', value: 'Under 6s' },
      { key: 'under-7s', value: 'Under 7s' },
      { key: 'under-8s', value: 'Under 8s' },
      { key: 'under-9s', value: 'Under 9s' },
      { key: 'under-10s', value: 'Under 10s' },
      { key: 'under-11s', value: 'Under 11s' },
      { key: 'under-12s', value: 'Under 12s' },
      { key: 'under-13s', value: 'Under 13s' },
      { key: 'under-14s', value: 'Under 14s' },
      { key: 'under-15s', value: 'Under 15s' },
      { key: 'under-16s', value: 'Under 16s' },
    ],
    teams: [
      { key: 'under-6s', value: 'Under 6s', ageGroup: 'under-6s' },
      { key: 'under-7-boys-saturday', value: 'Boys (Saturday)', ageGroup: 'under-7s' },
      { key: 'under-7-girls-saturday', value: 'Girls (Saturday)', ageGroup: 'under-7s' },
      { key: 'under-7-inter', value: 'Inter', ageGroup: 'under-7s' },
      { key: 'under-7-juve', value: 'Juve', ageGroup: 'under-7s' },
      { key: 'under-7-milan', value: 'Milan', ageGroup: 'under-7s' },
      { key: 'under-8-girls-saturday', value: 'Girls (Saturday)', ageGroup: 'under-8s' },
      { key: 'under-8-inter', value: 'Inter', ageGroup: 'under-8s' },
      { key: 'under-8-juve', value: 'Juve', ageGroup: 'under-8s' },
      { key: 'under-8-milan', value: 'Milan', ageGroup: 'under-8s' },
      { key: 'under-9-atalanta', value: 'Atalanta', ageGroup: 'under-9s' },
      { key: 'under-9-fiorentina-saturday', value: 'Fiorentina (Saturday)', ageGroup: 'under-9s' },
      { key: 'under-9-girls-lionesses', value: 'Girls Lionesses (Saturday)', ageGroup: 'under-9s' },
      { key: 'under-9-inter', value: 'Inter', ageGroup: 'under-9s' },
      { key: 'under-9-juve', value: 'Juve', ageGroup: 'under-9s' },
      { key: 'under-9-juve-saturday', value: 'Juve (Saturday)', ageGroup: 'under-9s' },
      { key: 'under-9-napoli-saturday', value: 'Napoli (Saturday)', ageGroup: 'under-9s' },
      { key: 'under-9-roma', value: 'Roma', ageGroup: 'under-9s' },
      { key: 'under-10-girls-lionesses-saturday', value: 'Girls Lionesses (Saturday)', ageGroup: 'under-10s' },
      { key: 'under-10-inter', value: 'Inter', ageGroup: 'under-10s' },
      { key: 'under-10-jaguars-girls', value: 'Jaguars Girls', ageGroup: 'under-10s' },
      { key: 'under-10-juve', value: 'Juve', ageGroup: 'under-10s' },
      { key: 'under-10-milan', value: 'Milan', ageGroup: 'under-10s' },
      { key: 'under-10-pumas', value: 'Pumas', ageGroup: 'under-10s' },
      { key: 'under-11-milan', value: 'Milan', ageGroup: 'under-11s' },
      { key: 'under-11-sparta', value: 'Sparta', ageGroup: 'under-11s' },
      { key: 'under-12s', value: 'Under 12s', ageGroup: 'under-12s' },
      { key: 'under-12s-saturday', value: 'Under 12s (Saturday)', ageGroup: 'under-12s' },
      { key: 'under-13-juve', value: 'Juve', ageGroup: 'under-13s' },
      { key: 'under-14-juve', value: 'Juve', ageGroup: 'under-14s' },
      { key: 'under-14-saturday', value: 'Saturday Team', ageGroup: 'under-14s' },
      { key: 'under-15-juve', value: 'Juve', ageGroup: 'under-15s' },
      { key: 'under-15-saturday', value: 'Saturday Team', ageGroup: 'under-15s' },
      { key: 'under-16s', value: 'Under 16s', ageGroup: 'under-16s' },
    ],
    ageGroup: null,
    team: null,
  }),

  computed: {
    guestTicketsCount() {
      return this.orders.reduce((acc, order) => acc + order.tickets_ordered, 0);
    },
    totalTicketsCount() {
      return this.orders.length + this.guestTicketsCount;
    },
    filteredTeams() {
      return this.teams.filter(({ ageGroup }) => ageGroup === this.ageGroup);
    },
    filteredOrders() {
      return this.orders.filter(({ team_name }) => team_name === this.team);
    },
  },

  watch: {
    'ageGroup': function updateTeam() {
      this.$nextTick(() => {
        this.team = this.filteredTeams[0].key;
      });
    },
  },

  mounted() {
    this.ageGroup = this.ageGroups[0].key;
  },

  async fetch() {
    const { data: { data: { orders } } } = await this.$axios.get('/api/admin/presentation-tickets-schedule');

    this.orders = orders;
  },
};
</script>
