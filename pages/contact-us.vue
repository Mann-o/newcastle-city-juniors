<template>
  <div>
    <ClientOnly>
      <GmapMap
        :style="{ height: map.height }"
        :center="map.center"
        :zoom="map.zoom"
      >
        <GmapMarker :position="map.center" />
      </GmapMap>
    </ClientOnly>

    <ContactInfo />
  </div>
</template>

<script>
export default {
  name: 'PageContactUs',

  components: {
    ContactInfo: () => import('@/components/contact-us/ContactInfo.vue'),
  },

  data: () => ({
    map: {
      height: '400px',
      center: {
        lng: -1.679560,
        lat: 54.976517,
      },
      zoom: 16,
    },
  }),

  head: () => ({
    title: 'Contact Us',
  }),
}
</script>
