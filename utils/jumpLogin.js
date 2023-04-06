export function loginUrl() {
    // #ifdef MP-WEIXIN
		uni.navigateTo({
			url:'/pages/authorization/authorization'
		})
	// #endif
	// #ifdef H5
		uni.navigateTo({
			url:'/pages/login/login'
		})
	// #endif
}

export default {
    install(Vue) {
        Vue.prototype.$loginUrl = loginUrl
    }
}
