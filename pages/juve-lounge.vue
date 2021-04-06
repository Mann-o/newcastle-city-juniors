<template>
  <div>
    <h1>Juve Lounge</h1>
    <JuveLogo />
    <p>We now have a full alcohol premises license! The room can be tailored to your requirements and holds up to 150 people. Our professional packages can cater for funeral wakes (we're just 0.6 miles from Newcastle Crematorium, West Road), birthdays, engagements, weddings and any other upcoming events.</p>
    <p>Contact Steve or Debbie on 07376921926 for more information and to check our availability.</p>
  </div>
</template>

<script>
export default {
  name: 'PageJuveLounge',

  components: {
    JuveLogo: () => import('@/components/JuveLogo.vue'),
  },

  head: () => ({
    title: 'Juve Lounge',
  }),
}
</script>
