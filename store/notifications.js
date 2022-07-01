export default {
  namespaced: true,

  state: () => ({
    list: [],
  }),

  actions: {
    add: ({ commit, state }, notification) => {
      let timeout;

      // Remove the oldest notification so only 5 are visible at once
      if (state.list.length === 5) {
        commit('DISMISS_NOTIFICATION', state.list[0].raw);
      }

      // Set the duration of the notification
      notification.duration = notification.sticky ? 0 : (notification.duration || 5);

      // Make a non-sticky notification dismiss after its duration
      if (!notification.sticky) {
        timeout = setTimeout(() => {
          commit('DISMISS_NOTIFICATION', notification);
        }, notification.duration * 1000);
      }

      commit('ADD_NOTIFICATION', { raw: notification, timeout });
    },
    dismiss: ({ commit }, notification) => {
      commit('DISMISS_NOTIFICATION', notification);
    },
  },

  mutations: {
    ADD_NOTIFICATION: (state, notification) => state.list.push(notification),
    DISMISS_NOTIFICATION: (state, notification) => {
      // Find the notification we wish to dismiss
      const index = state.list
        .map(n => n.raw)
        .indexOf(notification);

      if (index !== -1) {
        const activeNotification = state.list[index];

        // Clear any timeouts on non-sticky notifications
        if (!activeNotification.sticky) {
          clearTimeout(activeNotification.timeout);
        }

        // Remove the notification
        state.list.splice(index, 1);
      }
    },
  },

  getters: {
    list: state => state.list.map(n => n.raw).reverse(),
  },
};
