// 1. 所有的状态从各个组件抽出来，放入了state中
state: {
    list: [],
    showChildComponent: true,
    message: '给各个组件的消息'
}

// 2. 现在给state中的list添加一个数据。vuex中就规定了我们必须通过commit mutations中的方法来做这件事：
state: {
    list: [],
    showChildComponent: true,
    message: '给各个组件的消息'
}
mutations: {
    add(state, data) {
        state.list.push(data)
    }
}

// 3. 现在，某个组件我们需要获得list中字符串长度大于10的所有数据，vuex中允许我们通过getters来获取：
state: {
    list: [],
    showChildComponent: true,
    message: '给各个组件的消息'
}
mutations: {
    add(state, data) {
        state.list.push(data)
    }
}
getters: {
    // 这个函数太过繁琐，用一句话实现！！！随堂联系
    filterList(state) {
        let len = state.list.length,
            newList;
        for(let i = 0; i < len; i++) {
            let element = state.list[i];
            element.length > 10 ? newList.push(element) : null;
        }
        return newList;
    }
}

// 4. 现在，某个组件需要我们需要在事件发生2秒后再向list中添加数据，这个时候我们必须用actions，还记得上面我们提到的吗，只有通过actions处理异步问题：
state: {
    list: [],
    showChildComponent: true,
    message: '给各个组件的消息'
}
mutations: {
    add(state, data) {
        state.list.push(data)
    }
}
getters: {
    // 这个函数太过繁琐，用一句话实现！！！随堂联系
    filterList(state) {
        let len = state.list.length,
            newList;
        for(let i = 0; i < len; i++) {
            let element = state.list[i];
            element.length > 10 ? newList.push(element) : null;
        }
        return newList;
    }
}
actions: {
    add({commit, state}, data) {
        setTimeout(() => {
            commit('add', data);
        }, 2000);
    }
}

// 5. 当代码量不断增多，这个容器的状态和Mutations，actions，getters都太多了时,我们可以把它们按自己的需求进行分类，分成几个module，每个module和上面一样由state，mutations，actions，getters组成：
import a from './modules/a.js'
import a from './modules/b.js'

const store = new Vuex.store({
    modules: {
        a,
        b
    }
});

// 6. 使用Vuex，vuex是vue的插件，我们使用前需要先引入它，然后全局注册这个插件:
import a from './modules/a.js'
import a from './modules/b.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.store({
    modules: {
        a,
        b
    }
})
export default store

// 7. 在入口文件中引入 该store并注册它：这样我们就能通过this.$store来获得这个容器了：

import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

new Vue({
    el: '#app'
    store,
    render: h => h(App)
})