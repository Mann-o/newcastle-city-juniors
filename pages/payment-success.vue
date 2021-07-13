<template>
  <div>
    <h1>Payment Success</h1>
    <p>Your payment was successful. Your tickets will be emailed you shortly!</p>
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
