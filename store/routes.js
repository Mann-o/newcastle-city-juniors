const link = ({
  to,
  icon = null,
  label,
  alwaysDisplay = true,
  requiresAuth = false,
  hideWhenAuthenticated = false,
  children = [],
}) => ({
  to,
  icon,
  label,
  alwaysDisplay,
  requiresAuth,
  hideWhenAuthenticated,
  ...(children.length && {
    children,
    expanded: false,
  }),
})

export const state = () => ({
  routes: [
    link({
      to: '/',
      label: 'Home',
    }),
    link({
      to: '/about-us',
      label: 'About Us',
      children: [
        link({
          to: '/about-us/club-philosophy',
          label: 'Club Philosophy',
        }),
        link({
          to: '/about-us/club-committee',
          label: 'Club Committee',
        }),
        link({
          to: '/about-us/safeguarding',
          label: 'Safeguarding',
        }),
        link({
          to: '/about-us/anti-bullying',
          label: 'Anti-Bullying',
        }),
        link({
          to: '/about-us/complaints-procedure',
          label: 'Complaints Procedure',
        }),
      ],
    }),
    link({
      to: '/teams',
      label: 'Teams',
    }),
    link({
      to: '/shop',
      label: 'Shop',
    }),
    link({
      to: '/news-and-events',
      label: 'News',
    }),
    link({
      to: '/development-centre',
      label: 'Development Centre',
    }),
    link({
      to: '/holiday-camps',
      label: 'Holiday Camps',
    }),
    link({
      icon: 'futbol',
      to: '/portal',
      label: 'Portal',
    }),
  ],
})

export const actions = {
  toggleExpand ({ commit }, route) {
    commit('TOGGLE_EXPAND', route)
  },
  collapseAll ({ commit }) {
    commit('COLLAPSE_ALL')
  },
}

export const mutations = {
  TOGGLE_EXPAND: (state, routeToUpdate) => {
    const route = state.routes.find(route => route === routeToUpdate)
    route.expanded = !route.expanded
  },
  COLLAPSE_ALL: (state) => {
    state.routes.forEach((route) => {
      route.expanded = false
    })
  },
}
