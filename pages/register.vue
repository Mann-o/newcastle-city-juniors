<template>
  <div>
    <h1>Register</h1>
    <template v-if="!$auth.loggedIn">
      <template v-if="!registered">
        <p class="pb-4">Already registered? <NuxtLink to="/login">Login here</NuxtLink>!</p>
        <p class="pb-4">Thank you for your interest in registering your child with Newcastle City Juniors! To get started please complete the following form to create an NCJ Portal account where you will then be able to register individual players, manage their subscriptions, and more!</p>
        <p><strong>All fields are required.</strong> This form is to grant you access to the NCJ Portal so please complete this form with your OWN details - not your child! You will be able to register your child once you have verified your email address and logged into the <NuxtLink to="/portal">NCJ Portal</NuxtLink>.</p>


        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form
            @submit.prevent="handleSubmit(register)"
            class="mt-16 md:max-w-lg"
          >
            <h4>Parent/Guardian 1</h4>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="selectedTitle"
              tag="div"
            >
              <FormSelect
                label="Title"
                :options="titles"
                v-model="selectedTitle"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-if="selectedTitle === 'other'"
              v-slot="{ errors }"
              rules="required_if:title,other"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Enter Alternative Title"
                v-model="otherTitle"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="First Name"
                v-model="form.firstName"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Last Name"
                v-model="form.lastName"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="House Number / Name"
                v-model="form.houseNameOrNumber"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Postcode"
                v-model="form.postcode"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Mobile Number"
                v-model="form.mobileNumber"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
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
                v-model="form.email"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email|confirmed:email"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Confirm Email Address"
                field-type="email"
                v-model="form.emailConfirmation"
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
                label="Choose a password"
                field-type="password"
                v-model="form.password"
                help-text="For security purposes, your password must contain at least 8 characters"
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
                label="Confirm password"
                field-type="password"
                v-model="form.passwordConfirmation"
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="mt-4"
              vid="additionalParentOrGuardian"
            >
              <FormCheckbox
                label="Do you wish to add an extra parent/guardian?"
                v-model="form.additionalParentOrGuardian"
              />
            </ValidationProvider>
            <template v-if="form.additionalParentOrGuardian">
              <h4 class="mt-8">Parent/Guardian 2</h4>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
                class="mt-4"
                vid="selectedAlternateTitle"
              >
                <FormSelect
                  label="Title"
                  :options="titles"
                  v-model="selectedAlternateTitle"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-if="selectedAlternateTitle === 'other'"
                v-slot="{ errors }"
                rules="required_if:selectedAlternateTitle,other"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="Enter Alternative Title"
                  v-model="otherAlternateTitle"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="First Name"
                  v-model="form.alternateFirstName"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="Last Name"
                  v-model="form.alternateLastName"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="House Number / Name"
                  v-model="form.alternateHouseNameOrNumber"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="Postcode"
                  v-model="form.alternatePostcode"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="Mobile Number"
                  v-model="form.alternateMobileNumber"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                tag="div"
                class="mt-4"
              >
                <FormElement
                  label="Email Address"
                  field-type="email"
                  v-model="form.alternateEmail"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </template>
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

            <p v-if="registerError">{{ registerError }}</p>
          </form>

        </ValidationObserver>
      </template>
      <template v-else>
        <p class="pb-4">Registration was successful. You should soon receive an email asking you to verify your email address - you must do so before being able to login to the NCJ portal and register a player.</p>
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
    FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
    FormCheckbox: () => import('@/components/elements/forms/FormCheckbox.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    titles: [
      { key: 'mr', value: 'Mr' },
      { key: 'mrs', value: 'Mrs' },
      { key: 'mrs', value: 'Ms' },
      { key: 'miss', value: 'Miss' },
      { key: 'other', value: 'Other (enter manually)' },
    ],
    selectedTitle: '',
    otherTitle: '',
    selectedAlternateTitle: '',
    otherAlternateTitle: '',
    form: {
      title: '',
      firstName: '',
      lastName: '',
      houseNameOrNumber: '',
      postcode: '',
      mobileNumber: '',
      email: '',
      emailConfirmation: '',
      password: '',
      passwordConfirmation: '',
      additionalParentOrGuardian: false,
      alternateTitle: '',
      alternateFirstName: '',
      alternateLastName: '',
      alternateHouseNameOrNumber: '',
      alternatePostcode: '',
      alternateMobileNumber: '',
      alternateEmail: '',
    },
    registering: false,
    registerError: null,
    registered: false,
  }),

  computed: {
    registerButtonLabel() {
      return this.registering
        ? 'Registering...'
        : 'Register'
    },
  },

  methods: {
    resetTitleFields() {
      this.form.title = ''

      if (this.form.additionalParentOrGuardian) {
        this.form.alternateTitle = '';
      }
    },
    async register() {
      this.registerError = null;
      this.registering = true;

      try {
        this.form.title = this.selectedTitle === 'other'
          ? this.otherTitle
          : this.titles.find(({ key }) => key === this.selectedTitle).value

        if (this.form.additionalParentOrGuardian) {
          this.form.alternateTitle = this.selectedAlternateTitle === 'other'
            ? this.otherAlternateTitle
            : this.titles.find(({ key }) => key === this.selectedAlternateTitle).value
        }

        const formToSubmit = Object
          .entries(this.form)
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
      } catch {
        this.resetTitleFields()

        this.registerError = 'Unable to register'
      } finally {
        this.registering = false
      }
    },
  },

  mounted() {
    this.selectedTitle = this.titles[0].key
    this.selectedAlternateTitle = this.titles[0].key
  },
}
</script>
