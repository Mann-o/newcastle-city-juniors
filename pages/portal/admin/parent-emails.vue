<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred fetching parent emails!
    </div>

    <div class="text-xs" v-else>
      <button
        class="
          inline-block mb-8 mr-4 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
          hover:bg-black hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
        "
        :disabled="copying"
        @click="copyToClipboard()"
      >
        {{ copyButtonText }}
      </button>
      <a
        class="
          inline-block mb-8 py-2 px-4 bg-gold border border-black text-black uppercase font-bold transition-all
          hover:bg-black hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gold disabled:text-black
        "
        :href="`mailto:info@newcastlecityjuniors.co.uk?bcc=${parentEmails}`"
      >
        Send Email
      </a>
      <div>
        {{ parentEmails }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePortalAdminParentEmails',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
  },

  data: () => ({
    parentEmails: '',
    copying: false,
  }),

  async fetch() {
    const { data: { data } } = await this.$axios.get('/api/admin/parent-emails')

    this.parentEmails = data.parentEmails.map(email => email.toLowerCase()).join(',')
  },

  computed: {
    copyButtonText() {
      return this.copying ? 'Copied!' : 'Copy to Clipboard'
    },
  },

  methods: {
    copyToClipboard() {
      this.copying = true
      navigator.clipboard.writeText(this.parentEmails)
      setTimeout(() => {
        this.copying = false
      }, 1000)
    },
  },
}
</script>
