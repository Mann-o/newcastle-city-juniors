<template>
  <div>
    <h1>Player of the Month || 🏅 </h1>

    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching this page!
    </div>

    <div v-else>
      <p class="pb-8">Congratulations to all players who were voted for October's Player of the Month 2021.</p>
      <p class="pb-8">We have 3x winners within the club which is divided up into 3 sections: mini soccer (u7-10s), 9-a-side (u11-12s) &amp; 11-a-side (U13s-16s).</p>
      <p class="pb-8">Each coach must put forward 1x nomination with reasoning for their players vote then the clubs non-coaching committee members review each vote and choose the winners for each section.</p>

      <div class="pb-8">
        <ul class="list-disc list-inside">
          <li>Mini Soccer - Louie U9s 👏</li>
          <li>9-a-side - Hudson U11s 👏</li>
          <li>11-a-side - Emanuel U13s 👏</li>
        </ul>
      </div>

      <div class="pb-8 grid md:grid-cols-3 gap-12">
        <img :src="playerOfTheMonth1.file.url" alt="Player of the Month - October 2021">
        <img :src="playerOfTheMonth2.file.url" alt="Player of the Month - October 2021">
        <img :src="playerOfTheMonth3.file.url" alt="Player of the Month - October 2021">
      </div>

      <p class="pb-8">Well done all players representing Newcastle City Juniors in October - it was an excellent month for the whole club.</p>
      <p>#TheFutureIsBlackAndWhite</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsPlayerOfTheMonthSep2021',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  scrollToTop: true,

  data: () => ({
    playerOfTheMonth1: null,
    playerOfTheMonth2: null,
    playerOfTheMonth3: null,
  }),

  async fetch () {
    this.playerOfTheMonth1 = await this.$contentful
      .getAsset('4NoG3MiM8FfoLSMLJGQYfw')
      .then(({ fields }) => fields)

    this.playerOfTheMonth2 = await this.$contentful
      .getAsset('1w2wq9VyWrOcL6Inw9dDsG')
      .then(({ fields }) => fields)

    this.playerOfTheMonth3 = await this.$contentful
      .getAsset('3PyAfQVzNlnsoXUZa5GMSN')
      .then(({ fields }) => fields)
  },
}
</script>
