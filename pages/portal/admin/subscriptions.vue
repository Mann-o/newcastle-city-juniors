<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching subscriptions!
    </div>

    <div v-else>
      <div
        v-for="(ageGroup, index) in ageGroups"
        :key="`age-group-${index}`"
        class="mt-8 first:mt-0"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th class="bg-black text-gold text-left font-normal text-sm p-2">Age Group</th>
              <th class="bg-black text-gold text-left font-normal text-sm p-2">Team</th>
              <th class="bg-black text-gold text-left font-normal text-sm p-2">Player</th>
              <th class="bg-black text-gold text-left font-normal text-sm p-2">Subscription Status</th>
              <th class="bg-black text-gold text-left font-normal text-sm p-2">First Payment Date</th>
              <th class="bg-black text-gold text-left font-normal text-sm p-2">Contact Email(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, playerIndex) in ageGroup.players"
              :key="`age-group-${index}-player-${playerIndex}`"
            >
              <td class="p-2 border border-grey-200 text-sm">
                <span v-if="ageGroup.ageGroup !== 'null'">
                  {{ ageGroup.ageGroup.replace('-', ' ').replace('u', 'U') }}
                </span>
                <span v-else>
                  Unknown
                </span>
              </td>
              <td class="p-2 border border-grey-200 text-sm">
                <span v-if="player.team">
                  {{ player.team.charAt(0).toUpperCase() + player.team.slice(1) }}
                </span>
                <span v-else>
                  Unknown
                </span>
              </td>
              <td class="p-2 border border-grey-200 text-sm">
                <span :title="player.stripePaymentIntentId">{{ player.name }}</span>
              </td>
              <td class="p-2 border border-grey-200 text-sm">
                <span
                  v-if="player.subscriptionStatus === 'not_setup'"
                  :title="player.subscriptionStatus"
                  style="color:red"
                >
                  Not Setup
                </span>
                <span
                  v-else-if="player.subscriptionStatus === 'trialing'"
                  :title="player.subscriptionStatus"
                  style="color:goldenrod"
                >
                  Trial Mode
                </span>
                <span
                  v-else-if="player.subscriptionStatus === 'active'"
                  :title="player.subscriptionStatus"
                  style="color:green"
                >
                  Active
                </span>
                <span
                  v-else-if="player.subscriptionStatus === 'unpaid' || player.subscriptionStatus === 'past_due'"
                  :title="player.subscriptionStatus"
                  style="color:chocolate"
                >
                  Payment Missed
                </span>
                <span
                  v-else-if="player.subscriptionStatus === 'incomplete' || player.subscriptionStatus === 'incomplete_expired'"
                  :title="player.subscriptionStatus"
                  style="color:chocolate"
                >
                  Missing Payment Method
                </span>
                <span
                  v-else-if="player.subscriptionStatus === 'canceled'"
                  :title="player.subscriptionStatus"
                  style="color:red"
                >
                  Cancelled
                </span>
                <span
                  v-else
                  :title="player.subscriptionStatus"
                >
                  Unknown
                </span>
              </td>
              <td class="p-2 border border-grey-200 text-sm">
                <span v-if="player.firstPaymentDate">
                  {{ player.firstPaymentDate }}
                </span>
                <span v-else>N/A</span>
              </td>
              <td class="p-2 border border-grey-200 text-sm">
                <a :href="`mailto:${player.user.email}`">{{ player.user.email }}</a>
                <template v-if="player.user.alternateEmail">
                  or <a :href="`mailto:${player.user.alternateEmail}`">{{ player.user.alternateEmail }}</a>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalAdminSubscriptions',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    ageGroups: null,
    filterToAgeGroup: 'all',
  }),

  async fetch() {
    const { data: { data: ageGroups } } = await this.$axios.get('/api/admin/subscriptions-schedule');

    this.ageGroups = ageGroups;
  },
};
</script>
