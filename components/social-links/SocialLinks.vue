<template>
  <nav>
    <ul>
      <SocialLink
        to="https://www.facebook.com/NewcastleCityJuniors2005"
        icon="facebook-f"
        :light="light"
        :dark="dark"
      />
      <SocialLink
        to="https://twitter.com/CityJuniors2005"
        icon="twitter"
        :light="light"
        :dark="dark"
      />
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SocialLinks',

  components: {
    SocialLink: () => import('./SocialLink.vue'),
  },

  props: {
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
