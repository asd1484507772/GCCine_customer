<template>
	<view>
		<view class="tick-tab-list">
			<view class="tick-tab-item" @click="getTab(index)" :class="{'tab-sel':index==tabIndex}" v-for="(value,index) in tabList" :key="index">
				{{value.text}}
				<view class="bottoms" v-if="index==tabIndex"></view>
			</view>
		</view>
		
		<view class="tick-lists" v-for="(value,index) in dataList" :key="index" @click="getDetails(value)">
			<view class="tick-list-top">
				<view class="tock-shop-name">{{value.movie_info.cinemaName}}</view>
				<view class="tock-list-status" v-if="value.status==0">待支付</view>
				<view class="tock-list-status" v-if="value.status==1">待出票</view>
				<view class="tock-list-status" v-if="value.status==2">已出票</view>
				<view class="tock-list-status" v-if="value.status==3">出票失败</view>
				<view class="tock-list-status" v-if="value.status==4">已完成</view>
				<view class="tock-list-status" v-if="value.status==5">售后</view>
			</view>
			<view class="tick-list-info">
				<view class="film-cover">
					<image :src="value.movie_info.posterUrl"></image>
				</view>
				<view class="film-list-ret">
					<view class="film-name">{{value.movie_info.movie_name}}</view>
					<view class="film-time">{{value.showInfor.length}}张 I {{value.movie_info.time}}</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	// import {getOrderList} from "@/api/film.js"
	export default {
		data() {
			return {
				tabList:[
					{text:'全部'},
					{text:'待付款'},
					{text:'待出票'},
					{text:'待收货'},
					{text:'已完成'},
					{text:'退款'},
				],
				tabIndex:0,
				page:1,
				dataList:[],
				isPage:true
			}
		},
		onReachBottom() {
			if(this.isPage){
				this.page++
				this.getData()
			}
			
		},
		onLoad() {
			// this.getData()
		},
		methods: {
			getTab(index){
				if(this.tabIndex!=index){
					this.tabIndex=index
					this.page = 1
					this.isPage = true
					this.dataList = []
					// this.getData()
				}
			},
		}
	}
</script>

<style lang="less">
page{
	background-color: #F4F5F7;
}
.tick-tab-list{
	display: flex;
	background-color: #FFFFFF;
	padding: 30rpx 0rpx;
	align-items: center;
	.tick-tab-item{
		width: 16.66%;
		text-align: center;
		color: #636775;
		font-size: 28rpx;
		position: relative;
	}
	.tab-sel{
		color: #2D3039!important;
		font-size: 32rpx!important;
		font-weight: 550;
	}
	.bottoms{
		position: absolute;
		bottom: -30rpx;
		right:50%;
		left:50%;
		transform: translate(-50%, -50%);
		width: 52rpx;
		height: 8rpx;
		background-color: #FE602B;
		// border-radius: 5rpx 5rpx 0px 0px;
	}
}
.tick-lists{
	margin: 20rpx 32rpx 0rpx 32rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	padding: 30rpx 32rpx;
	.tick-list-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tock-shop-name{
			color: #636775;
			font-size: 28rpx;
			width: 80%;
		}
		.tock-list-status{
			color: #FE602B;
			font-size: 28rpxsssssssss;
		}
	}
	.tick-list-info{
		margin-top: 28rpx;
		display: flex;
		.film-cover{
			width: 116rpx;
			height: 140rpx;
			image{
				width: 116rpx;
				height: 140rpx;
				border-radius: 10rpx;
			}
		}
		.film-list-ret{
			margin-left: 20rpx;
			.film-name{
				color: #2D3039;
				font-size: 32rpx;
				font-weight: 550;
				margin-top: 8rpx;
			}
			.film-time{
				color: #636775;
				font-size: 28rpx;
				margin-top: 16rpx;
			}
		}
	}
}
</style>
