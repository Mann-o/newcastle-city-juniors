<template>
  <div>
    <h1>Chelsea Affiliation - Press</h1>
    <p class="mb-4">
      Newcastle City Juniors are proud to have affiliation with Premier League side Chelsea F.C. Founded in 1905, Chelsea are the first English club to have won all three major UEFA trophies.
    </p>
    <p>The recent affiliation has been featured in the press and you can read more about it at the links below!</p>

    <h2 class="mt-8">The Sun</h2>
    <div>
      <ExternalLink
        to="https://www.thesun.co.uk/sport/football/13684168/chelsea-british-clubs-transfer-policy/"
        show-external-icon
        regular
        no-opener
      >
        Chelsea plot to 'poach best young British talent' by linking up with clubs on rivals' doorsteps in new transfer policy
      </ExternalLink>
    </div>

    <h2 class="mt-8">Daily Mail</h2>
    <div>
      <div>
          <ExternalLink
          to="https://www.dailymail.co.uk/sport/football/article-9123817/Chelsea-plot-poach-North-East-talent.html"
          show-external-icon
          regular
          no-opener
        >
          REVEALED: Chelsea plot to poach top North East talent as they arrange affiliation with a leading junior club in Newcastle
        </ExternalLink>
      </div>
      <div>
        <ExternalLink
          to="https://www.dailymail.co.uk/sport/football/article-9128135/Newcastle-juniors-club-DEFENDS-tie-Chelsea-providing-young-talent.html"
          show-external-icon
          regular
          no-opener
        >
          Newcastle City Juniors defend Chelsea link, claiming the city 'needs as many professional clubs as possible'
        </ExternalLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsOpenSessions2021',

  components: {
    ExternalLink: () => import('@/components/elements/ExternalLink.vue'),
  },

  scrollToTop: true,

  data: () => ({
    pdf: null,
  }),

  async fetch () {
    this.pdf = await this.$contentful
      .getAsset('16gFUdqrld85f3tZK9oYzs')
      .then(({ fields }) => fields)
  },
}
</script>
