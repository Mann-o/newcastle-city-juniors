<template>
  <div>
    <h1>Order Complete</h1>
    <p>Thank you for your order, it has been completed successfully.</p>
    <p>If you have ordered any digital products (e.g. you have ordered tickets to an event) then these will be sent to you by email.</p>
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
