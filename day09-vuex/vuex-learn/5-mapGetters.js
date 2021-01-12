// 写法一：
computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
// 写法二：
computed: mapGetters([
    'doneTodosCount',
    'anotherGetter',
    // ...
    ])


// ...
computed: {
    mapState({ ... }),
    mapGetter({ ... })
}