<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching registered parents/guardians!
    </div>
    <div v-else>
      <table
        v-if="parents"
        class="w-full border-collapse border border-grey-200"
      >
        <thead>
          <tr>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Name</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Date of Birth</th>
            <th class="bg-black text-gold text-left font-normal text-sm p-2">Email Address</th>
            <!-- <th class="bg-black text-gold text-left font-normal text-sm p-2">Actions</th> -->
          </tr>
        </thead>
        <tbody v-if="!parents.length">
          <tr>
            <td class="py-4 text-center text-sm" colspan="5">You have not registered a parent or guardian yet!</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(parent, index) in parents"
            :key="`parent-${parent.id}`"
          >
            <td class="p-2 border border-grey-200 text-sm">{{ parent.full_name }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ parent.date_of_birth | formatDate }}</td>
            <td class="p-2 border border-grey-200 text-sm">{{ parent.email }}</td>
            <!-- <td class="p-2 border border-grey-200 text-sm">
              <NuxtLink
                class="underline"
                :to="`/portal/parents/${parent.id}`"
              >
                Manage
              </NuxtLink>
            </td> -->
          </tr>
        </tbody>
      </table>
      <NuxtLink
        to="/portal/parents/register"
        class="
          inline-block mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
          hover:bg-black hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
        "
      >
        Register a Parent / Guardian
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalParents',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    parents: [],
  }),

  async fetch () {
    const { data: { data: parents } } = await this.$axios.get('/api/club/parents')
    this.parents = parents;
  },
}
</script>
