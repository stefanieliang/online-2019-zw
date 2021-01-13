/**
 * @file 
 * @author ld
 */
import echarts from 'echarts';
// let echarts = window.echarts;

// 节流，只执行第一次！后续的全 return。
// 场景：下拉刷新
const createThrottle = (fn, delay = 1000) => {
    let status = 'START';
    return () => {
        if (status === 'WAITING') {
            return;
        }
        status = 'WAITING';
        setTimeout(() => {
            fn && fn();
            status = 'START';
        }, delay);
    };
};

// 只执行最后一次！ 之前的全 clear。
// 场景： 搜索输入框
const createDebounce = (fn, delay = 1000) => {

    let timmer = null;

    return args => {
        clearTimeout(timmer);
        timmer = setTimeout(() => {
            fn && fn(args);
        }, delay);
    };
};

export const reachBottomNotify = {

    install: (Vue, options) => {

        Vue.mixin({

            data() {
                const data = {
                    scrollQueue: [],
                };
                return this.onReachBottom ? data : {};
            },

            created() {
                if (typeof this.onReachBottom === 'function') {
                    this.scrollQueue.push(() => {
                        this.onReachBottom();
                    });
                    this._listenScroll();
                }
            },

            methods: {

                _listenScroll() {

                    const THRESHOLD = 50;
                    const throttle = createThrottle(() => {
                        this.scrollQueue.forEach(func => func());
                    });

                    // const debounce = createDebounce(() => {
                    //     this.scrollQueue.forEach(func => func());
                    // });

                    window.addEventListener('scroll', () => {
                        const offsetHeight = document.documentElement.offsetHeight;
                        const screenHeight = window.screen.height;
                        const scrollY = window.scrollY;
                        const gap = offsetHeight - screenHeight - scrollY;
                        if (gap < THRESHOLD) {
                            throttle();
                            // debounce();
                        }
                    });

                }
            }
        });

    }
};

export const functionalTool = {

    install: (Vue, options) => {

        Vue.mixin({
            methods: {
                createDebounce,
                createThrottle
            }
        });

        Vue.component('echarts', {

            props: {

                area: '',

                width: {
                    type: Number,
                    default: -1
                },

                height: {
                    type: Number,
                    default: -1
                },


                options: {
                    type: Object,
                    default: {}
                }

            },

            render(createElement) {

                return createElement(
                    'div', {
                        attrs: {
                            id: this.randomId
                        },
                        style: this.canvasStyle,
                        directives: [{
                            name: 'echarts'
                        }]
                    }
                );
            },


            mounted() {

                this.draw();

                this.$watch('options', function () {
                    this.draw();
                });
            },

            computed: {

                randomId() {
                    return 'echarts-' + Math.floor(Math.random() * 10);
                },

                canvasStyle() {
                    return {
                        height: this.height === -1 ? '100%' : this.height + 'px',
                        width: this.width === -1 ? '100%' : this.width + 'px'
                    }
                },

                drawOptions() {
                    const coloredData = this.options.series.data.map(item => {
                        if (item._area === this.area) {
                            return {
                                ...item,
                                itemStyle: {
                                    color: '#0f0'
                                }
                            };
                        }
                        return item;
                    });

                    return {
                        ...this.options,
                        series: {
                            ...this.options.series,
                            data: coloredData
                        }
                    };
                }
            },

            methods: {

                recieveEchartsContext(context) {
                    this.echartsContext = context;
                },

                draw() {
                    const options = this.drawOptions;
                    this.echartsContext.setOption(options);
                }

            }
        });

        Vue.directive('echarts', {
            inserted: (el, binding, vnode) => {
                const charts = echarts.init(el);
                vnode.context.recieveEchartsContext && vnode.context.recieveEchartsContext(charts);
            }
        });
    }

}