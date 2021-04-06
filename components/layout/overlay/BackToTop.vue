<template>
  <div
    class="bg-gold text-white cursor-pointer fixed bottom-4 right-4 w-8 h-8 flex justify-center items-center"
    :class="[
      ...(
        (scrollPosition >= 100)
          ? ['pointer-events-auto', 'opacity-100']
          : ['pointer-events-none', 'opacity-0']
      ),
    ]"
    @click="backToTop()"
  >
    <FontAwesomeIcon :icon="['fal', 'angle-up']" />
  </div>
</template>

<script>
export default {
  name: 'BackToTop',

  data: () => ({
    scrollPosition: 0,
  }),

  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.updateScroll)
  },

  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY
    },
    backToTop () {
      if (process.client) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },
  },
}
</script>
