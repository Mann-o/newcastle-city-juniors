<template>
  <div>
    <h1>Payment Success!</h1>
    <p class="mb-4">Your payment was successful. You should receive an email receipt shortly.</p>
    <p>For any problems or concerns</p>
  </div>
</template>

<script>
export default {
  name: 'PagePaymentSuccess',

  scrollToTop: true,

  head: () => ({
    title: 'Payment Success',
  }),
}
</script>
