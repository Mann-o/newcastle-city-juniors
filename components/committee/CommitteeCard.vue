<template>
  <div class="committee-card p-4 bg-gold text-sm lg:-bottom-20">
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
