<template>
  <div class="mt-4 first-of-type:mt-0">
    <label v-if="label" class="block text-sm font-bold mb-1">
      {{ label }}
      <span v-if="required" class="text-danger ml-0.5">*</span>
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
          :disabled="option.disabled"
          :style="option.disabled ? 'color: #9CA3AF; font-style: italic;' : ''"
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
      required: false,
      default: null,
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
      type: [String, Number, undefined],
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
    required: {
      type: Boolean,
      required: false,
      default: false,
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
