<template>
  <div class="mt-4 first-of-type:mt-0">
    <label class="block text-sm font-bold mb-1">
      {{ label }}
    </label>
    <div class="border border-grey-400">
      <select
        class="block w-full text-sm focus:outline-none"
        :value="value"
        @change="changeFieldValue"
      >
        <option
          v-for="({ key, value }) in options"
          :key="key"
          :value="key"
        >
          {{ value }}
        </option>
      </select>
    </div>
    <div
      v-if="showHelpText"
      class="text-xs italic text-grey-600 mt-1"
    >
      <FontAwesomeIcon :icon="['fad', 'info-circle']" />
      {{ helpText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',

  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    helpText: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    /** @returns {boolean} */
    showHelpText () {
      return this.helpText != null && this.helpText.length
    },
  },

  methods: {
    changeFieldValue (e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
