<template>
  <div>
    <h1>Forgot Password</h1>
    <template v-if="!reset">
      <p>Forgotten your password to the NCJ Portal? Simply enter your email address below to receive a link via email to reset your password.</p>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form
          @submit.prevent="handleSubmit(resetPassword)"
          class="mt-12 md:max-w-lg"
        >
          <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              vid="email"
              tag="div"
            >
              <FormElement
                label="Email Address"
                field-type="email"
                v-model="form.email"
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
      <p class="pb-4">Your password reset request has been received. If you have an account with us, you should soon receive an email containing a link to reset your password.</p>
      <p>If the email does not arrive, please check your spam/junk folder. If you have still not received the email within a few hours please email us at <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> using the email address you registered with and we will investigate further.</p>
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

  data: () => ({
    form: {
      email: '',
    },
    resetting: false,
    resetError: null,
    reset: false,
  }),

  computed: {
    resetPasswordButtonLabel() {
      return this.resetting
        ? 'Processing...'
        : 'Reset Password'
    },
  },

  methods: {
    async resetPassword() {
      this.resetError = null;
      this.resetting = true;

      try {
        const { data: { code: responseCode } } = await this.$axios.post('/api/auth/password-reset/start', this.form)

        if (responseCode !== 200) {
          throw new Error('Unable to handle password reset request')
        }

        this.reset = true

        window.scrollTo(0, 0)
      } catch {
        this.resetError = 'Unable to handle password reset request'
      } finally {
        this.resetting = false
      }
    },
  },
}
</script>
