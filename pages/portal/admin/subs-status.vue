<template>
  <div>
    <FormSelect
      label="Age Group"
      :options="ageGroups"
      v-model="filters.ageGroup"
    />
    <FormSelect
      label="Team"
      :options="filteredTeams"
      v-model="filters.team"
    />

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
              <td class="p-2 border border-grey-200 text-sm text-left">{{ player.full_name }}</td>
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
                <td class="p-2 border border-grey-200 text-sm">&nbsp;</td>
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
              <td class="p-2 border border-grey-200 text-sm text-left">{{ player.full_name }}</td>
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
                <td class="p-2 border border-grey-200 text-sm">&nbsp;</td>
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
      team: 'u7-girls-saturday',
    },
    loading: true,
    players: [],
    ageGroups: [
      {
        key: 'u7',
        value: 'Under 7s',
        teams: [
          { key: 'u7-girls-saturday', value: 'U7 Girls (Sat) - Mark Hedley' },
          { key: 'u7-saturday', value: 'U7s (Sat) - Matty Henry' },
          { key: 'u7-inter', value: 'U7 Inter (Sun) - Matty Henry' },
          { key: 'u7-juve', value: 'U7 Juve (Sun) - Matty Henry' },
          { key: 'u7-milan', value: 'U7 Milan (Sun) - Matty Henry' },
        ],
      },
      {
        key: 'u8',
        value: 'Under 8s',
        teams: [
          { key: 'u8-girls-saturday', value: 'U8 Girls (Sat) - Jordan Robertson' },
          // { key: 'u8-juve-saturday', value: 'U8 Juve (Sat) - John Sullivan' },
          { key: 'u8-milan-saturday', value: 'U8 Milan (Sat) - Mattie Thompson' },
          { key: 'u8-lazio-saturday', value: 'U8 Lazio (Sat) - James Tolchard' },
          { key: 'u8-inter', value: 'U8 Inter (Sun) - Adam Jones' },
          // { key: 'u8-juve', value: 'U8 Juve (Sun) - John Sullivan' },
          { key: 'u8-lazio', value: 'U8 Lazio (Sun) - James Tolchard' },
          { key: 'u8-milan', value: 'U8 Milan (Sun) - Jordan Holmes' },
        ],
      },
      {
        key: 'u9',
        value: 'Under 9s',
        teams: [
          { key: 'u9-girls-lionesses-saturday', value: 'U9 Girls Lionesses (Sat) - Mark Hedley' },
          { key: 'u9-girls-atlanta', value: 'U9 Girls Atlanta (Sun) - Joe Preston' },
          { key: 'u9-girls-lionesses', value: 'U9 Girls Lionesses (Sun) - Mark Hedley' },
          { key: 'u9-inter', value: 'U9 Inter (Sun) - Joe Foalle' },
          { key: 'u9-juve', value: 'U9 Juve (Sun) - Joe Foalle' },
          { key: 'u9-milan', value: 'U9 Milan (Sun) - Joe Foalle' },
        ],
      },
      {
        key: 'u10',
        value: 'Under 10s',
        teams: [
          { key: 'u10-girls-atalanta-saturday', value: 'U10 Girls Atalanta (Sat) - Stu Taylor' },
          { key: 'u10-lionesses-saturday', value: 'U10 Lionesses (Sat) - Leanne Marshall' },
          { key: 'u10-fiorentina-saturday', value: 'U10 Fiorentina (Sat) - Paul Leadbitter' },
          { key: 'u10-juve-saturday', value: 'U10 Juve (Sat) - James Robertson' },
          { key: 'u10-napoli-saturday', value: 'U10 Napoli (Sat) - Chris Hunn' },
          { key: 'u10-girls-lionesses', value: 'U10 Girls Lionesses (Sun) - Leanne Marshall' },
          { key: 'u10-atalanta', value: 'U10 Atalanta (Sun) - Mattie Thompson' },
          { key: 'u10-inter', value: 'U10 Inter (Sun) - Paul Leadbitter' },
          { key: 'u10-juve', value: 'U10 Juve (Sun) - James Tolchard' },
          { key: 'u10-milan', value: 'U10 Milan (Sun) - Graham Watson' },
          { key: 'u10-roma', value: 'U10 Roma (Sun) - Chris Hunn' }
        ],
      },
      {
        key: 'u11',
        value: 'Under 11s',
        teams: [
          { key: 'u11-girls-lionesses-saturday', value: 'U11 Girls Lionesses (Sat) - Mark Hewitson' },
          { key: 'u11-inter-saturday', value: 'U11 Inter (Sat) - Chris Carr' },
          { key: 'u11-jaguars', value: 'U11 Jaguars (Sun) - Chloe Clifford' },
          { key: 'u11-pumas', value: 'U11 Pumas (Sun) - Chloe Clifford' },
          { key: 'u11-inter', value: 'U11 Inter (Sun) - Chris Carr' },
          { key: 'u11-juve', value: 'U11 Juve (Sun) - Paul Thornton' },
          { key: 'u11-milan', value: 'U11 Milan (Sun) - Adam Jones' },
        ],
      },
      {
        key: 'u12',
        value: 'Under 12s',
        teams: [
          { key: 'u12-milan', value: 'U12 Milan (Sun) - John Stewart' },
          { key: 'u12-sparta', value: 'U12 Sparta (Sun) - Iain Davison' },
        ],
      },
      {
        key: 'u13',
        value: 'Under 13s',
        teams: [
          { key: 'u13-saturday', value: 'U13s (Sat) - John Stewart' },
          { key: 'u13-city', value: 'U13 City (Sun) - Simon Philpott' },
        ],
      },
      {
        key: 'u14',
        value: 'Under 14s',
        teams: [
          { key: 'u14-juve', value: 'U14 Juve (Sun) - Stu Smith' },
        ],
      },
      {
        key: 'u15',
        value: 'Under 15s',
        teams: [
          { key: 'u15-saturday', value: 'U15s (Sat) - John Sullivan' },
          { key: 'u15-juve', value: 'U15 Juve (Sun) - John Sullivan' },
        ],
      },
      {
        key: 'u16',
        value: 'Under 16s',
        teams: [
          { key: 'u16-juve', value: 'U16 Juve (Sun) - Mark Foreman' },
        ],
      },
    ],
  }),

  computed: {
    filteredTeams() {
      return this.ageGroups.find(({ key }) => key === this.filters.ageGroup)?.teams || [];
    },
    upfrontPlayers() {
      return this.players.filter(player => player.membership_fee_option === 'upfront');
    },
    subscriptionPlayers() {
      return this.players.filter(player => player.membership_fee_option === 'subscription');
    },
  },

  watch: {
    'filters.ageGroup': function watchAgeGroup() {
      this.$nextTick(() => {
        this.filters.team = this.filteredTeams[0].key;
      });
    },
    'filters.team': async function watchTeam() {
      this.fetchSubsStatus();
    },
  },

  mounted() {
    this.fetchSubsStatus();
  },

  methods: {
    async fetchSubsStatus() {
      this.loading = true;

      const { data: players } = await this.$axios.post('/api/admin/subs-status', this.filters);

      this.players = players;

      this.loading = false;
    },
  },
};
</script>
