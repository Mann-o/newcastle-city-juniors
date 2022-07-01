<template>
  <div>
    Coming soon!
    <!-- <p>Please note that updating your email address here will only affect the email address you use to log in to the NCJ Portal. It <strong>does not</strong> change the email address reflected on any of your registered parents/guardians.</p>

    <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h2>Update Email Address</h2>
        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <div v-if="$fetchState.pending">
            <Loader />
          </div>

          <div v-else-if="$fetchState.error">
            An error occurred fetching the authenticated user!
          </div>

          <form
            v-else
            class="w-full"
            @submit.prevent="handleSubmit(updateEmailAddress)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Email Address"
                field-type="email"
                help-text="This is the email address you will use to login with, please ensure it is valid!"
                v-model="emailForm.email"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>

            <button
              type="submit"
              :disabled="invalid || updatingEmailAddress"
              class="
                mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
              "
            >
              {{ updateEmailButtonLabel }}
            </button>
          </form>
        </ValidationObserver>
      </div>
      <div>
        <h2>Change Password</h2>
        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form
            class="w-full"
            @submit.prevent="handleSubmit(updatePassword)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8"
              tag="div"
              vid="oldPassword"
              class="mt-4"
            >
              <FormElement
                label="Old Password"
                field-type="password"
                v-model="passwordForm.oldPassword"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8|nonmatch:@oldPassword,Old Password"
              vid="newPassword"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="New Password"
                field-type="password"
                help-text="For security purposes, your password must contain at least 8 characters"
                v-model="passwordForm.newPassword"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|confirmed:@newPassword,New Password"
              tag="div"
              class="mt-4"
            >
              <FormElement
                label="Confirm New Password"
                field-type="password"
                v-model="passwordForm.newPasswordConfirmation"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>

            <button
              type="submit"
              :disabled="invalid || updatingPassword"
              class="
                mt-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                hover:bg-black hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
              "
            >
              {{ updatePasswordButtonLabel }}
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div> -->
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PagePortalAccount',

  scrollToTop: true,

  // components: {
  //   Loader: () => import('@/components/layout/Loader.vue'),
  //   FormElement: () => import('@/components/elements/forms/FormElement.vue'),
  //   FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
  //   ValidationObserver,
  //   ValidationProvider,
  // },

  // data: () => ({
  //   emailForm: {
  //     email: null,
  //   },
  //   updatingEmailAddress: false,
  //   passwordForm: {
  //     oldPassword: null,
  //     newPassword: null,
  //     newPasswordConfirmation: null,
  //   },
  //   updatingPassword: false,
  // }),

  // fetch() {
  //   this.emailForm.email = this.$auth.user[0].email
  // },

  // computed: {
  //   updateEmailButtonLabel() {
  //     return this.updatingEmailAddress
  //       ? 'Please wait...'
  //       : 'Update Email Address'
  //   },
  //   updatePasswordButtonLabel() {
  //     return this.updatingPassword
  //       ? 'Please wait...'
  //       : 'Update Password'
  //   },
  // },

  // methods: {
  //   updateEmailAddress() {
  //     this.updatingEmailAddress = true

  //     // update email

  //     setTimeout(() => {
  //       this.updatingEmailAddress = false
  //     }, 1000)

  //     // this.updatingEmailAddress = false
  //   },
  //   updatePassword() {
  //     this.updatingPassword = true

  //     // update email

  //     setTimeout(() => {
  //       this.updatingPassword = false
  //     }, 1000)

  //     // this.updatingPassword = false
  //   },
  // },
}
</script>
