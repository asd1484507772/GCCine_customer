export function success(title) {
    uni.showToast({
        title: title,
        icon: 'success',
        duration: 2000
    })
}

export function fail(title) {
    uni.showToast({
        title: title,
        image: '/static/images/fail-icon.png',
        duration: 2000
    })
}

export function toast(title) {
    uni.showToast({
        title: title,
        icon: 'none',
        duration: 2000,
		mask:true
    })
}

export function showLoading(title) {
    uni.showLoading({
        title: title || '加载中'
    })
}
//执行上一个页面的方法
export function pageMethod(data) {
    let pages = getCurrentPages();
    let beforePage = pages[pages.length - 2];
	console.log(beforePage)
    beforePage.$vm.getPageMethod(data)
    uni.navigateBack()
}

export function closeLoading() {
    uni.hideLoading()
}

export default {
    install(Vue) {
        const $loading = {}
        $loading['show'] = showLoading
        $loading['close'] = closeLoading
        Vue.prototype.$toast = toast
		Vue.prototype.$pages = pageMethod
        Vue.prototype.$toast['success'] = success
        Vue.prototype.$toast['fail'] = fail
        Vue.prototype.$loading = $loading
    }
}
