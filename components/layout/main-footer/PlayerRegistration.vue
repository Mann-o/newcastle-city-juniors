<template>
  <div class="px-8 pb-16 lg:px-0 lg:pb-0">
    <h4>Player Registration</h4>
    <p class="pb-4">
      Is your child looking for a new challenge? We have teams from U7 to U16 for boys and girls, and we are now accepting online player registrations for the 2021-22 season!
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
