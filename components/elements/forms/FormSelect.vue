<template>
  <div class="mt-4 first-of-type:mt-0">
    <label class="block text-sm font-bold mb-1">
      {{ label }}
    </label>
    <div
      class="border transition-colors"
      :class="{
        'border-grey-400': !invalid,
        'border-danger': invalid,
      }"
    >
      <select
        class="block w-full text-sm focus:outline-none"
        :value="value"
        @change="changeFieldValue"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option[keyField]"
        >
          {{ option[valueField] }}
        </option>
      </select>
    </div>
    <div
      v-if="showHelpText"
      class="text-xs italic text-grey-600 mt-1"
    >
      <FontAwesomeIcon :icon="['fad', 'circle-info']" />
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
    invalid: {
      type: Boolean,
      required: false,
      default: false,
    },
    keyField: {
      type: String,
      required: false,
      default: 'key',
    },
    valueField: {
      type: String,
      required: false,
      default: 'value',
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
