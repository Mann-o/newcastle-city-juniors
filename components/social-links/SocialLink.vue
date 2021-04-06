<template>
  <li class="inline-block ml-4 first:ml-0">
    <ExternalLink
      :to="to"
      :light="light"
      :dark="dark"
      no-follow
      no-referrer
    >
      <FontAwesomeIcon :icon="['fab', icon]" />
    </ExternalLink>
  </li>
</template>

<script>
export default {
  name: 'SocialLink',

  components: {
    ExternalLink: () => import('@/components/elements/ExternalLink.vue'),
  },

  props: {
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    light: {
      type: Boolean,
      required: false,
      default: false,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
