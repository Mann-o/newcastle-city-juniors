<template>
  <div class="mt-4 first-of-type:mt-0">
    <label class="block text-sm font-bold mb-1">
      {{ label }}
    </label>
    <div class="border border-grey-400">
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
      <FontAwesomeIcon :icon="['fad', 'info-circle']" />
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
      required: true,
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
      type: String,
      required: true,
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
      this.$emit('input', e.target.value)
    },
  },
}
</script>
