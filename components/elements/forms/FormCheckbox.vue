<template>
  <div>
    <label class="block text-sm font-bold mb-1">
      {{ label }}
    </label>
    <div>
      <input type="checkbox"
        class="block text-sm focus:outline-none"
        :checked="value"
        @change="changeFieldValue"
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
  name: 'FormCheckbox',

  props: {
    label: {
      type: String,
      required: true,
    },
    helpText: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: Boolean,
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
      this.$emit('input', e.target.checked)
    },
  },
}
</script>
