const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment ({ commit }) {
        commit('increment')
      }
    }
  })


actions: {
    incrementAsync ({ commit }) {
        setTimeout(() => {
        commit('increment')
        }, 1000)
    }
}
// 以载荷形式分发
store.dispatch('incrementAsync', {
    amount: 10
})
// 以对象形式分发
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})