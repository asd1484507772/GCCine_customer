/**
 * 只能通过提交 mutation 的方式，来改变state中的值
 * 因为vue想要更明确地追踪到状态的变化
 */
const state = {
	userInfo: uni.getStorageSync('userInfo') || {},
	openid: uni.getStorageSync('openid') || '',
	phone: uni.getStorageSync('phone') || '',
	token: uni.getStorageSync('token') || '',
	city: uni.getStorageSync('city') || '北京',
}

/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
 * mutation 必须是同步函数
 * 在组件中提交mutation: this.$store.commit('user/xxx')
 */
const mutations = {
	set_userInfo: (state, userInfo) => {
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
	},
	set_token: (state, token) => {
		state.token = token
		uni.setStorageSync('token', token)
	},
	set_phone: (state, phone) => {
		state.phone = phone
		uni.setStorageSync('phone', phone)
	},
	set_openid: (state, openid) => {
		state.openid = openid
		uni.setStorageSync('openid', openid)
	},
	set_city: (state, city) => {
		state.city = city
		uni.setStorageSync('city', city)
	},
}

/**
 * action 提交的是 mutation，而不是直接变更状态
 * action 可以包含任意异步操作
 * 在组件中访问action: this.$store.dispatch('user/xxx')
 */
const actions = {}

export default {
	// 加上 namespaced:true 的话，当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
	// 例如: this.$store.commit('user/xxx')
	namespaced: true,
	state,
	mutations,
	actions
}