<template>
  <ul class="grid gap-8 md:grid-cols-4">
    <li
      class="bg-grey-200 text-center"
      v-for="link in links"
      :key="link.path"
    >
      <NuxtLink
        class="block p-4 hover:text-black"
        :to="link.path"
      >
        <div class="flex flex-col gap-2">
          <div class="text-[3.6rem]">
            <FontAwesomeIcon :icon="['fad', link.icon]" />
          </div>
          <span class="font-bold uppercase">
            {{ link.label }}
          </span>
        </div>
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
            ? [
              { label: 'Players', path: '/portal/admin/players', icon: 'users-between-lines' },
              { label: 'Parent Emails', path: '/portal/admin/parent-emails', icon: 'envelope' },
            ]
            : []
        ),
        ...(
          this.$auth?.user?.[0]?.permissions.some(({ name }) => name === 'view-payments')
            ? [
              // { label: 'Payments', path: '/portal/admin/payments', icon: 'credit-card-front' },
              { label: 'Player Subs', path: '/portal/admin/subs-status', icon: 'arrows-repeat' },
              // { label: 'Presentation Tickets', path: '/portal/admin/presentation-tickets', icon: 'ticket' },
              // { label: 'Actions', path: '/portal/admin/actions', icon: 'rotate-right' },
            ]
            : []
        ),
      ];
    },
  },
}
</script>
