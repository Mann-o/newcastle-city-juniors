<template>
  <div
    class="relative hero flex justify-center items-center bg-center bg-cover overflow-hidden"
    :class="[
      ...isOnHomepage ? ['aspect-w-16 aspect-h-9'] : [],
    ]"
  >
    <div
      v-if="hasMedia"
      class="absolute inset-0"
    >
      <div v-if="mediaIsVideo">
        <video
          class="w-full"
          autoplay
          muted
          loop
        >
          <source :src="hero.backgroundMedia.fields.file.url">
        </video>
      </div>
      <div v-if="mediaIsImage">
        Image
      </div>
    </div>
    <div
      class="
        z-10 text-white bg-black bg-opacity-50 flex justify-center items-center font-serif italic h-full w-full px-4 py-8
        lg:py-36
      "
    >
      <div class="text-2xl text-center lg:text-5xl lg:w-7/12 lg:leading-snug">
        <!-- eslint-disable vue/no-v-html -->
        <p v-html="hero.leadingText" />
        <p
          v-if="hero.standoutText"
          class="text-gold"
          v-html="hero.standoutText"
        />
        <!-- eslint-enable vue/no-v-html -->
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
    isOnHomepage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    mediaIsImage () {
      return this.hero.backgroundMedia?.fields?.file?.contentType?.startsWith('image')
    },
    mediaIsVideo () {
      return this.hero.backgroundMedia?.fields?.file?.contentType?.startsWith('video')
    },
    hasMedia () {
      return this.mediaIsVideo || this.mediaIsImage
    },
  },
}
</script>
