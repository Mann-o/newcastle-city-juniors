const link = (to, label, children = []) => ({
  to,
  label,
  ...(children.length && {
    children,
    expanded: false,
  }),
})

export const state = () => ({
  routes: [
    link('/', 'Home'),
    link('/about-us', 'About Us', [
      link('/about-us/club-philosophy', 'Club Philosophy'),
      link('/about-us/club-committee', 'Club Committee'),
      link('/about-us/safeguarding', 'Safeguarding'),
      link('/about-us/anti-bullying', 'Anti-Bullying'),
      link('/about-us/complaints-procedure', 'Complaints Procedure'),
    ]),
    link('/teams', 'Our Teams'),
    link('/news-and-events', 'News & Events'),
    link('/newcastle-city-development-centre', 'Development Centre'),
    link('/holiday-camps', 'Holiday Camps'),
    // link('http://www.juvelounge.co.uk', 'Juve Lounge'),
    link('/contact-us', 'Contact Us'),
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
