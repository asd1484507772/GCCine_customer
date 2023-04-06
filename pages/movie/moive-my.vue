<template>
	<view>
		<view class="miv-my-top">
			<image src="../../static/images/moive-my-bg.png"></image>
		</view>
		<view class="my-main">
			<view class="my-moive-order">
				<view class="orer-top">
					<view class="order-text">电影订单</view>
					<view class="order-rets">
						<text>全部订单</text>
						<image src="../../static/images/go-icons.png"></image>
					</view>
				</view>
				
				<view class="ordere-tab-cart" @click="getOrderList">
					<view class="order-tab-item">
						<image src="../../static/images/moive-my-daichupiao.png"></image>
						<view class="tabs-text">待出票</view>
					</view>
					<view class="order-tab-item">
						<image src="../../static/images/moive-my-chupiao.png"></image>
						<view class="tabs-text">已出票</view>
					</view>
					<view class="order-tab-item">
						<image src="../../static/images/moive-my-quxiao.png"></image>
						<view class="tabs-text">已取消</view>
					</view>
				</view>
			</view>
			
			
			<view class="my-record-cart">
				<view class="my-record-text">我的记录</view>
				<view class="my-record-list">
					<view class="my-record-item">
						<view class="record-item-img"></view>
						<view class="record-item-info">
							<view class="record-info-tel">想看</view>
							<view class="record-info-num">共0部</view>
						</view>
					</view>
					<view class="my-record-item">
						<view class="record-item-img"></view>
						<view class="record-item-info">
							<view class="record-info-tel">看过</view>
							<view class="record-info-num">共0部</view>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="movie-boom">
			<view class="movie-boom-item" @click="getHome">
				<image src="https://hijinka.oss-cn-shanghai.aliyuncs.com/uploads/mall1/20220308/08d86bdb75038ff5577cc38a6256189e.png"></image>
				<view class="boom-item-text">电影</view>
			</view>
			<view class="movie-boom-item">
				<image src="https://hijinka.oss-cn-shanghai.aliyuncs.com/uploads/mall1/20220308/b323a0d5a4a616ba48ca6b659eb43e43.png"></image>
				<view class="boom-item-text" style="color: #FE602B;">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getHome(){
				uni.redirectTo({
					url:'/pages/movie/index'
				})
			},
			getOrderList(){
				uni.navigateTo({
					url:'/pages/movie/my-ticket'
				})
			},
		}
	}
</script>

<style lang="less">
page{
	background-color: #F4F5F7;
}
.miv-my-top{
	height: 229rpx;
	image{
		width: 100%;
		height: 229rpx;
	}
}
.my-main{
	position: absolute;
	top: 60rpx;
	left: 0;
	right: 0;
	padding: 0rpx 32rpx;
}
.my-moive-order{
	background-color: #FFFFFF;
	border-radius: 20rpx;
	padding: 40rpx 32rpx;
	.orer-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.order-text{
			color: #2D3039;
			font-size: 32rpx;
			font-weight: 550;
		}
		.order-rets{
			display: flex;
			align-items: center;
			text{
				color: #A6A8AE;
				font-size: 28rpx;
			}
			image{
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
}
.ordere-tab-cart{
	margin-top: 50rpx;
	display: flex;
	.order-tab-item{
		width: 33.33%;
		text-align: center;
		.tabs-text{
			color: #636775;
			font-size: 24rpx;
		}
		image{
			width: 64rpx;
			height: 64rpx;
		}
	}
}
.my-record-cart{
	margin-top: 20rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	padding: 40rpx 32rpx;
	.my-record-text{
		color: #2D3039;
		font-size: 32rpx;
		font-weight: 550;
	}
	.my-record-list{
		display: flex;
		margin-top: 36rpx;
		.my-record-item{
			width: 50%;
			display: flex;
			.record-item-img{
				width: 144rpx;
				height: 174rpx;
				border-radius: 16rpx;
				background-color: #F3F4F7;
			}
			.record-item-info{
				margin-left: 24rpx;
				.record-info-tel{
					color: #2D3039;
					font-size: 28rpx;
					font-weight: 550;
					margin-top: 18rpx;
				}
				.record-info-num{
					color: #A6A8AE;
					font-size: 24rpx;
					margin-top: 11rpx;
				}
			}
		}
	}
}

.movie-boom{
		display: flex;
		align-items: center;
		padding-top: 16rpx;
		padding-bottom: 4rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		.movie-boom-item{
			width: 50%;
			text-align: center;
			image{
				width: 48rpx;
				height: 48rpx;
			}
			.boom-item-text{
				color: #A2A4AA;
				font-size: 20rpx;
			}
		}
	}
</style>
