<template>
  <div>
    <h1>Player Registration Form</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching data required for this page!
    </div>
    <div v-else>
      <p class="p-6 bg-danger text-white flex gap-6 items-center mb-12">
        <span class="text-3xl">
          <FontAwesomeIcon :icon="['fad', 'circle-info']" />
        </span>
        <span>After completing this form you will be taken to our payment page to complete the upfront payment for your chosen membership option. Payment must be made immediately for any upfront costs, so please ensure you are ready to make payment before completing this form.</span>
      </p>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(registerPlayer)">
          <div>
            <h2>Step 1 - Parent / Guardian</h2>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors }"
              rules="required"
              tag="div"
            >
              <FormSelect
                label="Please select which Parent or Guardian is registering this player"
                :options="parents"
                v-model="form.parentId"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="mt-16">
            <h2>Step 2 - Player Information &amp; Consent</h2>
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
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="mt-4">
              <FormElement
                label="Middle Name(s)"
                v-model="form.middleNames"
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
                v-model="form.lastName"
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
                v-model="form.dateOfBirth"
                field-type="date"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors }"
              rules="required"
              tag="div"
            >
              <FormSelect
                label="Sex"
                :options="sexes"
                v-model="form.sex"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors }"
              rules="required"
              tag="div"
            >
              <FormElement
                label="Details of any medical conditions"
                v-model="form.medicalConditions"
                field-type="textarea"
                help-text="Even if the player does not have any medical conditions that we need to be aware of, you should confirm this here"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors, validate }"
              rules="required|image"
              tag="div"
            >
              <label class="block text-sm font-bold mb-1">
                Identification Verification: Please provide a passport style photo of the player
                <span class="text-danger ml-0.5">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                ref="identityVerificationPhoto"
                required
                @change="validate"
              >
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors, validate }"
              rules="required|image"
              tag="div"
            >
              <label class="block text-sm font-bold mb-1">
                Age Verification: Please provide a picture of the player's passport or birth certificate
                <span class="text-danger ml-0.5">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                ref="ageVerificationPhoto"
                required
                @change="validate"
              >
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              tag="div"
            >
              <FormCheckbox
                label="Please untick this box if you DO NOT consent to your player having video/photography of them taken by the club"
                v-model="form.mediaConsented"
              />
            </ValidationProvider>
          </div>

          <div class="mt-16">
            <h2>Step 3 - Team Selection &amp; Membership Fees</h2>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              tag="div"
            >
              <FormSelect
                v-if="ageGroupOptions"
                label="Select age group"
                :options="ageGroupOptions"
                v-model="form.ageGroup"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors }"
              rules="required|is_not:Invalid"
              tag="div"
            >
              <FormSelect
                label="Select primary team"
                :options="teams"
                v-model="form.team"
                :invalid="errors.length > 0"
                required
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="mt-4"
              v-slot="{ errors }"
              rules="is_not:Invalid"
              tag="div"
            >
              <FormSelect
                label="Select second team"
                :options="secondaryTeams"
                v-model="form.secondTeam"
                help-text="OPTIONAL - Choose a second team if your player will play on both on a Saturday and Sunday. There is an additional monthly cost to be registered to two teams, details of which will be confirmed below after you have made a selection."
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <template>
              <ValidationProvider
                class="mt-4"
                v-slot="{ errors }"
                rules="required"
                tag="div"
                vid="membershipOption"
              >
                <label class="block text-sm font-bold mb-1">
                  Select your membership fee option
                  <span class="text-danger ml-0.5">*</span>
                </label>
                <table class="w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="text-left border-r border-b border-grey-400 p-2">&nbsp;</th>
                      <th class="text-left border border-grey-400 p-2">Option</th>
                      <th class="text-left border border-grey-400 p-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <!-- <tr v-if="upfrontDisabled === false"> -->
                      <td class="border border-grey-400 p-2 text-center">
                        <input
                          type="radio"
                          value="upfront"
                          name="membership-fee"
                          v-model="form.membershipFeeOption"
                          :disabled="upfrontDisabled"
                          required
                        >
                      </td>
                      <td
                        class="border border-grey-400 p-2"
                        :class="[
                          upfrontDisabled ? ['line-through', 'text-grey-400'] : [],
                        ]"
                      >
                        Upfront
                      </td>
                      <td
                        class="border border-grey-400 p-2"
                        :class="[
                          upfrontDisabled ? ['line-through', 'text-grey-400'] : [],
                        ]"
                      >
                        <ul class="list-disc pl-4">
                          <li>{{ subscriptionOptions.upfront }}</li>
                          <li><strong>£{{ subscriptionOptions.upfrontSavings }} cheaper than the monthly subscription option</strong></li>
                          <li><strong>Only available during July 2025!</strong></li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-grey-400 p-2 text-center">
                        <input
                          type="radio"
                          value="subscription"
                          name="membership-fee"
                          v-model="form.membershipFeeOption"
                          required
                        >
                      </td>
                      <td class="border border-grey-400 p-2">
                        Monthly Subscription
                      </td>
                      <td class="border border-grey-400 p-2">
                        <ul class="list-disc pl-4">
                          <li>{{ subscriptionOptions.monthly.upfront }}</li>
                          <li>{{ subscriptionOptions.monthly.subscription }}</li>
                          <li><strong>{{ subscriptionOptions.monthly.total }}</strong></li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-if="form.membershipFeeOption === 'subscription'"
                class="mt-4"
                v-slot="{ errors }"
                rules="required_if:membershipOption,subscription"
                tag="div"
              >
                <FormSelect
                  label="Select preferred payment date"
                  :options="paymentDateOptions"
                  v-model="form.paymentDate"
                  help-text="This will be the date your subscription payment is taken each month"
                  :invalid="errors.length > 0"
                  required
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </template>
          </div>

          <div class="mt-16">
            <h2>Step 4 - Respect Code of Conduct</h2>
            <p class="mb-4">When playing football, I will:</p>
            <ul
              class="list-disc pl-10 mb-4"
              role="list"
            >
              <li>Always play to the best of my ability and for the benefits of my team</li>
              <li>Play fairly - I won't cheat, dive, complain or waste time</li>
              <li>Respect my teammates, the other team, the referee or my coach/manager</li>
              <li>Play by the rules, as directed by the referee</li>
              <li>Be gracious in victory and defeat - I will shake hands with the other team and referee at the end of the game</li>
              <li>Listen and respond to what my coach/manager tells me</li>
              <li>Understand that a coach must do what is best for the team and not one individual player</li>
              <li>Talk to someone I trust or the club welfare officer if I'm unhappy about anything at my club</li>
            </ul>
            <p class="pb-4">I understand that if I do not follow the code, any/all of the following actions may be taken by my club, County FA or The FA:</p>
            <p class="mb-4">I may:</p>
            <ul
              class="list-disc pl-10 mb-4"
              role="list"
            >
              <li>Be required to apologise to my team-mates, the other team, referee or team manager</li>
              <li>Receive a formal warning from the coach or the club committee</li>
              <li>Be dropped or substituted</li>
              <li>Be suspended from training</li>
              <li>Be required to leave the club</li>
            </ul>
            <p class="mb-4">In addition:</p>
            <ul
              class="list-disc pl-10 mb-4"
              role="list"
            >
              <li>My club, County FA or The FA may make my parent or carer aware of any infringement of the Code of Conduct</li>
              <li>The FA/County FA could impose a fine and suspension against my club</li>
            </ul>
            <ValidationProvider
              rules="is_true"
              v-slot="{ errors }"
              tag="div"
            >
              <div
                class="flex items-center cursor-pointer border p-4 transition-colors"
                :class="{
                  'border-danger': !form.acceptedCodeOfConduct,
                  'border-success': form.acceptedCodeOfConduct,
                  'bg-success-bg': form.acceptedCodeOfConduct,
                }"
                @click="toggleCodeOfConductAcceptance()"
              >
                <input type="checkbox" v-model="form.acceptedCodeOfConduct">
                <p class="ml-4">By ticking this box, I am confirming that the player I am registering has read and agrees to adhere to the Respect Code of Conduct</p>
              </div>
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-16">
            <h2>Step 5 - Gift Aid</h2>
            <div
              class="flex items-center cursor-pointer border p-4 transition-colors"
              :class="{
                'border-grey-400': !form.giftAidDeclarationAccepted,
                'border-success': form.giftAidDeclarationAccepted,
                'bg-grey-200': !form.giftAidDeclarationAccepted,
                'bg-success-bg': form.giftAidDeclarationAccepted,
              }"
              @click="toggleGiftAidDeclarationAcceptance()"
            >
              <input type="checkbox" v-model="form.giftAidDeclarationAccepted">
              <p class="ml-4">By ticking this box, I am certifying that I want to Gift Aid any payments/donations to Newcastle City Juniors. This includes any payments/donations that I make in the future, or may have made in the past. I am also certifying that I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my payments/donations in any given tax year, it is my responsibility to pay the difference.</p>
            </div>
          </div>

          <div class="mt-16">
            <h2>Step 6 - Declaration</h2>
            <ValidationProvider
              rules="is_true"
              v-slot="{ errors }"
              tag="div"
            >
              <div
                class="flex items-center cursor-pointer border p-4 transition-colors"
                :class="{
                  'border-danger': !form.acceptedDeclaration,
                  'border-success': form.acceptedDeclaration,
                  'bg-success-bg': form.acceptedDeclaration,
                }"
                @click="toggleDeclarationAcceptance()"
              >
                <input type="checkbox" v-model="form.acceptedDeclaration">
                <p class="ml-4">By ticking this box, I am certifying that the above information is correct. Newcastle City Juniors FC adheres to GDPR guidelines. Only personal data essential to running of our club is retained and only whilst individuals remain involved. I also certify that I do not have any outstanding liabilities with any club I have previously been registered with. I understand that failure to disclose such information or make false statement will render this registration invalid and liable to sanction.</p>
              </div>
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
              {{ registerPlayerButtonLabel }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PagePortalPlayersRegister',

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
    ageGroups: [],
    ageGroupOptions: [],
    parents: null,
    sexes: [
      { key: 'male', value: 'Male' },
      { key: 'female', value: 'Female' },
    ],
    paymentDateOptions: [
      { key: 1, value: '1st' },
      { key: 2, value: '2nd' },
      { key: 3, value: '3rd' },
      { key: 4, value: '4th' },
      { key: 5, value: '5th' },
      { key: 6, value: '6th' },
      { key: 7, value: '7th' },
      { key: 8, value: '8th' },
      { key: 9, value: '9th' },
      { key: 10, value: '10th' },
      { key: 11, value: '11th' },
      { key: 12, value: '12th' },
      { key: 13, value: '13th' },
      { key: 14, value: '14th' },
      { key: 15, value: '15th' },
    ],
    form: {
      firstName: null,
      middleNames: null,
      lastName: null,
      dateOfBirth: null,
      sex: 'male',
      medicalConditions: null,
      mediaConsented: true,
      ageGroup: 'u7',
      team: null,
      secondTeam: 'none',
      paymentDate: 1,
      membershipFeeOption: 'subscription',
      acceptedCodeOfConduct: false,
      acceptedDeclaration: false,
      giftAidDeclarationAccepted: true,
      parentId: null,
    },
    registering: false,
    player: null,
  }),

  async fetch() {
    this.ageGroups = [
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
    ];

    this.ageGroupOptions = this.ageGroups.map(({ key, value }) => ({ key, value }));

    const { data: { data: parents } } = await this.$axios.get('/api/club/parents');
    this.parents = parents.map(({ id, full_name }) => ({
      key: id,
      value: full_name,
    }));

    this.form.ageGroup = this.ageGroupOptions[0].key;
    this.form.team = this.teams[0].key;
    this.form.parentId = this.parents[0].key;

    if (this.$route.query?.player) {
      const { data: { data: player } } = await this.$axios.get(`/api/club/players/${this.$route.query.player}`);
      this.player = player;

      this.form.firstName = this.player.first_name;
      this.form.middleNames = this.player.middle_names;
      this.form.lastName = this.player.last_name;
      this.form.dateOfBirth = this.player.date_of_birth;
      this.form.sex = this.player.sex;
      this.form.medicalConditions = this.player.medical_conditions;
      this.form.mediaConsented = this.player.media_consented;
      this.form.ageGroup = this.player.age_group;
      this.form.team = this.player.team;
      this.form.secondTeam = this.player.second_team;
      this.form.membershipFeeOption = this.player.membership_fee_option;
      this.form.paymentDate = this.player.payment_date;
      this.form.acceptedCodeOfConduct = true;
      this.form.acceptedDeclaration = true;
      this.form.giftAidDeclarationAccepted = true;
    }
  },

  computed: {
    teams() {
      return this.ageGroups.find(({ key }) => key === this.form.ageGroup).teams[this.form.sex];
    },
    secondaryTeams() {
      return [
        { key: 'none', value: 'None' },
        ...this.ageGroups.flatMap(({ teams }) => teams[this.form.sex]).filter(({ key }) => key !== this.form.team),
      ];
    },
    hasSelectedMultipleTeams() {
      return this.form.secondTeam !== 'none';
    },
    registerPlayerButtonLabel() {
      return this.registering
        ? 'Registering...'
        : 'Register Player'
    },
    upfrontDisabled() {
      return new Date() >= new Date('2025-08-01');
    },
    subscriptionOptions() {
      const costs = {
        singleTeam: {
          registrationFee: 68,
          upfront: 360,
          monthly: 34,
        },
        dualTeam: {
          registrationFee: 85,
          upfront: 550,
          monthly: 51,
        },
      };

      const currentDate = new Date();

      const monthDiff = (dateFrom, dateTo) => {
        return (dateTo.getMonth() - dateFrom.getMonth()) + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
      }

      const registrationFee = costs[`${this.hasSelectedMultipleTeams ? 'dualTeam' : 'singleTeam'}`].registrationFee;
      const upfrontCost = costs[`${this.hasSelectedMultipleTeams ? 'dualTeam' : 'singleTeam'}`].upfront;
      const monthlyCost = costs[`${this.hasSelectedMultipleTeams ? 'dualTeam' : 'singleTeam'}`].monthly;
      const numberOfSubscriptionMonths = monthDiff(currentDate, new Date('2026-05-01'));

      return {
        upfront: `£${upfrontCost} one-off payment, inclusive of registration fee`,
        upfrontSavings: ((10 * monthlyCost) + registrationFee) - upfrontCost,
        monthly: {
          upfront: `1x £${registrationFee} registration fee (includes ${new Date(currentDate).toLocaleDateString('en-gb', { month: 'long', year: 'numeric' })} subscription payment)`,
          subscription: `${numberOfSubscriptionMonths}x £${monthlyCost} monthly payments from ${new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toLocaleDateString('en-gb', { month: 'long', year: 'numeric' })} up to, and including, May 2025`,
          subscriptionHelp: `Subscription will be automatically cancelled after the final payment in May 2025. Please note that the subscription will remain active until June 2025, and will be automatically cancelled before any additional payments are taken.`,
          total: `Total: £${((numberOfSubscriptionMonths) * monthlyCost) + registrationFee}`,
        },
      }
    },
  },

  watch: {
    'form.membershipFeeOption': function watchMembershpFeeOption(newValue) {
      if (newValue === 'subscription') {
        this.form.paymentDate = 1;
      } else {
        this.form.paymentDate = null;
      }
    },
    'form.ageGroup': function watchAgeGroup() {
      this.$nextTick(() => {
        this.form.team = this.teams[0]?.key ?? null;
        this.form.secondTeam = 'none';
      });
    },
  },

  mounted() {
    if (this.$route.query?.player) {
      this.$store.dispatch('notifications/add', {
        type: 'error',
        title: 'Error',
        text: 'An error occured whilst processing, or you have cancelled, your one-off payment - please try again.',
        sticky: true,
      });
    }
  },

  methods: {
    toggleCodeOfConductAcceptance() {
      this.form.acceptedCodeOfConduct = !this.form.acceptedCodeOfConduct
    },
    toggleDeclarationAcceptance() {
      this.form.acceptedDeclaration = !this.form.acceptedDeclaration
    },
    toggleGiftAidDeclarationAcceptance() {
      this.form.giftAidDeclarationAccepted = !this.form.giftAidDeclarationAccepted
    },
    async registerPlayer() {
      this.registering = true;

      const playerForm = new window.FormData();

      Object.entries(this.form).forEach(([ key, value ]) => {
        if ((key === 'paymentDate')) {
          if (this.form.membershipFeeOption === 'subscription') {
            playerForm.append(key, value);
          }
        } else if (key === 'middleNames') {
          if (value != null && value !== '') {
            playerForm.append(key, value);
          }
        } else {
          playerForm.append(key, value)
        }
      });

      playerForm.append('identityVerificationPhoto', this.$refs.identityVerificationPhoto.files[0]);
      playerForm.append('ageVerificationPhoto', this.$refs.ageVerificationPhoto.files[0]);

      if (this.$route.query?.player) {
        playerForm.append('existingPlayerId', this.$route.query.player);
      }

      try {
        const { data: { checkoutUrl }, status } = await this.$axios.post('/api/club/players', playerForm);

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          if (status === 200) {
            this.$router.push('/portal/players?status=success');
          } else {
            this.$store.dispatch('notifications/add', {
              type: 'error',
              title: 'Error',
              text: 'We were unable to register your player - please ensure all fields are completed and try again.',
              sticky: true,
            });
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.registering = false
      }
    },
  },
}
</script>
