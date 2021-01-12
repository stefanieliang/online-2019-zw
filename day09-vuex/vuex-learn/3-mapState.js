computed: {
    count () {
        return this.$store.state.count
    }
}

import { mapState } from 'vuex';

export default {
    computed: mapState ({
        count: state => state.count,
        countAlias: 'count',    // 别名 `count` 等价于 state => state.count
    })
}

computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
])