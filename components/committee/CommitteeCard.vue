<template>
  <div
    class="committee-card relative w-full mb-8 bg-cover bg-center overflow-hidden min-h-500"
    :style="committeeCardStyles"
  >
    <div class="committee-card__overlay p-4 absolute bottom-0 left-0 w-full transition-all bg-gold bg-opacity-75 text-sm lg:-bottom-20">
      <div class="font-bold uppercase mb-4">{{ member.name }}</div>
      <CommitteeCardRow
        label="Role"
        :value="member.role"
      />
      <CommitteeCardRow
        label="Telephone"
        :value="member.telephoneNumber"
        :link="telephoneLink"
      />
      <CommitteeCardRow
        label="Email"
        :value="member.emailAddress"
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
    committeeCardStyles () {
      return {
        backgroundImage: `url(${
          this.member.image != null
            ? this.member.image.url
            : 'https://via.placeholder.com/400x500'
        })`,
      }
    },
    telephoneLink () {
      return `tel:+44${this.member.telephoneNumber.slice(1)}`
    },
    emailLink () {
      return `mailto:${this.member.emailAddress}`
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
