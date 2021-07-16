<template>
  <div>
    <template v-if="!$auth.loggedIn">
      <h1>Login</h1>
      <p class="pb-4">Log in to your Newcastle City Juniors account to manage your players, subscriptions, and more!</p>
      <p class="pb-4">Forgot your password? <NuxtLink to="/forgot-password">Reset it here</NuxtLink></p>
      <p>Don't have an account yet? <NuxtLink to="/register">Create one here</NuxtLink></p>

      <form
        class="mt-16 md:max-w-lg"
        @submit.prevent="login()"
      >
        <FormElement
          class="mb-4"
          label="Email Address"
          field-type="email"
          v-model="email"
        />
        <FormElement
          label="Password"
          field-type="password"
          v-model="password"
        />
        <button
          :disabled="!canLogin || loggingIn"
          class="
            mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
            hover:bg-black hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
          "
          @click="login()"
        >
          {{ loginButtonLabel }}
        </button>

        <p
          class="mt-4 text-danger"
          v-if="loginError"
        >
          {{ loginError }}
        </p>
      </form>
    </template>
    <div v-else>
      <p>You are already logged in! <NuxtLink to="/portal">Proceed to NCJ Portal</NuxtLink></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',

  scrollToTop: true,

  components: {
    FormElement: () => import('@/components/elements/forms/FormElement.vue'),
  },

  data: () => ({
    email: '',
    password: '',
    loggingIn: false,
    loginError: null,
  }),

  computed: {
    /** @returns {boolean} */
    canLogin() {
      return this.isValidEmailAddress && this.password.length >= 8
    },
    /** @returns {string} */
    loginButtonLabel() {
      return this.loggingIn
        ? 'Logging in...'
        : 'Login'
    },
    /** @returns {boolean} */
    isValidEmailAddress() {
      return /^.+@.+\..+$/.test(this.email)
    },
  },

  methods: {
    async login() {
      this.loginError = null;
      this.loggingIn = true;

      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (error) {
        this.loginError = error?.response?.data?.message || 'Invalid username and/or password, or email address has not yet been verified. Please try again.'
      } finally {
        this.loggingIn = false
      }
    },
  },
}
</script>
