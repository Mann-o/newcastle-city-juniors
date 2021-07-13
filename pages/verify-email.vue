<template>
  <div>
    <h1>Email Verification</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      <p class="mb-4">An error occurred whilst verifying your email address. Usually this means your email address has already been verified.</p>
      <p>If your account is not showing your email address as verified, please reach out to us at <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> and we will manually verify your account for you.</p>
    </div>
    <div v-else>
      <p>Your email address has been successfully verified. You may now log in to the <NuxtLink to="/portal">NCJ Portal</NuxtLink> to regster your player, pay the registration fee and manage their subs!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageVerifyEmail',

  scrollToTop: true,

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  validate({ query }) {
    return query.email != null && query.token != null
  },

  async fetch () {
    const { data } = await this.$axios.post('/api/auth/verify-email', {
      email: this.$nuxt.context.route.query.email,
      verificationToken: this.$nuxt.context.route.query.token,
    })

    this.data = data
  },

  data: () => ({
    data: null,
  }),
}
</script>
