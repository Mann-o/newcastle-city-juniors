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
            <th class="bg-black text-gold font-normal text-sm p-2 text-center">Paid?</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="upfrontPlayers.length === 0">
            <td class="p-2 border border-grey-200 text-sm text-center" colspan="3">
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
              <td
                v-if="player.paymentInfo.isCoach"
                colspan="2"
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
      <table class="w-full">
        <thead>
          <tr>
            <th class="bg-black text-gold font-normal text-sm p-2 text-left">Player</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-center">Paid Reg Fee?</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-center">Subs Up To Date?</th>
            <th class="bg-black text-gold font-normal text-sm p-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="subscriptionPlayers.length === 0">
            <td class="p-2 border border-grey-200 text-sm text-center" colspan="4">
              No subscription players for this team
            </td>
          </tr>
          <template v-else>
            <tr
              v-for="player in subscriptionPlayers"
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
                      player.paymentInfo.registrationFeePaid ? 'check' : 'xmark',
                    ]"
                  />
                </td>
                <td class="p-2 border border-grey-200 text-sm text-center">
                  <FontAwesomeIcon
                    :icon="[
                      'fal',
                      player.paymentInfo.subscriptionUpToDate ? 'check' : 'xmark',
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

      const { data: { data: players } } = await this.$axios.post('/api/admin/subs-status', this.filters);

      this.players = players;

      this.loading = false;
    },
    // async setDefaultPaymentMethod() {
    //   const response = await this.$axios.post('/api/admin/set-default-payment-method');
    //   console.log(response);
    // },
  },
};
</script>
