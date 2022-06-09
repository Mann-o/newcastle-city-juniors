export const state = () => ({
  cart: [],
  metadata: null,
  presentationTicketInfo: {
    playerName: null,
    ageGroup: 'u6',
  },
})

export const actions = {
  addToCart({ dispatch, commit }, items) {
    commit('ADD_TO_CART', items)
    dispatch('app/openMiniCart', null, { root: true })
  },
  removeFromCart({ commit, getters }, item) {
    commit('REMOVE_FROM_CART', item)

    if (!getters.cartContainsPresentationTickets) {
      commit('RESET_PRESENTATION_TICKET_INFO')
    }
  },
  decreaseQuantityInCart({ commit, state }, item) {
    const itemInCart = state.cart.find(i => i.id === item.id)

    commit((itemInCart.quantity === 1 ? 'REMOVE_FROM_CART' : 'DECREASE_QUANTITY'), item)
  },
  increaseQuantityInCart({ commit }, item) {
    commit('INCREASE_QUANTITY', item)
  },
  addMetadata({ commit }, metadata) {
    commit('ADD_METADATA', metadata)
  },
  removeMetadata({ commit }, key) {
    commit('REMOVE_METADATA', key)
  },
  updateMetadata({ commit }, { key, value }) {
    commit('UPDATE_METADATA', { key, value })
  },
  updatePresentationTicketInfo({ commit }, $event) {
    commit('UPDATE_PRESENTATION_TICKET_INFO', {
      key: $event.target.name,
      value: $event.target.value,
    })
  },
}

export const mutations = {
  ADD_TO_CART(state, items) {
    const itemsArr = Array.isArray(items)
      ? items
      : [items]

    itemsArr.forEach(item => {
      const itemInCart = state.cart.find(i => i.id === item.id)

      if (itemInCart) {
        itemInCart.quantity += 1
      } else {
        state.cart.push({
          ...item,
          quantity: 1,
        })
      }
    })
  },
  REMOVE_FROM_CART(state, item) {
    const itemInCart = state.cart.indexOf(item)

    if (itemInCart > -1) {
      state.cart.splice(itemInCart, 1)
    }
  },
  DECREASE_QUANTITY(state, item) {
    const itemInCart = state.cart.find(p => p.id === item.id)

    if (itemInCart) {
      if (itemInCart.quantity === 1) {
        this.REMOVE_FROM_CART(state, item)
      } else {
        itemInCart.quantity -= 1;
      }
    }
  },
  INCREASE_QUANTITY(state, item) {
    const itemInCart = state.cart.find(p => p.id === item.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    }
  },
  ADD_METADATA(state, metadata) {
    state.metadata = {
      ...state.metadata,
      metadata,
    }
  },
  REMOVE_METADATA(state, key) {
    if (state.metadata[key]) {
      delete state.metadata[key]
    }
  },
  UPDATE_METADATA(state, { key, value }) {
    if (state.metadata[key]) {
      state.metadata[key] = value
    }
  },
  UPDATE_PRESENTATION_TICKET_INFO(state, { key, value }) {
    const trimmedValue = value === '' ? null : value
    state.presentationTicketInfo[key] = trimmedValue
  },
  RESET_PRESENTATION_TICKET_INFO(state) {
    state.presentationTicketInfo.playerName = null
    state.presentationTicketInfo.ageGroup = 'u6'
  },
}

export const getters = {
  cartItemCount(state) {
    return state.cart.length;
  },
  cartItemCountLabel(_, { cartItemCount }) {
    let label = `${cartItemCount} item`

    if (cartItemCount === 0 || cartItemCount > 1) {
      label += 's'
    }

    return label
  },
  cartItemDeepCount(state) {
    return state.cart.reduce((count, item) => count + item.quantity, 0)
  },
  cartIsEmpty(_, getters) {
    return getters.cartItemCount === 0
  },
  cartTotal(state) {
    const total = state.cart.reduce((total, item) => {
      return total + (item.unit_amount * item.quantity)
    }, 0)

    return total / 100
  },
  cartTotalString(_, getters) {
    return getters.cartTotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
  },
  cartContainsPresentationTickets(state) {
    return state.cart.some(item => item.product.name.includes('Presentation'))
  },
  quantityOfProductInCart: state => itemId => {
    return state.cart.find(item => item.id === itemId)?.quantity ?? 0;
  },
}
