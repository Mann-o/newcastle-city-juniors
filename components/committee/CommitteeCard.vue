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
      :link="member.fields.telephoneNumber | telephoneNumberLink"
    />
    <CommitteeCardRow
      label="Email"
      :value="member.fields.emailAddress"
      :link="member.fields.emailAddress | emailAddressLink"
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
    name () {
      return this.$options.filters.fullName(
        this.member.fields.firstNames,
        this.member.fields.lastNames
      )
    },
  },
}
</script>
