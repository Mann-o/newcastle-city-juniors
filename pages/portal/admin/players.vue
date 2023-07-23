<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching registered players!
    </div>

    <div v-else>
      <label class="block pb-2 font-bold text-sm">Filter to age group:</label>
      <select
        class="border border-black"
        v-model="filterToAgeGroup"
      >
        <option
          v-for="ageGroup in ageGroupOptions"
          :key="`filter-${ageGroup.value}`"
          :value="ageGroup.value"
        >
          {{ ageGroup.label }}
        </option>
      </select>

      <template v-for="([ageGroup, players]) in Object.entries(ageGroups)">
        <div
          class="mt-16"
          v-if="filterToAgeGroup === ageGroup || filterToAgeGroup === 'all'"
          :key="ageGroup"
        >
          <h4>{{ ageGroup.replace('-', ' ').toUpperCase() }}</h4>
          <table class="w-full">
            <thead>
              <tr>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Player</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Age Group</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Team</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Second Team</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Identity Verification</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Age Verification</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">Parent</th>
                <th class="bg-black text-gold text-left font-normal text-sm p-2">On WGS?</th>
              </tr>
            </thead>
            <tbody v-if="!players.length">
              <tr>
                <td class="py-4 text-center text-sm" colspan="6">No players have been registered yet!</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr
                v-for="(player, index) in players"
                :key="`player-${player.id}`"
              >
                <td class="p-2 border border-grey-200 text-sm">{{ player.full_name }}</td>
                <td class="p-2 border border-grey-200 text-sm">{{ player.age_group }}</td>
                <td class="p-2 border border-grey-200 text-sm">{{ player.team }}</td>
                <td class="p-2 border border-grey-200 text-sm">{{ player.second_team }}</td>
                <td class="p-2 border border-grey-200 text-sm">
                  <button
                    v-if="player.identity_verification_photo"
                    class="underline"
                    @click="viewImage(player.identity_verification_photo)"
                  >
                    View
                  </button>
                  <span v-else>Not available</span>
                </td>
                <td class="p-2 border border-grey-200 text-sm">
                  <button
                    v-if="player.age_verification_photo"
                    class="underline"
                    @click="viewImage(player.age_verification_photo)"
                  >
                    View
                  </button>
                  <span v-else>Not available</span>
                </td>
                <td class="p-2 border border-grey-200 text-sm">
                  <button
                    class="underline"
                    @click.prevent="viewParent(player)"
                  >
                    View
                  </button>
                </td>
                <td class="p-2 border border-grey-200 text-sm">
                  <input type="checkbox" :checked="player.wgs_registered" @input="toggleWgsRegistered(player.id)">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalAdminPlayerVerification',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    ageGroups: null,
    filterToAgeGroup: 'all',
  }),

  async fetch() {
    const { data: { data: players } } = await this.$axios.get('/api/admin/players')

    this.ageGroups = players.reduce((ageGroups, player) => {
      if (ageGroups[player.age_group]) {
        ageGroups[player.age_group].push(player);
      } else {
        ageGroups[player.age_group] = [player];
      }

      return ageGroups;
    }, {});
  },

  computed: {
    ageGroupOptions() {
      const ageGroupOptions = [
        { value: 'all', label: 'All' },
        ...Object.keys(this.ageGroups)
          .map(ageGroup => ({
            value: ageGroup,
            label: ageGroup.replace('-', ' ').toUpperCase(),
          })),
      ];

      return ageGroupOptions.sort((a, b) => parseInt(a.label.replace('UNDER ', '')) - parseInt(b.label.replace('UNDER ', '')));
    },
  },

  methods: {
    async viewImage(path) {
      const { data: { data: image} } = await this.$axios.get(`/api/admin/verification-photos/${path}`);

      const link = document.createElement('a');
      link.href = image;
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    async viewParent(player) {
      this.$modal.show(() => import('@/components/modals/ParentInfoModal.vue'), {
        attributes: {
          'aria-labelledby': 'modal-heading',
        },
        props: {
          player,
        },
      });
    },
    toggleWgsRegistered(playerId) {
      this.$axios.post(`/api/admin/player/${playerId}/toggle-wgs-registration`)
    },
  },
}
</script>
