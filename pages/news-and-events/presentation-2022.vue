<template>
  <div>
    <h1>NCJ Presentation - 2022-23 Season</h1>
    <p class="pb-8">Newcastle City Juniors Annual Club Presentation 2022 is been held on Friday 2nd June 2023 for all our members at The Fed, Lancaster Rd, Dunston, Gateshead, NE11 9JR.</p>
    <p class="pb-8">The event will be for all our teams (Under 7s-Under 16s) and our Friday Development Centre children (3-7 years). Doors will open from 6pm with a prompt 7pm start.</p>
    <p class="pb-8">Costs for our club presentation is £5.00 per person with ALL Newcastle City Juniors players having FREE entry.</p>
    <p class="pb-8">There is a dress code for ALL players to adhere to which is: white shirt, NCJ club tie, dress pants and shoes. Club ties can be purchased via the club directly for £6.00.</p>
    <p class="pb-8">If you have any questions about our Presentation please contact your child's team coach.</p>
    <p>Please click the link below to purchase your ticket(s) and provide the information requested at checkout. You will receive email confirmation of your purchased ticket(s).</p>

    <button
      class="
        mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
        hover:bg-black hover:text-white
      "
      @click="$router.push('/shop')"
    >
      Visit Online Club Shop
    </button>
  </div>
</template>

<script>
export default {
  name: 'PageNewsAndEventsPresentation2022',

  scrollToTop: true,
}
</script>
