<template>
  <div>
    <h1>NCJ Presentation - 2021-22 Season</h1>
    <p class="pb-8">Newcastle City Juniors Annual Club Presentation 2022 is being held on Saturday 18th June 2022 for all our members at our home ground here at Benwell.</p>
    <p class="pb-8">The event will be split into two sections with all our mini players (Development, Under 7s - Under 11s) attending in the afternoon session and all our junior players (Under 12s - Under 16s) attending our evening session.</p>

    <h2>Timetable</h2>
    <p class="font-bold">Development &amp; Mini (U7s-U11s)</p>
    <ul class="list-disc list-inside pb-4">
      <li>Doors Open: 12:00</li>
      <li>Presentation: 12:30 - 16:00</li>
    </ul>
    <p class="font-bold">Juniors (U12s - U16s)</p>
    <ul class="list-disc list-inside pb-8">
      <li>Doors Open: 17:00</li>
      <li>Presentation: 17:30 - 21:00</li>
    </ul>

    <p class="pb-8">Costs for our club presentation is £3.00 per person with ALL Newcastle City Juniors players receiving FREE entry. The event will be held inside the clubs sports hall which recently held 600 people for the Jobes Professional Boxing Night.</p>
    <p class="pb-8">There is a dress code for ALL players to adhere to which is white shirt, NCJ club tie, dress pants and shoes. Club ties can be purchased via the club for £6.00 on the weekend off Saturday 14th and Sunday 15th May 2022.</p>
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
