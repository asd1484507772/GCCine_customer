<template>
	<view class="wf-item-page ">
		<view class="goods-imgs">
			<image :src="item.cover_image"></image>
		</view>
		<view class="goods-info">
			<view class="goods-title">{{item.title}}</view>
			<view class="goods-pirces">
				<view class="yuanjiaes">¥{{item.price}}</view>
				<view class="reti-items">
					<image src="../../static/images/rebate-iconss.png"></image>
					<text class="repair">{{item.fl_commission}}</text>
				</view>
			</view>
			<view class="hand-price"><text class="iye">￥</text> {{item.discount_price}} <text class="is">到手价</text></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"WaterfallsFlowItem",
		props:{
			item:{
				type:Object,
				require:true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wf-item-page{
		background: #fff;
		overflow: hidden;
		border-radius: 20rpx;
		// padding: 10rpx;
	}
	.goods-imgs{
		width: 100%;
		height: 340rpx;
		position: relative;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #F2F2F2;
		image{
			width: 100%;
			height: 340rpx;
		}
	}
	.goods-info{
		padding: 20rpx 16rpx 24rpx 16rpx;
	}
	.goods-title{	
		color: #2D3039;
		font-size: 28rpx;
		font-weight: 550;
		 text-overflow: -o-ellipsis-lastline;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  line-clamp: 2;
		  -webkit-box-orient: vertical;
	}
	.goods-pirces{
		display: flex;
		align-items: center;
		.yuanjiaes{
			color: #A2A4AA;
			font-size: 28rpx;
			text-decoration: line-through;
			margin-top: 10rpx;
		}
		
	}
	.hand-price{
		color: #FF480A;
		font-size: 38rpx;
		font-weight: 550;
		margin-top: 6rpx;
		text{
			font-size: 24rpx;
		}
		.is{
			font-weight: 400;
			margin-left: 6rpx;
		}
		.iye{
			margin-right: 6rpx;
		}
	}
	
	.reti-items{
		width: 108rpx;
		height: 28rpx;
		margin-left: 8rpx;
		position: relative;
		image{
			width: 108rpx;
			height: 28rpx;
		}
		.repair{
			position: absolute;
			left: 24rpx;
			color: #FFFFFF;
			font-size: 18rpx;
			top: 3rpx;
		}
	}
</style>
