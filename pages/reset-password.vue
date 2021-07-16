<template>
  <div>
    <h1>Reset Password</h1>
    <template v-if="!reset">
      <p class="pb-4">Thank you for your request to reset your password for account: <strong>{{ $route.query.email }}</strong></p>
      <p>Please choose a new password below:</p>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form
          @submit.prevent="handleSubmit(resetPassword)"
          class="mt-12 md:max-w-lg"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:8"
            vid="password"
            tag="div"
          >
            <FormElement
              label="New Password"
              field-type="password"
              v-model="form.newPassword"
              :invalid="errors.length > 0"
            />
            <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:8|confirmed:password"
            tag="div"
            class="mt-4"
          >
            <FormElement
              label="Confirm New Password"
              field-type="password"
              v-model="form.newPasswordConfirmation"
              :invalid="errors.length > 0"
            />
            <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
          </ValidationProvider>
          <button
            type="submit"
            :disabled="invalid || resetting"
            class="
              mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
              hover:bg-black hover:text-white
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
            "
          >
            {{ resetPasswordButtonLabel }}
          </button>

          <p
            v-if="resetError"
            class="mt-4 text-danger"
          >
            {{ resetError }}
          </p>
        </form>
      </ValidationObserver>
    </template>
    <template v-else>
      <p class="pb-4">Your password has been reset successfully. You may now proceed to <NuxtLink to="/login">login</NuxtLink>.</p>
    </template>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PageResetPassword',

  scrollToTop: true,

  components: {
    FormElement: () => import('@/components/elements/forms/FormElement.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  validate({ query }) {
    return query.email != null && query.token != null
  },

  data: () => ({
    form: {
      email: '',
      resetToken: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    resetting: false,
    resetError: null,
    reset: false,
  }),

  computed: {
    resetPasswordButtonLabel() {
      return this.resetting
        ? 'Resetting Password...'
        : 'Reset Password'
    },
  },

  methods: {
    async resetPassword() {
      this.resetError = null;
      this.resetting = true;

      try {
        const { data: { code: responseCode } } = await this.$axios.post('/api/auth/password-reset/finish', this.form)

        if (responseCode !== 200) {
          throw new Error('Unable to reset password')
        }

        this.reset = true

        window.scrollTo(0, 0)
      } catch {
        this.resetError = 'Unable to reset password'
      } finally {
        this.resetting = false
      }
    },
  },

  mounted() {
    this.form.email = this.$route.query.email
    this.form.resetToken = this.$route.query.token
  },
}
</script>
