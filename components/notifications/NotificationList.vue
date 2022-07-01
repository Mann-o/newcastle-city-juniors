<template>
  <div
    class="fixed left-2 right-2 flex flex-col-reverse gap-4 bottom-4 z-max md:left-auto md:right-8 md:w-1/4 md:top-36 md:bottom-auto"
  >
    <Notification
      v-for="(notification, index) in list"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationsList',

  components: {
    Notification: () => import('~/components/notifications/Notification.vue'),
  },

  computed: {
    ...mapGetters('notifications', [
      'list',
    ]),
  },
};
</script>

<static-query>
query NotificationList {
  contentfulConfiguration (id: "21F70dvehb9pjCFib6igEZ") {
    promoBar {
      show
    }
  }
}
</static-query>
