<template>
  <div class="grid grid-cols-6 border border-black">
    <div class="bg-gold flex justify-center items-center col-span-2 text-6xl relative">
      <div v-if="hasTeamPhoto">
        <img
          :src="team.fields.teamPhoto.fields.file.url"
          :alt="team.fields.teamPhoto.fields.description"
        >
      </div>
      <div v-else>
        <div class="absolute inset-0 flex justify-center items-center text-sm">
          <template v-if="ageGroup.fields.slug !== 'seniors'">
            U{{ ageGroup.fields.ageGroup }}
          </template>
          <template v-else>
            S
          </template>
        </div>
        <FontAwesomeIcon :icon="['fad', 'shirt']" />
      </div>
    </div>
    <div class="p-4 text-xs col-span-4">
      <div class="pb-4 text-lg">
        <template v-if="ageGroup.fields.slug !== 'seniors'">
          <span class="font-bold">
            U{{ ageGroup.fields.ageGroup }} {{ team.fields.name }}
          </span>
        </template>
        <template v-else>
          <span class="font-bold">
            Seniors
          </span>
        </template>
        <!-- <NuxtLink
          class="font-bold"
          :to="`/teams/${ageGroup.fields.slug}/${team.fields.slug}`"
        >
          U{{ ageGroup.fields.ageGroup }} {{ team.fields.name }}
        </NuxtLink> -->
      </div>
      <div class="font-bold mb-2">
        Manager
      </div>
      <div
        v-for="(manager, managerIndex) in team.fields.managers"
        :key="`manager-${managerIndex}`"
        class="bg-grey-200 p-2"
      >
        <ul>
          <li class="font-bold">
            {{ manager.fields.firstName }} {{ manager.fields.lastName }}
          </li>
          <li v-if="manager.fields.telephoneNumber">
            <FontAwesomeIcon
              :icon="['fad', 'phone']"
              class="mr-2"
            />
            <a
              :href="manager.fields.telephoneNumber | telephoneNumberLink"
              class="hover:text-black hover:underline"
            >
              {{ manager.fields.telephoneNumber }}
            </a>
          </li>
          <li v-if="manager.fields.emailAddress">
            <FontAwesomeIcon
              :icon="['fad', 'envelope']"
              class="mr-2"
            />
            <a
              :href="manager.fields.emailAddress | emailAddressLink"
              class="hover:text-black hover:underline"
            >
              {{ manager.fields.emailAddress }}
            </a>
          </li>
        </ul>
      </div>
      <div
        v-if="hasCoaches"
        class="pt-4"
      >
        <div class="font-bold mb-2">
          Coaches
        </div>
        <div
          v-for="(coach, coachIndex) in team.fields.coaches"
          :key="`coach-${coachIndex}`"
          class="bg-grey-200 p-2 mt-2 first:mt-0"
        >
          <ul>
            <li class="font-bold">
              {{ coach.fields.firstName }} {{ coach.fields.lastName }}
            </li>
            <li v-if="coach.fields.telephoneNumber">
              <FontAwesomeIcon
                :icon="['fad', 'phone']"
                class="mr-2"
              />
              <a
                :href="coach.fields.telephoneNumber | telephoneNumberLink"
                class="hover:text-black hover:underline"
              >
                {{ coach.fields.telephoneNumber }}
              </a>
            </li>
            <li v-if="coach.fields.emailAddress">
              <FontAwesomeIcon
                :icon="['fad', 'envelope']"
                class="mr-2"
              />
              <a
                :href="coach.fields.emailAddress | emailAddressLink"
                class="hover:text-black hover:underline"
              >
                {{ coach.fields.emailAddress }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',

  props: {
    ageGroup: {
      type: Object,
      required: true,
    },
    team: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /** @returns {boolean} */
    hasCoaches () {
      return this.team.fields?.coaches?.length
    },
    /** @returns {boolean} */
    hasTeamPhoto () {
      return this.team.fields?.teamPhoto != null
    },
  },
}
</script>
