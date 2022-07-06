<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching registered players!
    </div>

    <div v-else>
      <h4>Players</h4>
      <table class="w-full">
        <thead>
          <tr>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Player</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Age Group</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Team</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Identity Verification</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Age Verification</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Parent</th>
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
            <td class="p-2 border border-grey-200 text-sm">
              <button @click="downloadFile('identity', player.identity_verification_photo)">Download</button>
            </td>
            <td class="p-2 border border-grey-200 text-sm">
              <button @click="downloadFile('age', player.age_verification_photo)">Download</button>
            </td>
            <td class="p-2 border border-grey-200 text-sm">
              <button @click.prevent="viewParent(player)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
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
    players: null,
  }),

  async fetch() {
    const { data: { data: players } } = await this.$axios.get('/api/admin/players')

    this.players = players;
  },

  methods: {
    async downloadFile(type, path) {
      const { data: image } = await this.$axios.get(`/api/admin/verification-photos/${type}/${path}`, { responseType: 'blob' });

      const url = window.URL.createObjectURL(image);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_verification_photo`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    async viewParent(player) {
      const { data: { data: parent } } = await this.$axios.get(`/api/admin/player/${player.id}/parent`);

      this.$modal.show(() => import('@/components/modals/ParentInfoModal.vue'), {
        attributes: {
          'aria-labelledby': 'modal-heading',
        },
        props: {
          player,
          parent,
        },
      });
    },
  },
}
</script>
