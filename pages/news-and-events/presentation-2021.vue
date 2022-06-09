<template>
  <div>
    <h1>NCJ Presentation - 2021-22 Season</h1>
    <p class="pb-8">Newcastle City Juniors Annual Club Presentation 2022 is being held on Friday 17th June 2022 for all our members at the Federation Brewery, Dunston, Gateshead.</p>
    <p class="pb-8">All age groups will attend the same session time below:</p>

    <h2>Timetable</h2>
    <p class="pb-8"><strong>Doors Open:</strong> 18:00</p>
    <p class="pb-8"><strong>Presentation Start:</strong> 19:00</p>

    <p class="pb-8">Costs for our club presentation is £3.00 per person with ALL Newcastle City Juniors players receiving FREE entry.</p>
    <p class="pb-8">There is a dress code for ALL players to adhere to which is white shirt, NCJ club tie, dress pants and shoes. Club ties can be purchased via the club for £6.00 on the weekend of Saturday 14th and Sunday 15th May 2022.</p>
    <p class="pb-8">Visitor and player tickets to the event can be purchased in our new online Club Shop. Once purchased you will receive an email containing a QR code that acts as your tickets to the event. Please bring this email with you and present it on arrival.</p>
    <p>If you have any questions about our Presentation please contact your child's team coach.</p>

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
