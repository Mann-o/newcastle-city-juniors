<template>
  <div>
    <h1>Register</h1>
    <template v-if="!$auth.loggedIn">
      <template v-if="!registered">
        <p class="pb-4">Registering for an NCJ Portal account is quick and easy. Simply enter your email address, choose a password, and then you are ready to start registering your child and managing their subscription!</p>
        <p class="pb-4 text-danger font-bold">Please only register to the NCJ Portal if an NCJ coach has asked you to do so. Our teams are now full and we do not accept open player registrations. Any registrations received for children who were not told to do so by an NCJ coach will be removed from the system.</p>
        <p>Already registered? <NuxtLink to="/login">Login here</NuxtLink>!</p>

        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form
            @submit.prevent="handleSubmit(register)"
            class="mt-16 md:max-w-lg"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              vid="email"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Email Address"
                field-type="email"
                help-text="This is the email address you will use to login with, and where you will receive an email with a link to verify your email address. Please ensure it is valid!"
                v-model="registerForm.email"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8"
              vid="password"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Password"
                field-type="password"
                v-model="registerForm.password"
                help-text="For security purposes, your password must contain at least 8 characters"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|confirmed:@password,Password"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Confirm password"
                field-type="password"
                v-model="registerForm.passwordConfirmation"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <button
              type="submit"
              :disabled="invalid || registering"
              class="
                mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
              "
            >
              {{ registerButtonLabel }}
            </button>

            <p
              class="text-danger font-bold mt-8"
              v-if="registerError"
            >
              {{ registerError }}
            </p>
          </form>

        </ValidationObserver>
      </template>
      <template v-else>
        <p class="pb-4">Registration was successful. You should soon receive an email asking you to verify your email address - you must do so before you are able to log in to the NCJ portal and register a child.</p>
        <p>If the email does not arrive, please check your spam/junk folder. If you have still not received the email within a few hours please email us at <a href="mailto:info@newcastlecityjuniors.co.uk">info@newcastlecityjuniors.co.uk</a> using the email address you registered with and we will investigate further.</p>
      </template>
    </template>
    <div v-else>
      <p>You are already logged in! <NuxtLink to="/portal">Proceed to NCJ Portal</NuxtLink></p>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PageRegister',

  scrollToTop: true,

  components: {
    FormElement: () => import('@/components/elements/forms/FormElement.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    registerForm: {
      email: null,
      password: null,
      passwordConfirmation: null,
    },
    registering: false,
    registerError: null,
    registered: false,
  }),

  computed: {
    registerButtonLabel() {
      return this.registering
        ? 'Please wait...'
        : 'Register'
    },
  },

  methods: {
    async register() {
      this.registerError = null;
      this.registering = true;

      try {
        const formToSubmit = Object
          .entries(this.registerForm)
          .reduce((acc, [key, value]) => {
            if (value != null && value !== '') {
              acc[key] = value
            }
            return acc
          }, {})

        const { data: { code: responseCode } } = await this.$axios.post('/api/auth/register', formToSubmit)

        if (responseCode !== 200) {
          throw new Error('Unable to register')
        }

        this.registered = true

        window.scrollTo(0, 0)
      } catch(error) {
        console.log(error);
        this.registerError = 'Unable to register'
      } finally {
        this.registering = false
      }
    },
  },
}
</script>
