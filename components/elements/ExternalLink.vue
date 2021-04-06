<template>
  <a
    :class="[
      ...(dark ? ['hover:text-white'] : []),
      ...(light ? ['text-black hover:text-black'] : []),
      ...(!dark && !light ? ['text-white'] : []),
    ]"
    :href="to"
    target="_blank"
    :rel="rel"
    v-bind="additionalAttrs"
  >
    <slot />
    <FontAwesomeIcon
      v-if="showExternalIcon"
      class="ml-1"
      :icon="['fal', 'external-link']"
    />
  </a>
</template>

<script>
export default {
  name: 'ExternalLink',

  props: {
    to: {
      type: String,
      required: true,
    },
    noOpener: {
      type: Boolean,
      default: false,
    },
    noReferrer: {
      type: Boolean,
      default: false,
    },
    noFollow: {
      type: Boolean,
      default: false,
    },
    showExternalIcon: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
  },

  computed: {
    rel () {
      const rels = []

      if (this.noOpener) {
        rels.push('noopener')
      }

      if (this.noReferrer) {
        rels.push('noreferrer')
      }

      if (this.noFollow) {
        rels.push('nofollow')
      }

      return rels.join(' ')
    },
    additionalAttrs () {
      if (this.label == null) {
        return {}
      }

      return {
        'aria-label': this.label,
      }
    },
  },
}
</script>
