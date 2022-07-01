<template>
  <div>
    <p class="mb-6">In order to register a child with our club, we must first ask that you register a parent or guardian below.</p>
    <p class="mb-6">All of the information requested is required in order for us to register your child as a Newcastle City Juniors player with the FA.</p>

    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form
        @submit.prevent="handleSubmit(register)"
        class="mt-16 md:max-w-lg"
      >
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          vid="parentTitle"
          tag="div"
        >
          <FormSelect
            label="Title"
            :options="titles"
            v-model="parentForm.title"
            :invalid="errors.length > 0"
            required
          />
          <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          v-if="parentForm.title === 'other'"
          v-slot="{ errors }"
          rules="required_if:parentTitle,other"
          tag="div"
          class="mt-4"
        >
          <FormElement
            label="Other Title"
            v-model="parentForm.otherTitle"
            :invalid="errors.length > 0"
            required
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
            v-model="parentForm.firstName"
            :invalid="errors.length > 0"
            required
          />
          <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="mt-4">
          <FormElement
            label="Middle Name(s)"
            v-model="parentForm.middleNames"
          />
        </div>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          tag="div"
          class="mt-4"
        >
          <FormElement
            label="Last Name"
            v-model="parentForm.lastName"
            :invalid="errors.length > 0"
            required
          />
          <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="mt-4"
          v-slot="{ errors }"
          rules="required|is_date"
          tag="div"
        >
          <FormElement
            label="Date of Birth"
            v-model="parentForm.dateOfBirth"
            field-type="date"
            :invalid="errors.length > 0"
            required
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
            help-text="The FA has introduced strict guidance requesting that parent / guardian email addresses contain their current first and last name (e.g. no maiden names) - please try to provide an email address that matches this requirement!"
            v-model="parentForm.email"
            :invalid="errors.length > 0"
            required
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
            v-model="parentForm.mobileNumber"
            :invalid="errors.length > 0"
            required
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
            label="Address Line 1"
            v-model="parentForm.addressLineOne"
            :invalid="errors.length > 0"
            required
          />
          <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="mt-4">
          <FormElement
            label="Address Line 2"
            v-model="parentForm.addressLineTwo"
          />
        </div>
        <div class="mt-4">
          <FormElement
            label="Address Line 3"
            v-model="parentForm.addressLineThree"
          />
        </div>
        <div class="mt-4">
          <FormElement
            label="Address Line 4"
            v-model="parentForm.addressLineFour"
          />
        </div>
        <div class="mt-4">
          <FormElement
            label="Address Line 5"
            v-model="parentForm.addressLineFive"
          />
        </div>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          tag="div"
          class="mt-4"
        >
          <FormElement
            label="Postal Code"
            v-model="parentForm.postalCode"
            :invalid="errors.length > 0"
            required
          />
          <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          rules="is_true"
          v-slot="{ errors }"
          tag="div"
        >
          <label class="block text-sm font-bold mt-4">
            Code of Conduct
          </label>
          <span
            class="underline text-sm my-2 inline-block cursor-pointer"
            @click="showCodeOfConductModal()"
          >
            View: Code of Conduct - Spectators, Parents and Carers
          </span>
          <div
            class="flex items-center cursor-pointer border p-4 transition-colors mt-1"
            :class="{
              'border-danger': !parentForm.acceptedCodeOfConduct,
              'border-success': parentForm.acceptedCodeOfConduct,
              'bg-success-bg': parentForm.acceptedCodeOfConduct,
            }"
            @click="toggleCodeOfConductAcceptance()"
          >
            <input type="checkbox" name="accepted-code-of-conduct" v-model="parentForm.acceptedCodeOfConduct">
            <p class="ml-4 text-sm">By ticking this box, I am confirming that the parent or guardian being registered has read and agreed to adhere to the <strong>Code of Conduct - Spectators, Parents and Carers</strong></p>
          </div>
          <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
        </ValidationProvider>

        <button
          type="submit"
          :disabled="invalid || registeringParent"
          class="
            mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
            hover:bg-black hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
          "
        >
          {{ registerButtonLabel }}
        </button>

        <!-- <p
          class="text-danger font-bold mt-8"
          v-if="registerError"
        >
          {{ registerError }}
        </p> -->
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PagePortalParentsRegister',

  scrollToTop: true,

  components: {
    FormElement: () => import('@/components/elements/forms/FormElement.vue'),
    FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    parentForm: {
      title: 'mr',
      otherTitle: null,
      firstName: null,
      middleNames: null,
      lastName: null,
      dateOfBirth: null,
      email: null,
      mobileNumber: null,
      addressLineOne: null,
      addressLineTwo: null,
      addressLineThree: null,
      addressLineFour: null,
      addressLineFive: null,
      postalCode: null,
      acceptedCodeOfConduct: false,
    },
    registeringParent: false,
    titles: [
      { key: 'mr', value: 'Mr' },
      { key: 'mrs', value: 'Mrs' },
      { key: 'miss', value: 'Miss' },
      { key: 'ms', value: 'Ms' },
      { key: 'other', value: 'Other' },
    ],
  }),

  methods: {
    toggleCodeOfConductAcceptance() {
      this.parentForm.acceptedCodeOfConduct = !this.parentForm.acceptedCodeOfConduct
    },
    showCodeOfConductModal() {
      console.log('showing...')
      this.$modal.show(() => import('@/components/modals/ParentCodeOfConductModal.vue'))
    },
    async register() {
      this.registerError = null;
      this.registeringParent = true;

      try {
        const { data: { code: responseCode } } = await this.$axios.post('/api/club/parents', this.parentForm)

        if (responseCode !== 200) {
          throw new Error('Unable to register')
        }

        this.$store.dispatch('notifications/add', {
          type: 'success',
          title: 'Success',
          text: 'Your parent or guardian was created successfully',
          sticky: true,
        })

        this.$router.push('/portal/parents');
      } catch (error) {
        this.$store.dispatch('notifications/add', {
          type: 'error',
          title: 'Error',
          text: 'We were unable to create the parent or guardian, please ensure the data is valid and try again',
          sticky: true,
        })
      } finally {
        this.registeringParent = false
      }
    },
  },

  computed: {
    registerButtonLabel() {
      return this.registeringParent
        ? 'Please wait...'
        : 'Register Parent / Guardian'
    },
  },
}
</script>

<!-- <div class="mt-8">
      <h4>Main Parent/Guardian</h4>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form
          class="md:max-w-lg"
          @submit.prevent="handleSubmit(updateMainCaregiver)"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            vid="mainCaregiverTitle"
            tag="div"
          >
            <FormSelect
              label="Title"
              :options="titles"
              v-model="mainCaregiver.title"
              :invalid="errors.length > 0"
            />
            <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            v-if="mainCaregiver.title === 'other'"
            v-slot="{ errors }"
            rules="required_if:mainCaregiverTitle,other"
            tag="div"
            class="mt-4"
          >
            <FormElement
              label="Alternative Title"
              v-model="mainCaregiver.otherTitle"
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
              v-model="mainCaregiver.email"
              :invalid="errors.length > 0"
            />
            <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>

    <div class="mt-8">
      <h4>Other Parent/Guardian</h4>
    </div> -->
