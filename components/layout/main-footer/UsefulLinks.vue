<template>
  <div class="px-8 pb-16 md:px-0 md:pb-0">
    <h4>Useful Links</h4>
    <nav>
      <ul>
        <UsefulLink
          to="/"
          label="Home"
        />
        <UsefulLink
          to="/about-us"
          label="About Us"
        />
        <UsefulLink
          to="/about-us/anti-bullying"
          label="Anti Bullying Policy"
        />
        <UsefulLink
          to="/about-us/complaints-procedure"
          label="Complaints Policy"
        />
        <UsefulLink
          to="/about-us/safeguarding"
          label="Safeguarding Children"
        />
        <UsefulLink
          to="/files/sponsor-form.pdf"
          label="Sponsor Form"
          external
        />
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'UsefulLinks',

  components: {
    UsefulLink: () => import('./UsefulLink.vue'),
  },
}
</script>
