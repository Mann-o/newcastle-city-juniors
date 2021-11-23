<template>
  <NuxtLink
    class="article-card"
    :to="link"
  >
    <div class="overflow-hidden">
      <img
        class="w-full max-h-250 transition-all"
        :src="image"
      >
    </div>
    <div class="py-2 text-grey-600">
      <FontAwesomeIcon :icon="['fad', 'calendar-alt']" />
      <span class="ml-1">
        {{ date | formatDate }}
      </span>
    </div>
    <div class="pb-2 font-bold">
      {{ title }}
    </div>
    <div class="pb-4">
      {{ subtext }}
    </div>
    <div>
      <NuxtLink
        class="inline-block border-2 border-gold hover:bg-gold hover:text-black py-2 px-4"
        :to="link"
      >
        Read More
      </NuxtLink>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ArticleCard',

  props: {
    title: {
      type: String,
      required: true,
    },
    subtext: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="postcss">
.article-card:hover {
  @apply text-black;
}

.article-card:hover img {
  @apply transform-gpu scale-110;
}

.article-card:hover a {
  @apply bg-gold text-black;
}
</style>
