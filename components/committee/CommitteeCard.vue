<template>
  <div
    class="committee-card relative w-full mb-8 bg-cover bg-center overflow-hidden min-h-500"
    :style="committeeCardStyles"
  >
    <div class="committee-card__overlay p-4 absolute bottom-0 left-0 w-full transition-all bg-gold bg-opacity-75 text-sm lg:-bottom-20">
      <div class="font-bold uppercase mb-4">
        {{ name }}
      </div>
      <CommitteeCardRow
        label="Role"
        :value="member.fields.role"
      />
      <CommitteeCardRow
        label="Telephone"
        :value="member.fields.telephoneNumber"
        :link="telephoneLink"
      />
      <CommitteeCardRow
        label="Email"
        :value="member.fields.emailAddress"
        :link="emailLink"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommitteeCard',

  components: {
    CommitteeCardRow: () => import('./CommitteeCardRow.vue'),
  },

  props: {
    member: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /** @returns {object} */
    committeeCardStyles () {
      return {
        backgroundImage: `url(${
          this.member.fields.portraitImage != null
            ? this.member.fields.portraitImage.url
            : 'https://via.placeholder.com/400x500'
        })`,
      }
    },
    /** @returns {string} */
    telephoneLink () {
      return `tel:+44${
        this.member.fields.telephoneNumber
          .replace(/ /g, '')
          .slice(1)
      }`
    },
    /** @returns {string} */
    emailLink () {
      return `mailto:${this.member.fields.emailAddress}`
    },
    /** @returns {string} */
    name () {
      let name = this.member.fields.firstNames

      if (this.member.fields.lastNames) {
        name += ` ${this.member.fields.lastNames}`
      }

      return name
    },
  },
}
</script>

<style lang="postcss">
@screen lg {
  .committee-card:hover .committee-card__overlay {
    @apply opacity-100 bottom-0;
  }
}
</style>
