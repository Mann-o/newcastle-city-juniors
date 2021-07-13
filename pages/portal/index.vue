<template>
  <div>
    <h1>NCJ Portal</h1>
    <div class="mb-8">
      <p>Welcome to the NCJ Portal. Here you can register your players, make payments and manage your player subscriptions.</p>
    </div>
    <div>
      <h2>Registered Players</h2>
      <div v-if="$fetchState.pending">
        <Loader />
      </div>
      <div v-else-if="$fetchState.error">
        An error occurred fetching registered players!
      </div>
      <div v-else>
        <p v-if="!players.length">You have not registered any players yet!</p>
        <div
          v-else
          class="grid gap-8 lg:grid-cols-12 lg:gap-16"
        >
          <NuxtLink
            class="lg:col-span-4 border border-black bg-gold hover:text-black"
            :to="`/portal/player/${player.id}`"
            v-for="(player, index) in players"
            :key="`player-${player.id}`"
          >
            <div class="grid grid-cols-12">
              <div class="col-span-4 flex items-center justify-center text-6xl">
                <FontAwesomeIcon :icon="['fad', 'child']" />
              </div>
              <div class="col-span-8 p-8 pl-0">
                <p class="font-bold">Player {{ index + 1 }}</p>
                <ul>
                  <li>
                    <span title="Name" class="inline-block w-6 mr-2">
                      <FontAwesomeIcon :icon="['fad', 'signature']" />
                    </span>
                    {{ player.full_name }}
                  </li>
                  <li>
                    <span title="Date of Birth" class="inline-block w-6 mr-2">
                      <FontAwesomeIcon :icon="['fad', 'calendar-day']" />
                    </span>
                    {{ player.date_of_birth | formatDate }}
                  </li>
                  <li>
                    <span title="Sex" class="inline-block w-6 mr-2">
                      <FontAwesomeIcon :icon="['fad', 'venus-mars']" />
                    </span>
                    {{ player.sex | uppercaseFirst }}
                  </li>
                  <li>
                    <span title="Team" class="inline-block w-6 mr-2">
                      <FontAwesomeIcon :icon="['fad', 'users']" />
                    </span>
                    {{ player.team.ageGroup.name }} - {{ player.team.name }}
                  </li>
                </ul>
              </div>
            </div>
          </NuxtLink>
        </div>
        <NuxtLink
          to="/portal/player-registration"
          class="
            inline-block mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
            hover:bg-black hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
          "
        >
          Register a player
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalIndex',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    players: [],
  }),

  async fetch () {
    const { data: { data: players } } = await this.$axios.get('/api/club/players')
    this.players = players
  },
}
</script>
