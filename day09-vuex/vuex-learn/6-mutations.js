const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})

store.commit('increment')


// payload
mutation: {
  increment (state, payload) {
      state.totalPrice += payload.price + payload.count;
  }
}

store.commit({
  type: 'increment',
  price: 10,
  count: 8
})
