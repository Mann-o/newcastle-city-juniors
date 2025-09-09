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
        :value="value == null ? '' : value"
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
      type: [String, Number, null],
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
    min: {
      type: [String, Number],
      required: false,
      default: null,
    },
    max: {
      type: [String, Number],
      required: false,
      default: null,
    },
    step: {
      type: [String, Number],
      required: false,
      default: null,
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
          ...this.fieldType === 'number' && {
            type: 'number',
            ...this.min !== null && { min: this.min },
            ...this.max !== null && { max: this.max },
            ...this.step !== null && { step: this.step },
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

  watch: {
    value(newValue) {
      if (newValue == null) {
        this.$emit('input', null)
      }
    },
  },

  methods: {
    changeFieldValue (e) {
      let value = e.target.value;

      // Handle empty values
      if (value == null || value === '') {
        this.$emit('input', null);
        return;
      }

      // Convert to number for numeric inputs
      if (this.fieldType === 'number') {
        const numValue = parseFloat(value);

        // Check if it's a valid number
        if (!isNaN(numValue)) {
          // Apply min/max constraints
          let constrainedValue = numValue;

          if (this.min !== null && numValue < this.min) {
            constrainedValue = this.min;
          }

          if (this.max !== null && numValue > this.max) {
            constrainedValue = this.max;
          }

          // If we had to constrain the value, update the input
          if (constrainedValue !== numValue) {
            this.$nextTick(() => {
              e.target.value = constrainedValue;
            });
          }

          this.$emit('input', constrainedValue);
        } else {
          // If not a valid number, emit null
          this.$emit('input', null);
        }
      } else {
        // For non-numeric inputs, emit as string
        this.$emit('input', value);
      }
    },
  },
}
</script>
