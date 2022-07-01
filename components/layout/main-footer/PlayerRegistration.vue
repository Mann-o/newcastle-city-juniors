<template>
  <div class="px-8 pb-16 lg:px-0 lg:pb-0">
    <h4>Player Registration</h4>
    <p class="pb-4">
      Has your child been selected for the 2022-23 season following our open sessions? If so you can now register your player!
    </p>
    <template v-if="$auth.loggedIn">
      <p>Visit the <NuxtLink class="text-gold no-underline hover:underline" to="/portal">NCJ Portal</NuxtLink> to get started.</p>
    </template>
    <template v-else>
      <p class="pb-4">Already have an account? <NuxtLink class="text-gold no-underline hover:underline" to="/login">Login here</NuxtLink>.</p>
      <p>Not registered yet? <NuxtLink class="text-gold no-underline hover:underline" to="/register">Register here</NuxtLink>.</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PlayerRegistration',
}
</script>
