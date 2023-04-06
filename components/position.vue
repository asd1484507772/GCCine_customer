<template>
	<view class="page">
		<view class="title">
			<!-- <view style="display: flex; align-items: flex-end;" data-url="/subPackage/pages/switch_city/switch_city" @tap.stop="navTo"> -->
			<view style="display: flex; align-items: flex-end;">
				<view style="white-space: nowrap;" @click="goLocaltion(city,area,city_code)">
					{{city}}-{{area==''? '暂未选择区/县': area}}</view>
				<view class="rbtriangle"></view>
			</view>
			<view class="search_ipt" :class="{hasresume:isresume == false}">
				<text class="iconfont iconsearch" style="margin-right: 10rpx;"></text>
				<input type="text" :placeholder="placeholder" v-model="keywords" confirm-type="搜索"
					@confirm="initJob(keywords)" />
			</view>
			<image src="../../static/images/intro.png" :data-url="'/pages/historyCompany/historyCompany?type=1'"
				@tap.stop="navTo" v-show="isresume"></image>
		</view>
		<!-- <xunlan_swiper :data="swiperlist" :height="'280'" v-if="isshow"></xunlan_swiper> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
			}
		},
		props: {
			isshow: {
				default: true,
				type: Boolean
			},
			swiperlist: {
				default: () => [],
				type: Array
			},
			isresume: {
				default: true,
				type: Boolean
			},
			placeholder: {
				default: 0,
				type: String
			},
			city: {
				default: '',
				type: String
			},
			area: {
				default: '',
				type: String
			},
			city_code: {
				default: '',
				type: String
			}
		},
		methods: {
			// 直接进行跳转
			navTo(e) {
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				})
			},
			initJob() {
				this.$emit("pinitJob", this.keywords)
			},
			// 页面跳转进行修改数据
			goLocaltion(city, area, city_code) {
				uni.navigateTo({
					// 传递需要的值，通过ES6进行拼接
					url: `../../pages/index/xxxx?city=${city}&area=${area}&city_code=${city_code}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 样式
	.page {
		position: relative;
		background-color: #FFFFFF;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		font-size: 26rpx;
		color: #474754;

		image {
			width: 80rpx;
			height: 80rpx;
		}
	}

	.rbtriangle {
		width: 0;
		height: 0;
		border-bottom: 10rpx solid black;
		border-left: 10rpx solid transparent;
		margin: 0 20rpx;
	}

	.search_ipt {
		display: flex;
		align-items: center;
		width: 396rpx;
		height: 80rpx;
		padding: 10rpx;
		border-radius: 14rpx;
		background-color: #F5F6FA;
	}

	.hasresume {
		width: 500rpx;
	}
</style>
