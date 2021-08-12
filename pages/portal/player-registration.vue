<template>
  <div>
    <h1>Player Registration Form</h1>

    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching age groups!
    </div>
    <div v-else>
      <template v-if="!registered">
        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(registerPlayer)">
            <div>
              <h2>Step 1 - Player Information &amp; Consent</h2>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
              >
                <FormElement
                  label="Full Name"
                  v-model="form.fullName"
                  :invalid="errors.length > 0"
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
                  help-text="Even if your child does not have any medical conditions that we need to be aware of, you should confirm as such here"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                class="mt-4"
                tag="div"
              >
                <FormCheckbox
                  label="Please untick this box if you do not consent to your child having video/photography of them taken by the club"
                  v-model="form.mediaConsented"
                />
              </ValidationProvider>
            </div>

            <div class="mt-16">
              <h2>Step 2 - Age Group Selection &amp; Membership Fees</h2>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                tag="div"
              >
                <FormSelect
                  label="Select which age group your player is registering for"
                  :options="ageGroups"
                  v-model="form.ageGroupId"
                  :invalid="errors.length > 0"
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
                  label="Select which membership fee option you wish to proceed with"
                  :options="membershipFeeOptions"
                  v-model="form.membershipFeeOption"
                  :help-text="`${form.sex === 'male' ? 'If you choose the 1x payment of £300 option this is a saving of £42 compared to the monthly subscriptions. ' : ''}For the monthly subscriptions, the 1x payment in July covers a £${form.sex === 'male' ? '28.50' : '20'} registration fee and your July monthly subscription. For any monthly subscription payments not received by 15th of each month, your player will need to be de-registered and will not be allowed to train or play as they would not be covered by player insurance.`"
                  :invalid="errors.length > 0"
                />
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="mt-16">
              <h2>Step 3 - Respect Code of Conduct - Young Players</h2>
              <p class="mb-4">When playing football, I will:</p>
              <ul
                class="list-disc pl-10 mb-4"
                role="list"
              >
                <li>Always play to the best of my ability and for the benefits of my team</li>
                <li>Play fairly – I won’t cheat, dive, complain or waste time</li>
                <li>Respect my teammates, the other team, the referee or my coach/manager</li>
                <li>Play by the rules, as directed by the referee</li>
                <li>Be gracious in victory and defeat – I will shake hands with the other team and referee at the end of the game</li>
                <li>Listen and respond to what my coach/manager tells me</li>
                <li>Understand that a coach must do what is best for the team and not one individual player</li>
                <li>Talk to someone I trust or the club welfare officer if I’m unhappy about anything at my club</li>
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
                    'border-danger': !form.acceptedPlayerCodeOfConduct,
                    'border-success': form.acceptedPlayerCodeOfConduct,
                    'bg-success-bg': form.acceptedPlayerCodeOfConduct,
                  }"
                  @click="togglePlayerCodeOfConductAcceptance()"
                >
                  <input type="checkbox" v-model="form.acceptedPlayerCodeOfConduct">
                  <p class="ml-4">By ticking this box, I am confirming that the player I am registering has read and agrees to adhere to the Respect Code of Conduct for Young Players</p>
                </div>
                <span class="text-xs text-danger mt-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="mt-16">
              <h2>Step 4 - Respect Code of Conduct - Spectators and Parents/Carers</h2>
              <p class="mb-4">We all bear a collective responsibility to set a good example and help provide a positive environment in which children can learn and enjoy the game. Play your part and observe The FA’s respect Code of Conduct for spectators at all times.</p>
              <p class="mb-4">I will:</p>
              <ul
                class="list-disc pl-10 mb-4"
                role="list"
              >
                <li>Remember that children play for FUN</li>
                <li>Applaud effort and good play as well as success</li>
                <li>Respect the Referee’s decisions even when you don’t agree with them</li>
                <li>Appreciate good play whatever team it comes from</li>
                <li>Remain behind the touchline and within the designated spectator’s area</li>
                <li>Let the coach do their job and not confuse the players by telling them what to do</li>
                <li>Encourage the players to respect the opposition, referee and match officials</li>
                <li>Support positively and offer players encouragement not criticism</li>
                <li>Never engage in, or tolerate offensive, insulting or abusive language or behaviour</li>
              </ul>
              <p class="mb-4">I understand that if I do not follow the Code, any/all the following actions may be taken:</p>
              <p class="mb-4">I may be:</p>
              <ul
                class="list-disc pl-10 mb-4"
                role="list"
              >
                <li>Issued with a verbal warning from the club or league official</li>
                <li>Required to meet with the club, league, or club welfare officer</li>
                <li>Obliged to undertake an FA education course</li>
                <li>Obliged to leave the match venue by the club</li>
                <li>Requested by the club not to attend future games</li>
                <li>Suspended or have my club membership removed</li>
                <li>Required to leave the club along with any dependents</li>
              </ul>
              <p class="mb-4">In addition:</p>
              <ul
                class="list-disc pl-10 mb-4"
                role="list"
              >
                <li>The FA/County FA could impose a fine and/or suspension on the club</li>
              </ul>
              <ValidationProvider
                rules="is_true"
                v-slot="{ errors }"
                tag="div"
              >
                <div
                  class="flex items-center cursor-pointer border p-4 transition-colors"
                  :class="{
                    'border-danger': !form.acceptedParentCodeOfConduct,
                    'border-success': form.acceptedParentCodeOfConduct,
                    'bg-success-bg': form.acceptedParentCodeOfConduct,
                  }"
                  @click="toggleParentCodeOfConductAcceptance()"
                >
                  <input type="checkbox" v-model="form.acceptedParentCodeOfConduct">
                  <p class="ml-4">By ticking this box, I am confirming that all parents/guardians (provided when registering for the NCJ Portal) have read and agree to adhere to the Respect Code of Conduct for Spectators and Parents/Carers</p>
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
              <p
                class="mt-4 text-danger"
                v-if="registerError"
              >
                {{ registerError }}
              </p>
            </div>
          </form>
        </ValidationObserver>
      </template>
      <template v-else>
        <p class="pb-4">Player registration was successful. Please now return to the NCJ Portal and tap on your player to make your first payment or set up your subscriptions.</p>
        <p class="strong">IMPORTANT: Payment should be made immediately for any required upfront costs. Do not wait for the club to contact or chase you for payment!</p>
        <NuxtLink
          to="/portal"
          class="
            inline-block mt-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
            hover:bg-black hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
          "
        >
          Back to NCJ Portal
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'PagePortaPlayerRegistration',

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
    sexes: [
      { key: 'male', value: 'Male' },
      { key: 'female', value: 'Female' },
    ],
    form: {
      fullName: '',
      dateOfBirth: '',
      sex: 'male',
      medicalConditions: '',
      mediaConsented: true,
      ageGroupId: '1',
      membershipFeeOption: 'subscription',
      acceptedPlayerCodeOfConduct: false,
      acceptedParentCodeOfConduct: false,
      acceptedDeclaration: false,
    },
    registering: false,
    registerError: null,
    registered: false,
    player: null,
  }),

  async fetch() {
    const { data: { data: ageGroups } } = await this.$axios.get('/api/club/age-groups')
    this.ageGroups = ageGroups.map(ageGroup => ({
      key: ageGroup.id,
      value: ageGroup.name,
    })) || []
  },

  computed: {
    registerPlayerButtonLabel() {
      return this.registering
        ? 'Registering...'
        : 'Register Player'
    },

    membershipFeeOptions() {
      return [
        // {
        //   key: 'upfront',
        //   value: `1x payment of £${
        //     this.form.sex === 'male' ? '300.00' : '200.00'
        //   }`,
        // },
        {
          key: 'subscription',
          value: `1x payment of £${
            this.form.sex === 'male' ? '57.00' : '40.00'
          } in July, then 10x monthly payments of £${
            this.form.sex === 'male' ? '28.50' : '20.00'
          } from August to May`,
        },
      ]
    },
  },

  methods: {
    togglePlayerCodeOfConductAcceptance() {
      this.form.acceptedPlayerCodeOfConduct = !this.form.acceptedPlayerCodeOfConduct
    },
    toggleParentCodeOfConductAcceptance() {
      this.form.acceptedParentCodeOfConduct = !this.form.acceptedParentCodeOfConduct
    },
    toggleDeclarationAcceptance() {
      this.form.acceptedDeclaration = !this.form.acceptedDeclaration
    },
    async registerPlayer() {
      this.registerError = null;
      this.registering = true;

      try {
        const { data: { code: responseCode } } = await this.$axios.post('/api/club/players', this.form)

        if (responseCode !== 200) {
          throw new Error('Unable to register')
        }

        this.registered = true

        window.scrollTo(0, 0)
      } catch (error) {
        console.log(error)
        this.registerError = 'Unable to register'
      } finally {
        this.registering = false
      }
    },
  },
}
</script>
