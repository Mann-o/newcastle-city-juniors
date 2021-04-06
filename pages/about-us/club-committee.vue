<template>
  <div>
    <h1>Club Committee</h1>
    <div class="lg:grid lg:grid-cols-4 lg:gap-8">
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
  },

  data: () => ({
    committeeMembers: [
      {
        name: 'Stephen Chambers',
        role: 'Chairman',
        telephoneNumber: '07891325389',
        emailAddress: 'debbiechambersncj@yahoo.co.uk',
      },
      {
        name: 'Adam Jones',
        role: 'Vice Chairman',
        telephoneNumber: '07518389898',
        emailAddress: 'ajonesy1987@hotmail.com',
      },
      {
        name: 'David Stephenson',
        role: 'Secretary',
        telephoneNumber: '07305898317',
        emailAddress: 'ncj.davidstephenson@hotmail.com',
      },
      {
        name: 'Debbie Chambers',
        role: 'Treasurer',
        telephoneNumber: '07954175993',
        emailAddress: 'debbiechambersncj@yahoo.co.uk',
      },
      {
        name: 'Steve Gilroy',
        role: 'Assistant Treasurer',
        telephoneNumber: '07584513911',
        emailAddress: 'donaldgilberts@hotmail.co.uk',
      },
      {
        name: 'Keith Morris',
        role: 'Welfare Officer',
        telephoneNumber: '07914118197',
        emailAddress: 'keithmorris_cyd@hotmail.co.uk',
      },
      {
        name: 'Nicky Gray',
        role: 'Director of Football',
        telephoneNumber: '07779273675',
        emailAddress: 'ngray71@me.com',
      },
      {
        name: 'Jack Foalle',
        role: 'Kit Co-ordinator',
        telephoneNumber: '07432079000',
        emailAddress: 'jackfoalle1994@yahoo.co.uk',
      },
    ],
  }),

  head: () => ({
    title: 'Club Committee',
  }),
}
</script>
