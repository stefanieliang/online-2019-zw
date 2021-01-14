/**
 * @file router
 * @author ld
 */

export default class VueRouter {

	constructor(options) {
		// 记录一下配置项
		this.routes = options.routes;
		// 工具
		this.history = new History();
		this.history.listen(newHash => {
			this.vm.$forceUpdate();
		});
	}

	push(path) {
		this.history.push(path);
	}

	static install(Vue, options) {

		let count = 1
		Vue.mixin({
			created() {
				// 自查
				if (this.$options.router) {
					// 把自己挂到router上，方便调用
					this.$options.router.vm = this;
					// 
					this.$router = this.$options.router;
				} else {
					this.$router = this.$parent.$router;
				}
				console.log(count++, this instanceof Vue, this)
			}
		});

		Vue.component('router-view', {

			functional: true, // 函数式组件，只包含一些props，意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)

			// 为了弥补缺少的实例
			// 提供第二个参数作为上下文
			render(createElement, {
				props,
				children,
				parent
			}) {
				console.log('router-view::parent', parent)
				const currentHash = location.hash;
				const router = parent.$router;
				// console.log('$currentHash:', currentHash, router.routes);
				const currentRoute = matcher(currentHash, router.routes);

				// this.$parent.$options.router.routes
				// 拿到当前路径下应该对应的component
				return createElement(currentRoute.component);
			}

		});

		Vue.component('router-link', {
			render(createElement) {
				return createElement('span', {
					on: {
						click: this.clicking
					}
				}, this.$slots.default);
			},

			methods: {
				clicking() {
					window.history.back();
					//this.$parent.$router.back();
				}
			}
		});
	}

}

const matcher = (path, routesConfig) => {
	return routesConfig
		.find(route => {
			return route.path === path.replace(/^#/, '');
		});
};

class History {

	listen(callback) {
		window.addEventListener('hashchange', () => {
			callback && callback(window.location.hash);
		});
	}

	push(path) {
		window.location.hash = '#' + path;
	}
}