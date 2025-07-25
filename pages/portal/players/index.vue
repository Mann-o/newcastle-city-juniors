<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching registered players!
    </div>
    <div v-else>
      <table
        v-if="players"
        class="w-full border-collapse border border-grey-200"
      >
        <thead>
          <tr>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Player Name</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Date of Birth</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Sex</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Actions</th>
          </tr>
        </thead>
        <tbody v-if="!players.length">
          <tr>
            <td class="py-4 text-center text-sm" colspan="5">You have not registered a player yet!</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(player, index) in players"
            :key="`player-${player.id}`"
          >
            <td class="p-2 border border-grey-200 text-sm">{{ player.full_name }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ player.date_of_birth | formatDate }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ player.sex | uppercaseFirst }}</td>
            <td class="p-2 border border-grey-200 text-sm">
              <NuxtLink
                class="underline"
                :to="`/portal/players/${player.id}`"
              >
                Manage Player
              </NuxtLink>
              <template v-if="player.membership_fee_option === 'subscription'">
                <span class="mx-2">|</span>
                <a
                  class="underline"
                  :href="`/portal/players/${player.id}/subscription`"
                  @click.prevent="redirectToStripeCustomerPortal()"
                >
                  Subscription Portal
                </a>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-8 italic">
        <p>NOTE: It may sometimes take a few minutes for a player you have registered to appear here. If you have registered a player and they are not yet showing on this page, please wait a little while and refresh this page. If the registered player still does not appear, please reach out to us: <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a></p>
      </div>
      <button
        @click="handleRegisterPlayerButton()"
        :disabled="parentCount === 0"
        class="
          inline-block mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
          hover:bg-black hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
        "
      >
        Register a player
      </button>
      <div
        v-if="parentCount === 0"
        class="mt-6"
      >You have not <NuxtLink to="/portal/parents/register" class="underline">registered a parent or guardian</NuxtLink> yet. We require a parent or guardian to be added to your account before you can register a child. This is to ensure we have all of the information necessary for us to register that child with the FA as a player of our club.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalPlayersIndex',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    players: [],
    parentCount: 0,
  }),

  async fetch () {
    const { data: { data: players } } = await this.$axios.get('/api/club/players')
    this.players = players

    const { data: { data: parents } } = await this.$axios.get('/api/club/parents')
    this.parentCount = parents.length;
  },

  mounted() {
    if (this.$route.query?.status === 'success') {
      this.$store.dispatch('notifications/add', {
        type: 'success',
        title: 'Player Registered',
        text: 'Your player has been successfully registered!',
        sticky: true,
      });

      window.history.replaceState(null, null, window.location.pathname);
    }
  },

  methods: {
    handleRegisterPlayerButton() {
      if (this.parentCount > 0) {
        this.$router.push('/portal/players/register');
      }
    },
    async redirectToStripeCustomerPortal() {
      const { data: { data: { url } } } = await this.$axios.post('/api/stripe/create-customer-portal-session', {
        returnUrl: window.location.href,
      });

      window.location.replace(url);
    },
  },
}
</script>
