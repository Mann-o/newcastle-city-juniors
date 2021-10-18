<template>
  <div>
    <h1>News &amp; Events</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching this page!
    </div>
    <div v-else>
      <div class="grid gap-8 lg:grid-cols-5">
      <ArticleCard
          :image="trophyDayImage.file.url"
          title="Player of the Month - September"
          subtext="A special mention for Newcastle City Juniors' players who were voted Players of the Month in September"
          date="2021-10-10"
          link="/news-and-events/player-of-the-month-sep-2021"
        />
        <ArticleCard
          :image="trophyDayImage.file.url"
          title="Update on Presentation"
          subtext="An update to our Presentation 2020-21 Season following recent government announcements."
          date="2021-06-16"
          link="/news-and-events/presentation-2020-update"
        />
        <ArticleCard
          :image="trophyDayImage.file.url"
          title="Presentation For The 2020-21 Season"
          subtext="Newcastle City Juniors are happy to announce that tickets are now available for our Presentation 2020-21 Season!"
          date="2021-06-01"
          link="/news-and-events/presentation-2020"
        />
        <ArticleCard
          :image="trialsImage.file.url"
          title="Open Sessions For The 2021-22 Season"
          subtext="Newcastle City Juniors are looking to increase player participation for the new 2021-22 season. Teams from U7-U16s!"
          date="2021-05-29"
          link="/news-and-events/open-sessions-2021"
        />
        <ArticleCard
          :image="chelseaAffiliationImage.file.url"
          title="Chelsea Affiliation - NCJ In The Press"
          subtext="Newcastle City Juniors are proud to have affiliation with Premier League side Chelsea F.C."
          date="2021-05-26"
          link="/news-and-events/chelsea-affiliation"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsIndex',

  components: {
    ArticleCard: () => import('@/components/news-and-events/ArticleCard.vue'),
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    trophyDayImage: null,
    trialsImage: null,
    chelseaAffiliationImage: null,
  }),

  async fetch () {
    this.playerOfTheMonthImage = await this.$contentful
      .getAsset('7Dya7gNCI1Ee13UGNBNCLv')
      .then(({ fields }) => fields)

    this.trophyDayImage = await this.$contentful
      .getAsset('w3jYwjcaD4gbOBvu64ofK')
      .then(({ fields }) => fields)

    this.trialsImage = await this.$contentful
      .getAsset('6FvoPFM2LjGDy9fnRqLVJO')
      .then(({ fields }) => fields)

    this.chelseaAffiliationImage = await this.$contentful
      .getAsset('2QhFvavHXWgOSv90Pt0vNY')
      .then(({ fields }) => fields)
  },
}
</script>
