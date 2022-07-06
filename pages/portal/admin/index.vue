<template>
  <ul>
    <li
      v-for="link in links"
      :key="link.path"
    >
      <NuxtLink :to="link.path">
        {{ link.label }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PagePortalAdminIndex',

  computed: {
    links() {
      return [
        ...(
          this.$auth?.user?.[0]?.permissions.some(({ name }) => name === 'view-players')
            ? [{ label: 'Players', path: '/portal/admin/players', icon: 'users-between-lines' }]
            : []
        ),
      ];
    },
  },
}
</script>
