<template>
  <div>
    <FormSelect
      label="Age Group"
      :options="ageGroups"
      v-model="filters.ageGroup"
    />
    <FormSelect
      label="Sex"
      :options="sexes"
      v-model="filters.sex"
    />
    <FormSelect
      label="Team"
      :options="filteredTeams"
      v-model="filters.team"
    />

    <!-- <button class="hidden" @click="setDefaultPaymentMethod()">Set Default Payment Method</button> -->

    <div v-if="loading">
      <Loader class="mt-10"/>
    </div>

    <div v-else-if="players.length === 0" class="mt-10">
      NO RESULTS
    </div>

    <div v-else>
      <h2 class="mt-10">Upfront Payment Players</h2>
      <table class="w-full">
        <thead>
          <tr>
            <th class="bg-black text-gold font-normal text-sm p-2 text-left">Player</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-center">Date Registered</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-center">Paid?</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="upfrontPlayers.length === 0">
            <td class="p-2 border border-grey-200 text-sm text-center" colspan="4">
              No upfront players for this team
            </td>
          </tr>
          <template v-else>
            <tr
              v-for="player in upfrontPlayers"
              :key="`player-${player.id}`"
            >
              <td class="p-2 border border-grey-200 text-sm text-left">
                <a
                  :href="`https://dashboard.stripe.com/customers/${player.stripeCustomerId}`"
                  title="View on Stripe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ player.firstName }}
                  {{ player.middleNames ? ` ${player.middleNames}` : '' }}
                  {{ player.lastName ? ` ${player.lastName}` : '' }}
                </a>
              </td>
              <td class="p-2 border border-grey-200 text-sm text-center">
                {{ player.createdAt | formatDate('dd/MM/yyyy - HH:mm') }}
              </td>
              <td
                v-if="player.paymentInfo.isCoach"
                colspan="3"
                class="p-2 border border-grey-200 text-sm text-center"
              >
                FREE COACH REGISTRATION
              </td>
              <template v-else>
                <td class="p-2 border border-grey-200 text-sm text-center">
                  <FontAwesomeIcon
                    :icon="[
                      'fal',
                      player.paymentInfo.upfrontFeePaid ? 'check' : 'xmark',
                    ]"
                  />
                </td>
                <td class="p-2 border border-grey-200 text-sm">
                  {{ player.paymentInfo.notes == null ? '' : player.paymentInfo.notes }}
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>

      <h2 class="mt-10">Subscription Payment Players</h2>
      <div v-for="player in subscriptionPlayers" :key="`subscription-player-${player.id}`" class="mb-6">
        <div class="bg-white border border-gray-300 rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold">
              <a
                :href="`https://dashboard.stripe.com/customers/${player.stripeCustomerId}`"
                title="View on Stripe"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ player.firstName }}
                {{ player.middleNames ? ` ${player.middleNames}` : '' }}
                {{ player.lastName ? ` ${player.lastName}` : '' }}
              </a>
            </h3>
            <div class="text-sm text-gray-500">
              Registered: {{ player.createdAt | formatDate('dd/MM/yyyy') }}
            </div>
          </div>

          <div v-if="player.paymentInfo.isCoach" class="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
            <div class="text-green-800 font-semibold text-lg">🏆 FREE COACH REGISTRATION</div>
            <div class="text-green-600 text-sm mt-1">No payment required for coaching staff</div>
          </div>

          <div v-else>
            <!-- Payment Status Summary -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-700">Registration Fee:</span>
                <FontAwesomeIcon
                  :icon="['fal', player.paymentInfo.registrationFeePaid ? 'check-circle' : 'times-circle']"
                  :class="player.paymentInfo.registrationFeePaid ? 'text-green-600' : 'text-red-600'"
                  class="text-lg"
                />
                <span :class="player.paymentInfo.registrationFeePaid ? 'text-green-600' : 'text-red-600'" class="font-medium">
                  {{ player.paymentInfo.registrationFeePaid ? 'Paid' : 'Unpaid' }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-700">Subscription Status:</span>
                <FontAwesomeIcon
                  :icon="['fal', player.paymentInfo.subscriptionUpToDate ? 'check-circle' : 'times-circle']"
                  :class="player.paymentInfo.subscriptionUpToDate ? 'text-green-600' : 'text-red-600'"
                  class="text-lg"
                />
                <span :class="player.paymentInfo.subscriptionUpToDate ? 'text-green-600' : 'text-red-600'" class="font-medium">
                  {{ player.paymentInfo.subscriptionUpToDate ? 'Up to Date' : 'Issues Found' }}
                </span>
              </div>
            </div>

            <div v-if="player.paymentInfo.notes" class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-start space-x-2">
                <FontAwesomeIcon :icon="['fal', 'exclamation-triangle']" class="text-yellow-600 mt-0.5" />
                <div>
                  <span class="font-medium text-yellow-800">Notes:</span>
                  <span class="text-yellow-700 ml-1">{{ player.paymentInfo.notes }}</span>
                </div>
              </div>
            </div>

            <!-- Expandable Monthly Payments -->
            <div v-if="player.paymentInfo.monthlyPayments && player.paymentInfo.monthlyPayments.length > 0" class="mt-4">
              <button
                @click="toggleMonthlyView(player.id)"
                class="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors duration-200"
              >
                <span class="font-medium text-gray-700">Monthly Payment Details</span>
                <FontAwesomeIcon
                  :icon="['fal', isMonthlyViewExpanded(player.id) ? 'chevron-up' : 'chevron-down']"
                  class="text-gray-500"
                />
              </button>

              <div v-if="isMonthlyViewExpanded(player.id)" class="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="bg-gray-50">
                        <th class="px-4 py-3 text-left font-medium text-gray-700">Month</th>
                        <th class="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                        <th class="px-4 py-3 text-center font-medium text-gray-700">Amount</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-700">Details</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="monthPayment in player.paymentInfo.monthlyPayments" :key="monthPayment.monthKey" class="hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-gray-900">
                          {{ monthPayment.month }} {{ monthPayment.year }}
                        </td>
                        <td class="px-4 py-3 text-center">
                          <span
                            :class="getPaymentStatusClass(monthPayment.status)"
                            class="inline-block px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {{ getPaymentStatusText(monthPayment.status) }}
                          </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                          <div v-if="monthPayment.amount !== null">
                            <span class="font-medium">£{{ monthPayment.amount.toFixed(2) }}</span>
                            <div v-if="monthPayment.refunded" class="text-red-600 text-xs mt-1">
                              Refunded: £{{ monthPayment.refunded.toFixed(2) }}
                            </div>
                          </div>
                          <span v-else class="text-gray-400">-</span>
                        </td>
                        <td class="px-4 py-3">
                          <div class="text-gray-700">{{ monthPayment.reason }}</div>
                          <div v-if="monthPayment.dueDate" class="text-gray-500 text-xs mt-1">
                            Due: {{ monthPayment.dueDate | formatDate('dd/MM/yyyy') }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="subscriptionPlayers.length === 0" class="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <div class="text-gray-500">No subscription players for this team</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalAdminSubsStatus',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
    FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
  },

  data: () => ({
    filters: {
      ageGroup: 'u7',
      sex: 'female',
      team: 'u7-saturday-lionesses',
    },
    loading: true,
    players: [],
    seasonMonths: [],
    seasonInfo: null,
    expandedMonthlyViews: [],
    sexes: [
      { key: 'male', value: 'Male' },
      { key: 'female', value: 'Female' },
    ],
    ageGroups: [
      {
        key: 'u7',
        value: 'Under 7s',
        teams: {
          female: [
            { key: 'u7-saturday-lionesses', value: 'U7 Lionesses (Saturday) - Sarah Burn' },
            { key: 'u7-saturday-girls-atalanta', value: 'U7 Girls Atalanta (Saturday) - Mark Ferguson' },
          ],
          male: [
            { key: 'u7-saturday-inter', value: 'U7 Inter (Saturday) - Michael Parr' },
            { key: 'u7-saturday-juve', value: 'U7 Juve (Saturday) - Ben Scott' },
            { key: 'u7-saturday-milan', value: 'U7 Milan (Saturday) - Mickey Richards' },
            { key: 'u7-sunday-atalanta', value: 'U7 Atalanta (Sunday) - Charlie Loughlen' },
            { key: 'u7-sunday-inter', value: 'U7 Inter (Sunday) - Michael Parr' },
            { key: 'u7-sunday-juve', value: 'U7 Juve (Sunday) - Liam Moody' },
            { key: 'u7-sunday-milan', value: 'U7 Milan (Sunday) - Mickey Richards' },
            { key: 'u7-sunday-napoli', value: 'U7 Napoli (Sunday) - John Sullivan' },
          ],
        },
      },
      {
        key: 'u8',
        value: 'Under 8s',
        teams: {
          female: [
            { key: 'u8-saturday-lionesses', value: 'U8 Lionesses (Saturday) - Chloe Clifford' },
            { key: 'u8-sunday-lionesses', value: 'U8 Lionesses (Sunday) - David Bland' },
          ],
          male: [
            { key: 'u8-saturday', value: 'U8 (Saturday) - Rob Charlton' },
            { key: 'u8-sunday-inter', value: 'U8 Inter (Sunday) - Rob Charlton' },
            { key: 'u8-sunday-juve', value: 'U8 Juve (Sunday) - Matty Henry' },
            { key: 'u8-sunday-milan', value: 'U8 Milan (Sunday) - Matty Henry' },
            { key: 'u8-sunday-napoli', value: 'U8 Napoli (Sunday) - Carl Johnson' },
          ],
        },
      },
      {
        key: 'u9',
        value: 'Under 9s',
        teams: {
          female: [
            { key: 'u9-saturday-lionesses', value: 'U9 Lionesses (Saturday) - Stu Taylor' },
          ],
          male: [
            { key: 'u9-saturday', value: 'U9 (Saturday) - Matty Henry' },
            { key: 'u9-saturday-juve', value: 'U9 Juve (Saturday) - Alex Gray' },
            { key: 'u9-saturday-lazio', value: 'U9 Lazio (Saturday) - James Tolchard' },
            { key: 'u9-sunday-inter', value: 'U9 Inter (Sunday) - Matty Henry' },
            { key: 'u9-sunday-juve', value: 'U9 Juve (Sunday) - Alex Gray' },
            { key: 'u9-sunday-lazio', value: 'U9 Lazio (Sunday) - James Tolchard' },
            { key: 'u9-sunday-milan', value: 'U9 Milan (Sunday) - Jordan Holmes' },
          ],
        },
      },
      {
        key: 'u10',
        value: 'Under 10s',
        teams: {
          female: [
            { key: 'u10-saturday-atalanta', value: 'U10 Atalanta (Saturday) - Jordan Robertson' },
            { key: 'u10-saturday-lionesses', value: 'U10 Lionesses (Saturday) - Mark Hedley' },
            { key: 'u10-sunday-atalanta', value: 'U10 Atalanta (Sunday) - Joe Preston' },
            { key: 'u10-sunday-lionesses', value: 'U10 Lionesses (Sunday) - Mark Hedley' },
            { key: 'u10-sunday-pumas', value: 'U10 Pumas (Sunday) - Joe Preston' },
          ],
          male: [
            { key: 'u10-saturday-milan', value: 'U10 Milan (Saturday) - Mattie Thompson' },
            { key: 'u10-saturday-roma', value: 'U10 Roma (Saturday) - Chris Bush' },
            { key: 'u10-sunday-inter', value: 'U10 Inter (Sunday) - Darryl Faichen' },
            { key: 'u10-sunday-juve', value: 'U10 Juve (Sunday) - Stephen Welsh' },
            { key: 'u10-sunday-milan', value: 'U10 Milan (Sunday) - Joe Foalle' },
            { key: 'u10-sunday-napoli', value: 'U10 Napoli (Sunday) - Ray Armstrong' },
          ],
        },
      },
      {
        key: 'u11',
        value: 'Under 11s',
        teams: {
          female: [
            { key: 'u11-saturday-atalanta', value: 'U11 Atalanta (Saturday) - Stu Taylor' },
            { key: 'u11-saturday-lionesses', value: 'U11 Lionesses (Saturday) - Jordan Robertson' },
            { key: 'u11-sunday-atalanta', value: 'U11 Atalanta (Sunday) - Stu Taylor' },
            { key: 'u11-sunday-lionesses', value: 'U11 Lionesses (Sunday) - Leanne Marshall' },
          ],
          male: [
            { key: 'u11-saturday-sparta', value: 'U11 Sparta (Saturday) - Peter Lappin' },
            { key: 'u11-saturday-sparta-96', value: 'U11 Sparta 96 (Saturday) - Peter Lappin' },
            { key: 'u11-sunday-milan', value: 'U11 Milan (Sunday) - Sam Gibson' },
            { key: 'u11-sunday-roma', value: 'U11 Roma (Sunday) - Chris Hunn' },
            { key: 'u11-sunday-sparta', value: 'U11 Sparta (Sunday) - Peter Lappin' },
            { key: 'u11-sunday-sparta-96', value: 'U11 Sparta 96 (Sunday) - Peter Lappin' },
          ],
        },
      },
      {
        key: 'u12',
        value: 'Under 12s',
        teams: {
          female: [
            { key: 'u12-saturday-lionesses', value: 'U12 Lionesses (Saturday) - Mark Hewitson' },
            { key: 'u12-sunday-jaguars', value: 'U12 Jaguars (Sunday) - Chloe Clifford' },
            { key: 'u12-sunday-pumas', value: 'U12 Pumas (Sunday) - Chloe Clifford' },
          ],
          male: [
            { key: 'u12-saturday-inter', value: 'U12 Inter (Saturday) - Chris Carr' },
            { key: 'u12-sunday-inter', value: 'U12 Inter (Sunday) - Chris Carr' },
            { key: 'u12-sunday-milan', value: 'U12 Milan (Sunday) - Adam Jones' },
            { key: 'u12-sunday-napoli', value: 'U12 Napoli (Sunday) - Adam Jones' },
          ],
        },
      },
      {
        key: 'u13',
        value: 'Under 13s',
        teams: {
          female: [
            { key: 'u13-sunday-lionesses', value: 'U13 Lionesses (Sunday) - Mark Foreman' },
          ],
          male: [
            { key: 'u13-saturday-milan', value: 'U13 Milan (Saturday) - John Stewart' },
            { key: 'u13-sunday-milan', value: 'U13 Milan (Sunday) - John Stewart' },
            { key: 'u13-sunday-sparta', value: 'U13 Sparta (Sunday) - Iain Davison' },
          ],
        },
      },
      {
        key: 'u14',
        value: 'Under 14s',
        teams: {
          female: [
            { key: 'u14-saturday-lionesses', value: 'U14 Lionesses (Saturday) - Abbie Johnson' },
          ],
          male: [
            { key: 'u14-saturday', value: 'U14 (Saturday) - Simon Philpott' },
            { key: 'u14-sunday', value: 'U14 (Sunday) - Simon Philpott' },
          ],
        },
      },
      {
        key: 'u15',
        value: 'Under 15s',
        teams: {
          female: [],
          male: [
            { key: 'u15-sunday-juve', value: 'U15 Juve (Sunday) - Stu Smith' },
          ],
        },
      },
      {
        key: 'u16',
        value: 'Under 16s',
        teams: {
          female: [],
          male: [
            { key: 'u16-saturday-juve', value: 'U16 Juve (Saturday) - John Sullivan' },
          ],
        },
      },
    ],
  }),

  computed: {
    filteredTeams() {
      return this.ageGroups.find(({ key }) => key === this.filters.ageGroup)?.teams?.[this.filters.sex] || [];
    },
    upfrontPlayers() {
      return this.players.filter(player => player.membershipFeeOption === 'upfront');
    },
    subscriptionPlayers() {
      return this.players.filter(player => player.membershipFeeOption === 'subscription');
    },
  },

  watch: {
    'filters.ageGroup': function watchAgeGroup() {
      this.$nextTick(() => {
        if (this.filteredTeams.length > 0) {
          this.filters.team = this.filteredTeams[0].key;
          this.fetchSubsStatus();
        }
      });
    },
    'filters.team': async function watchTeam() {
      if (this.filters.team) {
        this.fetchSubsStatus();
      }
    },
    'filters.sex': async function watchSex() {
      this.$nextTick(() => {
        if (this.filteredTeams.length > 0) {
          this.filters.team = this.filteredTeams[0].key;
          this.fetchSubsStatus();
        }
      });
    },
  },

  mounted() {
    this.fetchSubsStatus();
  },

  methods: {
    async fetchSubsStatus() {
      this.loading = true;

      const { data: { data } } = await this.$axios.post('/api/admin/subs-status', {
        team: this.filters.team
      });

      this.players = data.players;
      this.seasonMonths = data.seasonMonths;
      this.seasonInfo = data.seasonInfo;

      this.loading = false;
    },
    getCurrentMonthName(monthNumber) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[monthNumber - 1];
    },
    getPaymentStatusClass(status) {
      switch (status) {
        case 'paid':
          return 'bg-green-500 text-white';
        case 'pending':
          return 'bg-amber-500 text-white';
        case 'overdue':
          return 'bg-red-600 text-white';
        case 'failed':
          return 'bg-red-600 text-white';
        case 'missing':
          return 'bg-gray-500 text-white';
        case 'void':
          return 'bg-gray-400 text-white';
        case 'N/A':
          return 'bg-blue-500 text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    },
    getPaymentStatusText(status) {
      switch (status) {
        case 'paid':
          return 'Paid';
        case 'pending':
          return 'Pending';
        case 'overdue':
          return 'Overdue';
        case 'failed':
          return 'Failed';
        case 'missing':
          return 'Missing';
        case 'void':
          return 'Void';
        case 'N/A':
          return 'N/A';
        default:
          return status;
      }
    },
    toggleMonthlyView(playerId) {
      const index = this.expandedMonthlyViews.indexOf(playerId);
      if (index > -1) {
        this.expandedMonthlyViews.splice(index, 1);
      } else {
        this.expandedMonthlyViews.push(playerId);
      }
    },
    isMonthlyViewExpanded(playerId) {
      return this.expandedMonthlyViews.includes(playerId);
    },
    // async setDefaultPaymentMethod() {
    //   const response = await this.$axios.post('/api/admin/set-default-payment-method');
    //   console.log(response);
    // },
  },
};
</script>
