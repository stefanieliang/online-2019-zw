// 使用store实例
// Counter 组件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            return store.state.count;
        }
    }
}

// 通过注入store
// 根组件
import Vue from 'vue';
import Vuex form 'vuex';

Vue.use(Vuex);
const app = new Vue({
    el: '#app',
    store,
    components: {
        Counter
    },
    template: `
        <div class="app">
            <counter></counter>
        </div>
    `
})


// 用this.$store来代替store实例；
// Counter 组件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            return this.$store.state.count
        }
    }
}