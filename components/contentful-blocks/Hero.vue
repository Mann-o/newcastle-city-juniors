<template>
  <div
    class="hero flex justify-center items-center bg-center bg-cover"
    :style="heroStyles"
  >
    <div class="text-white bg-black bg-opacity-50 flex justify-center items-center font-serif italic h-full w-full px-4 py-8 lg:py-36">
      <div class="text-2xl text-center lg:text-5xl lg:w-7/12 lg:leading-snug">
        <p v-html="hero.leadingText" />
        <p
          v-if="hero.standoutText"
          class="text-gold"
          v-html="hero.standoutText"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',

  props: {
    hero: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /** @return {object} */
    heroStyles () {
      return {
        '--hero-background-image': `url(${this.hero.backgroundImage.fields.file.url})`,
      }
    },
  },
}
</script>

<style lang="postcss">
.hero {
  background-image: var(--hero-background-image);
}
</style>
