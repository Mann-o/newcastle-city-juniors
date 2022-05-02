export const state = () => ({
  cart: [],
  miniCartOpen: false,
})

export const actions = {
  addToCart({ commit }, items) {
    commit('ADD_TO_CART', items)
    commit('OPEN_MINI_CART')
  },
  removeFromCart({ commit }, item) {
    commit('REMOVE_FROM_CART', item)
  },
  decreaseQuantityInCart({ commit, state }, item) {
    const itemInCart = state.cart.find(i => i.id === item.id)

    commit((itemInCart.quantity === 1 ? 'REMOVE_FROM_CART' : 'DECREASE_QUANTITY'), item)
  },
  increaseQuantityInCart({ commit }, item) {
    commit('INCREASE_QUANTITY', item)
  },
  openMiniCart({ dispatch, commit }) {
    dispatch('app/showOverlay', null, { root: true })
    commit('OPEN_MINI_CART')
  },
  closeMiniCart({ dispatch, commit }) {
    dispatch('app/hideOverlay', null, { root: true })
    commit('CLOSE_MINI_CART')
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
      }
      itemInCart.quantity -= 1;
    }
  },
  INCREASE_QUANTITY(state, item) {
    const itemInCart = state.cart.find(p => p.id === item.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    }
  },
  OPEN_MINI_CART(state) {
    state.miniCartOpen = true;
  },
  CLOSE_MINI_CART(state) {
    state.miniCartOpen = false;
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
  cartIsEmpty(_, getters) {
    return getters.cartItemCount === 0
  },
  cartTotal(state) {
    const total = state.cart.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)

    return total / 100
  },
  cartTotalString(_, getters) {
    return getters.cartTotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
  },
}
