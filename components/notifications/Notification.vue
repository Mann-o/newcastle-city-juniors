<template>
  <div
    class="font-times w-full relative min-h-20"
    :class="[
      ...(isError ? ['bg-danger', 'text-white'] : []),
      ...(isSuccess ? ['bg-success-bg', 'text-success'] : []),
      ...(isInfo ? ['bg-grey-200', 'text-black'] : []),
      ...(inline ? ['md:mb-12'] : []),
    ]"
  >
    <NotificationClose
      v-if="closeable"
      @dismiss="dismiss()"
    />
    <NotificationContent
      :title="notification.title"
      :text="notification.text"
      :sticky="notification.sticky"
      :inline="inline"
      :closeable="closeable"
    />
    <NotificationTimer
      v-if="!notification.sticky"
      :duration="notification.duration"
    />
  </div>
</template>

<script>
export default {
  name: 'Notification',

  components: {
    NotificationClose: () => import('./NotificationClose.vue'),
    NotificationContent: () => import('./NotificationContent.vue'),
    NotificationTimer: () => import('./NotificationTimer.vue'),
  },

  props: {
    notification: {
      type: Object,
      required: true,
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    notificationClass() {
      return `notification--${this.notification?.type ?? 'info'}`;
    },
    isError() {
      return this.notification?.type === 'error';
    },
    isSuccess() {
      return this.notification?.type === 'success';
    },
    isInfo() {
      return this.notification?.type == null
        || (
          this.notification?.type !== 'error'
          && this.notification?.type !== 'success'
        )
        || this.notification?.type === 'info';
    },
  },

  methods: {
    dismiss() {
      this.$store.dispatch('notifications/dismiss', this.notification);
      this.$emit('close');
    },
  },
};
</script>
