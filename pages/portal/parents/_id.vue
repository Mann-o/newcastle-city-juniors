<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching the selected parent. This likely means you do not have access to this parent.
    </div>
    <div v-else>
      <h4>Parent Management - {{ parent.full_name }}</h4>

      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(updateParent)">
          <table class="w-full border-collapse md:w-1/2">
            <tbody>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Title<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    vid="parentTitle"
                    tag="div"
                  >
                    <FormSelect
                      :options="titles"
                      v-model="parent.title"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr v-if="parent.title === 'other'">
                <th class="text-left p-2 whitespace-nowrap">Other Title<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required_if:parentTitle,other"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.other_title"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">First Name<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.first_name"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Middle Name(s)</th>
                <td class="p-2">
                  <FormElement v-model="parent.middle_names" />
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Last Name<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.last_name"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Date of Birth<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|is_date"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.date_of_birth"
                      field-type="date"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap align-top">Email Address</th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|email"
                    tag="div"
                  >
                    <FormElement
                      field-type="email"
                      help-text="The FA has introduced strict guidance requesting that parent / guardian email addresses contain their current first and last name (e.g. no maiden names) - please try to provide an email address that matches this requirement!"
                      v-model="parent.email"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap align-top">Mobile Number</th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.mobile_number"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Address Line 1<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.address_line_one"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Address Line 2</th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.address_line_two"
                      :invalid="errors.length > 0"
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Address Line 3</th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.address_line_three"
                      :invalid="errors.length > 0"
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Address Line 4</th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.address_line_four"
                      :invalid="errors.length > 0"
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Address Line 5</th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.address_line_five"
                      :invalid="errors.length > 0"
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Postal Code<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="parent.postal_code"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Registered</th>
                <td class="p-2">{{ parent.created_at | formatDate('dd/MM/yyyy - HH:mm') }}</td>
              </tr>
              <tr>
                <th class="text-left p-2 whitespace-nowrap">Last Updated</th>
                <td class="p-2">{{ parent.updated_at | formatDate('dd/MM/yyyy - HH:mm') }}</td>
              </tr>
              <tr>
                <td class="text-left p-2 whitespace-nowrap">&nbsp;</td>
                <td>
                  <button
                    type="submit"
                    :disabled="invalid || updatingParent"
                    class="
                      mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                      hover:bg-black hover:text-white
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
                    "
                  >
                    {{ updateParentButtonLabel }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PagePortalParentsId',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
    FormElement: () => import('@/components/elements/forms/FormElement.vue'),
    FormSelect: () => import('@/components/elements/forms/FormSelect.vue'),
    FormCheckbox: () => import('@/components/elements/forms/FormCheckbox.vue'),
    ValidationObserver,
    ValidationProvider,
  },

  scrollToTop: true,

  data: () => ({
    parent: null,
    updatingParent: false,
    titles: [
      { key: 'mr', value: 'Mr' },
      { key: 'mrs', value: 'Mrs' },
      { key: 'miss', value: 'Miss' },
      { key: 'ms', value: 'Ms' },
      { key: 'other', value: 'Other' },
    ],
  }),

  async fetch () {
    const { data: { data: parent } } = await this.$axios.get(`/api/club/parents/${this.$nuxt.context.params.id}`)
    this.parent = parent
  },

  computed: {
    updateParentButtonLabel() {
      return this.updatingParent
        ? 'Please wait...'
        : 'Update Parent/Guardian'
    },
  },

  methods: {
    async updateParent() {
      this.updatingParent = true;

      const parentForm = new window.FormData();

      parentForm.append('title', this.parent.title)
      if (this.parent.title === 'other') {
        parentForm.append('otherTitle', this.parent.other_title);
      }

      parentForm.append('firstName', this.parent.first_name);
      if (this.parent.middle_names != null && this.parent.middle_names !== '') {
        parentForm.append('middleNames', this.parent.middle_names);
      }
      parentForm.append('lastName', this.parent.last_name);
      parentForm.append('dateOfBirth', this.parent.date_of_birth);
      parentForm.append('email', this.parent.email);
      parentForm.append('mobileNumber', this.parent.mobile_number);
      parentForm.append('addressLineOne', this.parent.address_line_one);
      if (this.parent.address_line_two != null && this.parent.address_line_two !== '') {
        parentForm.append('addressLineTwo', this.parent.address_line_two);
      }
      if (this.parent.address_line_three != null && this.parent.address_line_three !== '') {
        parentForm.append('addressLineThree', this.parent.address_line_three);
      }
      if (this.parent.address_line_four != null && this.parent.address_line_four !== '') {
        parentForm.append('addressLineFour', this.parent.address_line_four);
      }
      if (this.parent.address_line_five != null && this.parent.address_line_five !== '') {
        parentForm.append('addressLineFive', this.parent.address_line_five);
      }
      parentForm.append('postalCode', this.parent.postal_code);

      const { data: { data: parent } } = await this.$axios.patch(`/api/club/parents/${this.parent.id}`, parentForm);

      this.$set(this, 'parent', parent);

      this.$store.dispatch('notifications/add', {
        type: 'success',
        title: 'Success',
        text: 'Parent/Guardian updated successfully!',
      });

      this.updatingParent = false;
    },
  },
}
</script>
