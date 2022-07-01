<template>
  <nav>
    <ul class="flex flex-wrap gap-8 mb-12">
      <li v-for="link in links">
        <NuxtLink
          class="uppercase font-bold"
          :class="[
            link.path === '/portal'
              ? $route.path === link.path ? ['text-gold'] : ['text-black']
              : $route.path.startsWith(link.path) ? ['text-gold'] : ['text-black']
          ]"
          :to="link.path"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PortalNavigation',

  data: () => ({
    links: [
      { label: 'Dashboard', path: '/portal' },
      { label: 'Parents/Guardians', path: '/portal/parents' },
      { label: 'Players', path: '/portal/players' },
      { label: 'Payments', path: '/portal/payments' },
      { label: 'Account', path: '/portal/account' },
    ],
  }),
};
</script>
