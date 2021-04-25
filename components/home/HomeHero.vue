<template>
  <div class="home-hero flex justify-center items-center bg-center bg-cover">
    <div class="text-white bg-black bg-opacity-50 flex justify-center items-center font-serif italic h-full w-full px-4 py-8 lg:py-36">
      <div class="text-2xl text-center lg:text-5xl lg:w-7/12">
        <p>Our Clubs Mission Is To Attract, Develop, Motivate &amp; Produce The Best Natural Talent In The North East By Providing The Best Possible Experience...</p>
        <p class="text-gold">
          The "City Experience"
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHero',
}
</script>

<style lang="postcss">
.home-hero {
  background-image: url('/images/etc/ncj-team-photo.jpg');
}
</style>
