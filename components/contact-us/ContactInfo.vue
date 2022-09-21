<template>
  <div class="bg-blackish text-white mt-8 p-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-16">
    <ContactInfoBlock
      icon="location-dot"
      label="Address"
    >
      <p>Newcastle City Juniors, Gibside Gardens<br>Benwell, NE15 7PP</p>
    </ContactInfoBlock>
    <ContactInfoBlock
      icon="envelope"
      label="Email"
    >
      <a
        href="mailto:info@newcastlecityjuniors.co.uk"
        class="text-white hover:text-gold"
      >
        info@newcastlecityjuniors.co.uk
      </a>
    </ContactInfoBlock>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',

  components: {
    ContactInfoBlock: () => import('./ContactInfoBlock.vue'),
  },
}
</script>
