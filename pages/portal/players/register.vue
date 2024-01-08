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
      <p class="mb-12 text-danger">After completing this form you will be taken to our payment page to complete the upfront payment for your chosen membership option. Payment must be made immediately for any upfront costs so please ensure you a ready to make payment before completing this form.</p>
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
                label="Please untick this box if you do not consent to your player having video/photography of them taken by the club"
                v-model="form.mediaConsented"
              />
            </ValidationProvider>
          </div>

          <div class="mt-16">
            <h2>Step 3 - Team Selection{{ freeChild ? '' : ' &amp; Membership Fees' }}</h2>

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
                label="Select secondary team"
                :options="secondaryTeams"
                v-model="form.secondTeam"
                help-text="OPTIONAL - Choose a second team, e.g. if your player plays both on a Saturday and Sunday. Please note that there is an additional monthly cost of £15 to be registered to two teams."
                :invalid="errors.length > 0"
              />
              <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
            <template v-if="!freeChild">
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
                        Upfront ({{ form.sex === 'male' ? 'Male' : 'Female' }})
                      </td>
                      <td
                        class="border border-grey-400 p-2"
                        :class="[
                          upfrontDisabled ? ['line-through', 'text-grey-400'] : [],
                        ]"
                      >
                        <ul class="list-disc pl-4">
                          <li>{{ subscriptionOptions.upfront }}</li>
                          <li><strong>£40 cheaper than the monthly subscription option</strong></li>
                          <li><strong>Only available during July 2024!</strong></li>
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
                        Monthly Subscription ({{ form.sex === 'male' ? 'Male' : 'Female' }})
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
            <h2>Step 5 - Declaration</h2>
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
      ageGroup: '6',
      team: null,
      secondTeam: null,
      paymentDate: 1,
      membershipFeeOption: 'subscription',
      acceptedCodeOfConduct: false,
      acceptedDeclaration: false,
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
        teams: [
          { key: 'u7-boys-saturday', value: 'U7 Boys (Sat) - John Sullivan' },
          { key: 'u7-girls-saturday', value: 'U7 Girls (Sat) - Mark Hedley' },
          { key: 'u7-milan', value: 'U7 Milan (Sun) - Jordan Holmes' },
          { key: 'u7-juve', value: 'U7 Juve (Sun) - John Sullivan' },
          { key: 'u7-inter', value: 'U7 Inter (Sun) - Jamie Chandler' },
          { key: 'u7-girls', value: 'U7 Girls (Sat) - Leanne Marshall' },
        ],
      },
      {
        key: 'u8',
        value: 'Under 8s',
        teams: [
          { key: 'u8-girls-saturday', value: 'U8 Girls (Sat) - Mark Hedley' },
          { key: 'u8-milan-saturday', value: 'U8 Milan (Sat) - Jordan Holmes' },
          { key: 'u8-milan', value: 'U8 Milan (Sun) - Joe Foalle' },
          { key: 'u8-juve', value: 'U8 Juve (Sun) - Joe Foalle' },
          { key: 'u8-inter', value: 'U8 Inter (Sun) - Joe Foalle' },
        ],
      },
      {
        key: 'u9',
        value: 'Under 9s',
        teams: [
          { key: 'u9-girls-saturday', value: 'U9 Girls (Sat) - Mark Hedley' },
          { key: 'u9-girls-lionesses-saturday', value: 'U9 Girls Lionesses (Sat) - Leanne Marshall' },
          { key: 'u9-napoli-saturday', value: 'U9 Napoli (Sat) - Chris Hunn' },
          { key: 'u9-fiorentina-saturday', value: 'U9 Fiorentina (Sat) - Paul Leadbitter' },
          { key: 'u9-juve-saturday', value: 'U9 Juve (Sat) - James Tolchard' },
          { key: 'u9-inter', value: 'U9 Inter (Sun) - Paul Leadbitter' },
          { key: 'u9-atalanta', value: 'U9 Atalanta (Sun) - Mattie Thompson' },
          { key: 'u9-juve', value: 'U9 Juve (Sun) - James Tolchard' },
          { key: 'u9-roma', value: 'U9 Roma (Sun) - Chris Hunn' },
        ],
      },
      {
        key: 'u10',
        value: 'Under 10s',
        teams: [
          { key: 'u10-girls-lionesses-saturday', value: 'U10 Girls Lionesses (Sat)' },
          { key: 'u10-milan', value: 'U10 Milan (Sun) - Adam Jones' },
          { key: 'u10-juve', value: 'U10 Juve (Sun) - Adam Jones' },
          { key: 'u10-inter', value: 'U10 Inter (Sun) - Paul Thornton' },
          { key: 'u10-pumas', value: 'U10 Pumas (Sun) - Chloe Clifford' },
          { key: 'u10-jaguars-girls', value: 'U10 Jaguars Girls (Sun) - Chloe Clifford' }
        ],
      },
      {
        key: 'u11',
        value: 'Under 11s',
        teams: [
          { key: 'u11-sparta', value: 'U11 Sparta (Sun) - David Moore' },
          { key: 'u11-milan', value: 'U11 Milan (Sun) - David Moore' },
          { key: 'u11-saturday', value: 'U11 Boys (Sat)'},
        ],
      },
      {
        key: 'u12',
        value: 'Under 12s',
        teams: [
          { key: 'u12', value: 'U12s (Sun) - Simon Philpott' },
          { key: 'u12-saturday', value: 'U12s (Sat) - John Stewart' },
        ],
      },
      {
        key: 'u13',
        value: 'Under 13s',
        teams: [
          { key: 'u13-juve', value: 'U13 Juve (Sun) - Stuart Smith' },
        ],
      },
      {
        key: 'u14',
        value: 'Under 14s',
        teams: [
          { key: 'u14-saturday', value: 'U14s (Sat) - John Sullivan' },
          { key: 'u14-milan', value: 'U14 Milan (Sun) - Ryan Donaldson' },
          { key: 'u14-juve', value: 'U14 Juve (Sun) - John Sullivan' },
        ],
      },
      {
        key: 'u15',
        value: 'Under 15s',
        teams: [
          { key: 'u15-saturday', value: 'U15s (Sat) - Steve Surtees' },
          { key: 'u15-milan', value: 'U15 Milan (Sun) - Matty Henry' },
          { key: 'u15-juve', value: 'U15 Juve (Sun) - Mark Foreman' },
        ],
      },
      {
        key: 'u16',
        value: 'Under 16s',
        teams: [
          { key: 'u16', value: 'U16s (Sun) - Andrew Ferguson' },
        ],
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
    }
  },

  computed: {
    teams() {
      return this.ageGroups.find(({ key }) => key === this.form.ageGroup).teams;
    },
    secondaryTeams() {
      return [
        { key: 'none', value: 'None' },
        ...this.ageGroups.flatMap(({ teams }) => teams).filter(({ key }) => key !== this.form.team),
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
      return new Date() > new Date('2024-07-31');
    },
    subscriptionOptions() {
      const costs = {
        maleRegistrationFee: 60,
        femaleRegistrationFee: 50,
        maleSingleTeamMonthly: 30,
        maleMultiTeamMonthly: 45,
        femaleSingleTeamMonthly: 25,
        femaleMultiTeamMonthly: 40,
      };

      const currentDate = new Date();

      const monthDiff = (dateFrom, dateTo) => {
        return (dateTo.getMonth() - dateFrom.getMonth()) + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
      }

      const monthlyCost = costs[`${this.form.sex}${this.hasSelectedMultipleTeams ? 'Multi' : 'Single'}TeamMonthly`];
      const registrationFee = costs[`${this.form.sex}RegistrationFee`];

      return {
        upfront: `£${(monthlyCost * 12) - 40} one-off payment, inclusive of membership fee`,
        monthly: {
          upfront: `1x £${registrationFee} one-off payment (membership fee and ${currentDate.toLocaleDateString('en-gb', { month: 'long', year: 'numeric' })} subscription)`,
          subscription: `${monthDiff(currentDate, new Date('2024-05-01'))}x £${monthlyCost} monthly payments from ${new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toLocaleDateString('en-gb', { month: 'long', year: 'numeric' })} up to, and including, May 2024`,
          total: `Total: £${((monthDiff(currentDate, new Date('2024-05-01')) + 1) * monthlyCost) + (monthlyCost * 2)}`,
        },
      }
    },
    freeChild() {
      return this.$auth.user[0].permissions.map(({ name }) => name).includes('free-child');
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
        this.form.team = this.teams[0].key;
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

    if (this.freeChild) {
      this.form.membershipFeeOption = 'upfront';
    }
  },

  methods: {
    toggleCodeOfConductAcceptance() {
      this.form.acceptedCodeOfConduct = !this.form.acceptedCodeOfConduct
    },
    toggleDeclarationAcceptance() {
      this.form.acceptedDeclaration = !this.form.acceptedDeclaration
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
              text: 'We were unable to register your player - please ensure all fields are completed and try again',
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
