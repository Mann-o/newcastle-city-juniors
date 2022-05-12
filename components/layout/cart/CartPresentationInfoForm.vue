<template>
  <div class="text-xs mb-8 bg-grey-200 p-4 mt-6 md:mt-12">
    <h2>Presentation Ticket Info</h2>
    <p class="mb-4">It appears you are purchasing tickets to an NCJ presentation event. Please provide the following information:</p>
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <div class="flex w-full items-center justify-between gap-4 mb-2">
        <label>Player Name</label>
        <ValidationProvider
          v-slot="{ errors }"
          class="flex-[0_0_65%]"
          rules="required"
          vid="playerName"
          tag="div"
        >
          <input class="border border-black w-full" type="text">
        </ValidationProvider>
      </div>
      <div class="flex w-full items-center justify-between gap-4">
        <label>Age Group</label>
        <ValidationProvider
          v-slot="{ errors }"
          class="flex-[0_0_65%]"
          rules="required"
          vid="ageGroup"
          tag="div"
        >
          <select
            class="border border-black text-xs w-full"
            v-model="presentationTicketInfo.ageGroup"
          >
            <option
              v-for="{ key, value } in ageGroups"
              :key="`age-group-${key}`"
              :value="key"
            >
              {{ value }}
            </option>
          </select>
        </ValidationProvider>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'CartPresentationInfoForm',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    presentationTicketInfo: {
      playerName: null,
      ageGroup: 'u6',
    },
    ageGroups: [
      { key: 'u6', value: 'Under 6s' },
      { key: 'u7', value: 'Under 7s' },
      { key: 'u8', value: 'Under 8s' },
      { key: 'u9', value: 'Under 9s' },
      { key: 'u10', value: 'Under 10s' },
      { key: 'u11', value: 'Under 11s' },
      { key: 'u12', value: 'Under 12s' },
      { key: 'u13', value: 'Under 13s' },
      { key: 'u14', value: 'Under 14s' },
      { key: 'u15', value: 'Under 15s' },
      { key: 'u16', value: 'Under 16s' },
    ],
  }),
};
</script>
