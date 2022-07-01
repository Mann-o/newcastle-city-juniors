<template>
  <div>
    <h1>Reset Password - Cancellation</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      <p class="mb-4">An error occurred whilst cancelling the password reset request. Please reach out to us at <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> and we will manually cancel the password reset request for you.</p>
    </div>
    <div v-else>
      <p>The password reset request has been successfully cancelled. If you did not request this password reset you may wish to reach out to us <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> to let us know.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCancelResetPassword',

  scrollToTop: true,

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  validate({ query }) {
    return query.email != null && query.token != null
  },

  async fetch () {
    const { data } = await this.$axios.post('/api/auth/password-reset/cancel', {
      email: this.$nuxt.context.route.query.email,
      resetToken: this.$nuxt.context.route.query.token,
    })

    this.data = data
  },

  data: () => ({
    data: null,
  }),
}
</script>
