<template>
  <div>
    <label
      v-if="label"
      class="block text-sm font-bold mb-1"
    >
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
      <component
        class="block text-sm w-full focus:outline-none"
        :is="fieldElement"
        v-bind="fieldElementAttributes"
        :value="value"
        @input="changeFieldValue"
      />
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
  name: 'FormElement',

  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    fieldType: {
      type: String,
      required: false,
      default: 'text',
    },
    helpText: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String || null,
      required: false,
      default: null,
    },
    invalid: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    /** @returns {string} */
    fieldElement () {
      return this.fieldType === 'textarea'
        ? 'textarea'
        : 'input'
    },
    /** @returns {object} */
    fieldElementAttributes () {
      return {
        ...this.fieldElement === 'input' && {
          ...this.fieldType === 'text' && {
            type: 'text',
          },
          ...this.fieldType === 'email' && {
            type: 'email',
          },
          ...this.fieldType === 'password' && {
            type: 'password',
          },
          ...this.fieldType === 'date' && {
            type: 'date',
          },
          ...this.required && {
            required: true,
          },
        },
      }
    },
    /** @returns {boolean} */
    showHelpText () {
      return this.helpText != null && this.helpText.length
    },
  },

  methods: {
    changeFieldValue (e) {
      this.$emit('input', (e.target.value == null || e.target.value === '') ? null : e.target.value)
    },
  },
}
</script>
