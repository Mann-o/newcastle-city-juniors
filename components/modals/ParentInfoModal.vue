<template>
  <ModalWrapper>
    <template #heading="headingProps">
      <h2
        class="mb-8"
        v-bind="headingProps"
      >
        Parent / Guardian - {{ player.full_name }}
      </h2>
    </template>

    <template #body>
      <div v-if="$fetchState.pending">
        <Loader />
      </div>

      <div v-else-if="$fetchState.error">
        An error occurred fetching registered players!
      </div>

      <table v-else class="w-full border-collapse">
        <tbody>
          <tr>
            <th class="text-left p-2">Title</th>
            <td class="p-2" v-if="parent.title === 'other'">
              {{ parent.other_title }}
            </td>
            <td class="p-2" v-else>
              {{ parent.title }}
            </td>
          </tr>
          <tr>
            <th class="text-left p-2">Full Name</th>
            <td class="p-2">{{ parent.full_name }}</td>
          </tr>
          <tr>
            <th class="text-left p-2">Date of Birth</th>
            <td class="p-2">{{ parent.date_of_birth | formatDate }}</td>
          </tr>
          <tr>
            <th class="text-left p-2">Email Address</th>
            <td class="p-2">{{ parent.email }}</td>
          </tr>
          <tr>
            <th class="text-left p-2">Mobile Number</th>
            <td class="p-2">{{ parent.mobile_number }}</td>
          </tr>
          <tr>
            <th class="text-left p-2 align-top">Address</th>
            <td class="p-2">
              <span class="block">{{ parent.address_line_one }}</span>
              <span class="block" v-if="parent.address_line_two">{{ parent.address_line_two }}</span>
              <span class="block" v-if="parent.address_line_three">{{ parent.address_line_three }}</span>
              <span class="block" v-if="parent.address_line_four">{{ parent.address_line_four }}</span>
              <span class="block" v-if="parent.address_line_five">{{ parent.address_line_five }}</span>
              <span class="block">{{ parent.postal_code }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-left p-2">Accepted Code of Conduct?</th>
            <td class="p-2">{{ parent.accepted_code_of_conduct ? 'Yes' : 'No' }}</td>
          </tr>
          <tr>
            <th class="text-left p-2">Date Registered</th>
            <td class="p-2">{{ parent.created_at | formatDate }}</td>
          </tr>
          <tr>
            <th class="text-left p-2">Last Updated</th>
            <td class="p-2">{{ parent.updated_at | formatDate }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </ModalWrapper>
</template>

<script>
export default {
  name: 'ParentInfoModal',

  components: {
    ModalWrapper: () => import('./ModalWrapper.vue'),
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  props: {
    player: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    parent: null,
    charges: null,
  }),

  async fetch() {
    const { data: { data: { parent, charges } } } = await this.$axios.get(`/api/admin/player/${this.player.id}/parent`);

    this.parent = parent;
    this.charges = charges;
  },
};
</script>
