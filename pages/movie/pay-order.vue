<template>
	<view>
		<view class="cinema-top">
			<view class="tops-item">
				<view class="cinema-img">
					<image src="https://hijinka.oss-cn-shanghai.aliyuncs.com/uploads/mall1/20210720/a74e4daa2598ebb16af2f4afd5e32478.png"></image>
				</view>
				<view class="cinema-info">
					<view class="top-name">悬崖之上</view>
					<view class="list-tel">5月29日 今天11:00~13:22（3D Luxe原版）</view>
					<view class="list-tel">红星电影世界上海吴中路旗舰店</view>
					<view class="list-tel">10号LUXE巨幕厅</view>
				</view>
			</view>
		</view>
		<view class="order-infos">
			<view>座位</view>
			<view>7排15座</view>
		</view>
		<view class="ticket-method">
			<view class="method-text">请选择购票方式</view>
			<view class="ticket-option" v-for="(value,index) in listData" :key="index" @click="choive(index)">
				<view class="option-img">
					<image :src="index==listIndex?'../../static/images/icon-choice-yes.png':'../../static/images/icon-choice-no.png'"></image>
				</view>
				<view class="option-info">
					<view class="option-top">
						<text class="opt-tel">{{value.title}}</text>
						<text class="opt-tag" v-if="value.type==0">推荐</text>
					</view>
					<view class="opt-time">
						预计出票时间<text>10:11 ~ 10:16</text>
					</view>
					<view class="opt-texts">价格优惠，耗时较长，适合时间充裕的用户。 出票后不支持改签、退款。</view>
				</view>
				<view class="option-price">
					<view style="display: flex;align-items: center;">
						￥<text>{{value.price}}</text>/张
					</view>
				</view>
			</view>
		</view>
		
		<view class="confirm-btn">确 认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[
					{title:'特惠购票',type:0,price:'94.38'},
					{title:'快速出票',type:1,price:'100.3'}
				],
				listIndex:0
			}
		},
		methods: {
			choive(index){
				if(this.listIndex!=index){
					this.listIndex=index
				}
			},
		}
	}
</script>

<style lang="less">
.cinema-top{
	background-color: #636775;
	padding: 32rpx 32rpx 70rpx 32rpx;
	position: relative;
	.tops-item{
		display: flex;
		align-items: center;
		z-index: 9999;
	}
	.cinema-img{
		width: 160rpx;
		height: 222rpx;
		image{
			width: 160rpx;
			height: 222rpx;
			border-radius: 20rpx;
		}
	}
	.cinema-info{
		margin-left: 30rpx;
		.top-name{
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 600;
		}
		.list-tel{
			color: #D8D8DD;
			font-size: 24rpx;
			margin-top: 10rpx;
		}
	}
}
.order-infos{
	background-color: #343F47;
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	height: 128rpx;
	display: flex;
	justify-content: space-between;
	padding: 30rpx 32rpx 0rpx 32rpx;
	position: absolute;
	top: 290rpx;
	left: 0;
	right: 0;
	color: #FFFFFF;
	font-size: 28rpx;
}
.ticket-method{
	border-radius: 30rpx 30rpx 20rpx 20rpx;
	background-color: #FFFFFF;
	padding: 0rpx 32rpx;
	position: absolute;
	top: 390rpx;
	left: 0;
	right: 0;
	.method-text{
		margin-top: 50rpx;
		color: #2D3039;
		font-size: 28rpx;
	}
}
.ticket-option{
	margin-top: 50rpx;
	display: flex;
	.option-img{
		width: 36rpx;
		height: 36rpx;
		margin-top: 10rpx;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.option-info{
		margin-left: 30rpx;
		width: 67%;
		.option-top{
			display: flex;
			align-items: center;
			.opt-tel{
				color: #2D3039;
				font-size: 28rpx;
				font-weight: 550;
			}
			.opt-tag{
				padding: 2rpx 8rpx;
				background-color: #FFE2E1;
				border-radius: 4rpx;
				color: #F03D38;
				font-size: 18rpx;
				margin-left: 12rpx;
			}
		}
		.opt-time{
			margin-top: 12rpx;
			color: #636775;
			font-size: 24rpx;
			text{
				color: #FE602B;
				font-weight: 550;
				margin-left: 12rpx;
			}
		}
		.opt-texts{
			color: #A6A8AE;
			font-size: 24rpx;
			margin-top: 7rpx;
		}
	}
	.option-price{
		margin-left: auto;
		color: #2D3039;
		font-size: 24rpx;
		text{
			font-size: 36rpx;
			margin: 0rpx 4rpx;
		}
	}
}
.confirm-btn{
	position: fixed;
	bottom: 70rpx;
	left: 50rpx;
	right: 50rpx;
	height: 110rpx;
	line-height: 110rpx;
	text-align: center;
	background: linear-gradient(207deg, #FF9272 0%, #FC5421 100%);
	border-radius: 55rpx;
	color: #FFFFFF;
	font-size: 36rpx;
	font-weight: 500;
}
</style>
