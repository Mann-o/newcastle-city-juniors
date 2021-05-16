<template>
  <div>
    <h1>Club Committee</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching committee members!
    </div>
    <div
      v-else
      class="lg:grid lg:grid-cols-4 lg:gap-8"
    >
      <CommitteeCard
        v-for="(member, index) in committeeMembers"
        :key="index"
        :member="member"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageAboutUsClubCommittee',

  components: {
    CommitteeCard: () => import('@/components/committee/CommitteeCard.vue'),
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    committeeMembers: [],
  }),

  async fetch () {
    this.committeeMembers = await this.$contentful
      .getEntries({
        content_type: this.$config.contentfulCommitteeMemberContentType,
        order: 'sys.createdAt',
      })
      .then(({ items: committeeMembers }) => committeeMembers)
  },

  head: () => ({
    title: 'Club Committee',
  }),
}
</script>
