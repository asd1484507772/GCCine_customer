<template>
	<view>
		<view class="bottom-nar">
			<view class="nar-item">
				<image src="../static/images/choose-tongzhi.png"></image>
				<text>取单通知</text>
			</view>
			<view class="nar-item" @click="getUrl('/pages/orderFood/my-order-index')">
				<image src="../static/images/choose-orers.png"></image>
				<text>我的订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"order-boom-nav",
		data() {
			return {
				
			};
		},
		methods:{
			getUrl(url){
				if(uni.getStorageSync('token')){
					uni.navigateTo({
						url:url
					})
				}else{
					uni.navigateTo({
						url:'/pages/authorization/authorization'
					})
				}
			},
		},
	}
</script>

<style lang="less">
.bottom-nar{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #FFFFFF;
	height: 103rpx;
	z-index: 9999;
	display: flex;
	.nar-item{
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 103rpx;
		image{
			width: 40rpx;
			height: 40rpx;
			margin-right: 4rpx;
		}
		text{
			color: #636775;
			font-size: 28rpx;
			margin-left: 4rpx;
		}
	}
}
</style>
