<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching the selected player. This likely means you do not have access to this player.
    </div>
    <div v-else>
      <h4>Player Management - {{ player.full_name }}</h4>

      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(updatePlayer)">
          <table class="w-full border-collapse md:w-1/2">
            <tbody>
              <tr>
                <th class="text-left p-2">First Name<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="player.first_name"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Middle Name(s)</th>
                <td class="p-2">
                  <FormElement v-model="player.middle_names" />
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
                      v-model="player.last_name"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Date of Birth<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|is_date"
                    tag="div"
                  >
                    <FormElement
                      v-model="player.date_of_birth"
                      field-type="date"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Sex<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormSelect
                      :options="sexes"
                      v-model="player.sex"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Medical Condition(s)<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <FormElement
                      v-model="player.medical_conditions"
                      field-type="textarea"
                      :invalid="errors.length > 0"
                      required
                    />
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Gift Aid Opt-In<span class="text-danger ml-0.5">*</span></th>
                <td class="p-2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    tag="div"
                  >
                    <input type="checkbox" v-model="player.gift_aid_declaration_accepted">
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Identity Verification Photo</th>
                <td
                  v-if="player.identity_verification_photo"
                  class="p-2"
                >
                  <FontAwesomeIcon :icon="['fal', 'check']" />
                </td>
                <td
                  v-else
                  class="p-2"
                >
                  <ValidationProvider
                    v-slot="{ errors, validate }"
                    rules="required|image"
                    tag="div"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref="identityVerificationPhotoNew"
                      required
                      @change="validate"
                    >
                    <div class="text-xs italic text-grey-600 mt-1">
                      <FontAwesomeIcon :icon="['fad', 'circle-info']" />
                      Please provide a passport style photo of your child
                    </div>
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Age Verification Photo</th>
                <td
                  v-if="player.age_verification_photo"
                  class="p-2"
                >
                  <FontAwesomeIcon :icon="['fal', 'check']" />
                </td>
                <td
                  v-else
                  class="p-2"
                >
                  <ValidationProvider
                    v-slot="{ errors, validate }"
                    rules="required|image"
                    tag="div"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref="ageVerificationPhotoNew"
                      required
                      @change="validate"
                    >
                    <div class="text-xs italic text-grey-600 mt-1">
                      <FontAwesomeIcon :icon="['fad', 'circle-info']" />
                      Please provide a picture of your child's passport or birth certificate
                    </div>
                    <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
                  </ValidationProvider>
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Registered</th>
                <td class="p-2">{{ player.created_at | formatDate('dd/MM/yyyy - HH:mm') }}</td>
              </tr>
              <tr>
                <th class="text-left p-2">Last Updated</th>
                <td class="p-2">{{ player.updated_at | formatDate('dd/MM/yyyy - HH:mm') }}</td>
              </tr>
              <tr>
                <td class="text-left p-2">&nbsp;</td>
                <td>
                  <button
                    type="submit"
                    :disabled="invalid || updatingPlayer"
                    class="
                      mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
                      hover:bg-black hover:text-white
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
                    "
                  >
                    {{ updatePlayerButtonLabel }}
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
  name: 'PagePortalPlayersId',

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
    player: null,
    sexes: [
      { key: 'male', value: 'Male' },
      { key: 'female', value: 'Female' },
    ],
    updatingPlayer: false,
  }),

  async fetch () {
    const { data: { data: player } } = await this.$axios.get(`/api/club/players/${this.$nuxt.context.params.id}`)
    this.player = player
  },

  computed: {
    updatePlayerButtonLabel() {
      return this.updatingPlayer
        ? 'Please wait...'
        : 'Update Player'
    },
  },

  methods: {
    async updatePlayer() {
      this.updatingPlayer = true;

      const playerForm = new window.FormData();

      playerForm.append('firstName', this.player.first_name);
      if (this.player.middle_names != null) {
        playerForm.append('middleNames', this.player.middle_names);
      }
      playerForm.append('lastName', this.player.last_name);
      playerForm.append('dateOfBirth', this.player.date_of_birth);
      playerForm.append('sex', this.player.sex);
      playerForm.append('medicalConditions', this.player.medical_conditions);
      playerForm.append('giftAidDeclarationAccepted', this.player.gift_aid_declaration_accepted);

      if (this.$refs.identityVerificationPhotoNew) {
        playerForm.append('identityVerificationPhoto', this.$refs.identityVerificationPhotoNew.files[0]);
      }

      if (this.$refs.ageVerificationPhotoNew) {
        playerForm.append('ageVerificationPhoto', this.$refs.ageVerificationPhotoNew.files[0]);
      }

      const { data: { data: player } } = await this.$axios.patch(`/api/club/players/${this.player.id}`, playerForm);

      this.$set(this, 'player', player);

      this.$store.dispatch('notifications/add', {
        type: 'success',
        title: 'Success',
        text: 'Player updated successfully!',
      });

      this.updatingPlayer = false;
    },
  },
}
</script>
