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
                  <input type="checkbox" v-model="player.gift_aid_declaration_accepted">
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Primary Team</th>
                <td class="p-2">
                  {{ primaryTeam }}
                </td>
              </tr>
              <tr>
                <th class="text-left p-2">Secondary Team</th>
                <td class="p-2">
                  {{ secondaryTeam }}
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
    ageGroups: [
      {
        key: 'u7',
        value: 'Under 7s',
        teams: {
          female: [
            { key: 'u7-saturday-lionesses', value: 'U7 Lionesses (Saturday) - Sarah Burn' },
            { key: 'u7-saturday-girls-atalanta', value: 'U7 Girls Atalanta (Saturday) - Mark Ferguson' },
          ],
          male: [
            { key: 'u7-saturday-inter', value: 'U7 Inter (Saturday) - Michael Parr' },
            { key: 'u7-saturday-juve', value: 'U7 Juve (Saturday) - Ben Scott' },
            { key: 'u7-saturday-milan', value: 'U7 Milan (Saturday) - Mickey Richards' },
            { key: 'u7-sunday-atalanta', value: 'U7 Atalanta (Sunday) - Charlie Loughlen' },
            { key: 'u7-sunday-inter', value: 'U7 Inter (Sunday) - Michael Parr' },
            { key: 'u7-sunday-juve', value: 'U7 Juve (Sunday) - Liam Moody' },
            { key: 'u7-sunday-milan', value: 'U7 Milan (Sunday) - Mickey Richards' },
            { key: 'u7-sunday-napoli', value: 'U7 Napoli (Sunday) - John Sullivan' },
          ],
        },
      },
      {
        key: 'u8',
        value: 'Under 8s',
        teams: {
          female: [
            { key: 'u8-saturday-lionesses', value: 'U8 Lionesses (Saturday) - Chloe Clifford' },
            { key: 'u8-sunday-lionesses', value: 'U8 Lionesses (Sunday) - David Bland' },
          ],
          male: [
            { key: 'u8-saturday', value: 'U8 (Saturday) - Rob Charlton' },
            { key: 'u8-sunday-inter', value: 'U8 Inter (Sunday) - Rob Charlton' },
            { key: 'u8-sunday-juve', value: 'U8 Juve (Sunday) - Matty Henry' },
            { key: 'u8-sunday-milan', value: 'U8 Milan (Sunday) - Matty Henry' },
            { key: 'u8-sunday-napoli', value: 'U8 Napoli (Sunday) - Carl Johnson' },
          ],
        },
      },
      {
        key: 'u9',
        value: 'Under 9s',
        teams: {
          female: [
            { key: 'u9-saturday-lionesses', value: 'U9 Lionesses (Saturday) - Stu Taylor' },
          ],
          male: [
            { key: 'u9-saturday', value: 'U9 (Saturday) - Matty Henry' },
            { key: 'u9-saturday-juve', value: 'U9 Juve (Saturday) - Alex Gray' },
            { key: 'u9-saturday-lazio', value: 'U9 Lazio (Saturday) - James Tolchard' },
            { key: 'u9-sunday-inter', value: 'U9 Inter (Sunday) - Matty Henry' },
            { key: 'u9-sunday-juve', value: 'U9 Juve (Sunday) - Alex Gray' },
            { key: 'u9-sunday-lazio', value: 'U9 Lazio (Sunday) - James Tolchard' },
            { key: 'u9-sunday-milan', value: 'U9 Milan (Sunday) - Jordan Holmes' },
          ],
        },
      },
      {
        key: 'u10',
        value: 'Under 10s',
        teams: {
          female: [
            { key: 'u10-saturday-atalanta', value: 'U10 Atalanta (Saturday) - Jordan Robertson' },
            { key: 'u10-saturday-lionesses', value: 'U10 Lionesses (Saturday) - Mark Hedley' },
            { key: 'u10-sunday-atalanta', value: 'U10 Atalanta (Sunday) - Joe Preston' },
            { key: 'u10-sunday-lionesses', value: 'U10 Lionesses (Sunday) - Mark Hedley' },
            { key: 'u10-sunday-pumas', value: 'U10 Pumas (Sunday) - Joe Preston' },
          ],
          male: [
            { key: 'u10-saturday-milan', value: 'U10 Milan (Saturday) - Mattie Thompson' },
            { key: 'u10-saturday-roma', value: 'U10 Roma (Saturday) - Chris Bush' },
            { key: 'u10-sunday-inter', value: 'U10 Inter (Sunday) - Darryl Faichen' },
            { key: 'u10-sunday-juve', value: 'U10 Juve (Sunday) - Stephen Welsh' },
            { key: 'u10-sunday-milan', value: 'U10 Milan (Sunday) - Joe Foalle' },
            { key: 'u10-sunday-napoli', value: 'U10 Napoli (Sunday) - Ray Armstrong' },
          ],
        },
      },
      {
        key: 'u11',
        value: 'Under 11s',
        teams: {
          female: [
            { key: 'u11-saturday-atalanta', value: 'U11 Atalanta (Saturday) - Stu Taylor' },
            { key: 'u11-saturday-lionesses', value: 'U11 Lionesses (Saturday) - Jordan Robertson' },
            { key: 'u11-sunday-atalanta', value: 'U11 Atalanta (Sunday) - Stu Taylor' },
            { key: 'u11-sunday-lionesses', value: 'U11 Lionesses (Sunday) - Leanne Marshall' },
          ],
          male: [
            { key: 'u11-saturday-sparta', value: 'U11 Sparta (Saturday) - Peter Lappin' },
            { key: 'u11-saturday-sparta-96', value: 'U11 Sparta 96 (Saturday) - Peter Lappin' },
            { key: 'u11-sunday-milan', value: 'U11 Milan (Sunday) - Sam Gibson' },
            { key: 'u11-sunday-roma', value: 'U11 Roma (Sunday) - Chris Hunn' },
            { key: 'u11-sunday-sparta', value: 'U11 Sparta (Sunday) - Peter Lappin' },
            { key: 'u11-sunday-sparta-96', value: 'U11 Sparta 96 (Sunday) - Peter Lappin' },
          ],
        },
      },
      {
        key: 'u12',
        value: 'Under 12s',
        teams: {
          female: [
            { key: 'u12-saturday-lionesses', value: 'U12 Lionesses (Saturday) - Mark Hewitson' },
            { key: 'u12-sunday-jaguars', value: 'U12 Jaguars (Sunday) - Chloe Clifford' },
            { key: 'u12-sunday-pumas', value: 'U12 Pumas (Sunday) - Chloe Clifford' },
          ],
          male: [
            { key: 'u12-saturday-inter', value: 'U12 Inter (Saturday) - Chris Carr' },
            { key: 'u12-sunday-inter', value: 'U12 Inter (Sunday) - Chris Carr' },
            { key: 'u12-sunday-milan', value: 'U12 Milan (Sunday) - Adam Jones' },
            { key: 'u12-sunday-napoli', value: 'U12 Napoli (Sunday) - Adam Jones' },
          ],
        },
      },
      {
        key: 'u13',
        value: 'Under 13s',
        teams: {
          female: [
            { key: 'u13-sunday-lionesses', value: 'U13 Lionesses (Sunday) - Mark Foreman' },
          ],
          male: [
            { key: 'u13-saturday-milan', value: 'U13 Milan (Saturday) - John Stewart' },
            { key: 'u13-sunday-milan', value: 'U13 Milan (Sunday) - John Stewart' },
            { key: 'u13-sunday-sparta', value: 'U13 Sparta (Sunday) - Iain Davison' },
          ],
        },
      },
      {
        key: 'u14',
        value: 'Under 14s',
        teams: {
          female: [
            { key: 'u14-saturday-lionesses', value: 'U14 Lionesses (Saturday) - Abbie Johnson' },
          ],
          male: [
            { key: 'u14-saturday', value: 'U14 (Saturday) - Simon Philpott' },
            { key: 'u14-sunday', value: 'U14 (Sunday) - Simon Philpott' },
          ],
        },
      },
      {
        key: 'u15',
        value: 'Under 15s',
        teams: {
          female: [],
          male: [
            { key: 'u15-sunday-juve', value: 'U15 Juve (Sunday) - Stu Smith' },
          ],
        },
      },
      {
        key: 'u16',
        value: 'Under 16s',
        teams: {
          female: [],
          male: [
            { key: 'u16-saturday-juve', value: 'U16 Juve (Saturday) - John Sullivan' },
          ],
        },
      },
    ],
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
    primaryTeam() {
      const team = this.ageGroups
        .flatMap(({ teams }) => ([
          ...teams.female,
          ...teams.male,
        ]))
        .find(({ key }) => key === this.player.team)

      if (team != null) {
        return team.value
      } else {
        return this.player.team
      }
    },
    secondaryTeam() {
      if (this.player.second_team === 'none') {
        return 'N/A'
      }

      const team = this.ageGroups
        .flatMap(({ teams }) => ([
          ...teams.female,
          ...teams.male,
        ]))
        .find(({ key }) => key === this.player.second_team)

      if (team != null) {
        return team.value
      } else {
        return this.player.second_team
      }
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
