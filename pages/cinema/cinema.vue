<template>
	<view>
		<view class="cinema-top">
			<!-- <view class="tops-item">
				<view class="cinema-img">
					<image :src="filmInfo.posterUrl"></image>
				</view>
				<view class="cinema-info">
					<view class="cinema-info-top">
						<view class="top-name">{{filmInfo.movieName}}</view>
						<view class="top-type">3D IMAX</view>
					</view>
					<view class="rate-item">
						<u-rate :count="5" :disabled="true" v-model="filmInfo.grade" inactive-color="#ffffff"
							active-color="#FF6E06" :size="30"></u-rate>
						<text class="rate-nun">{{filmInfo.grade}}</text>
					</view>
					<view class="list-type">{{filmInfo.movieType}}|{{filmInfo.duration}}分钟</view>
					<view class="list-type">{{filmInfo.publishDate}} 上映</view>
					<view class="list-type"><text>{{filmInfo.like}}</text>人想看</view>
				</view>
			</view> -->
		</view>

		<view class="cinema-down">
			<view class="down-city" @click="show = true">
				<text>{{position.city}}</text>
				<image src="../../static/images/movie-xiala.png"></image>
			</view>
			<view class="down-city" style="margin-left: 80rpx;">
				<text>全城</text>
				<image src="../../static/images/movie-xiala.png"></image>
			</view>
			<!-- <image src="../../static/images/movie-serchs.png" class="serchs"></image> -->
		</view>

		<view class="cinema-list" v-for="(value,index) in dataList" :key="index" @click="getDataUrl(value)">
			<view class="cinema-name">{{value.cinemaName}}</view>
			<view class="cinema-address-item">
				<view class="address-text">{{value.cinemaAddress}}</view>
				<view class="distance">{{value.distance}}km</view>
			</view>
			<!-- <view class="sessions">近期场次：05/29 10:15 I 05/29 12:15 I 05/29 14:15</view> -->
		</view>
	</view>
</template>

<script>
	
	// import {cinemaList,getCity} from "@/api/film.js"
	import config from "@/utils/config.js"
	export default {
		data() {
			return {
				rateValue: 3,
				filmInfo: {},
				position: {},
				dataList: [{
						cinemaAddress: "昌平区鼓楼南街佳莲时代广场四层",
						cinemaId: 760,
						cinemaName: "万达影城（北京昌平保利光魔店）",
						cinemaPhone: "010-60700001",
						distance: 0.3776,
						latitude: 40.2235877647,
						longitude: 116.233753059,
						regionName: "昌平区",
					},
					{
						cinemaAddress: "昌平区昌崔路203号果岭假日广场四楼",
						cinemaId: 753,
						cinemaName: "大地影院（北京菓岭假日店）",
						cinemaPhone: "010-89789220",
						distance: 2.7768,
						latitude: 40.2219721483,
						longitude: 116.2639110847,
						regionName: "昌平区",
					}
				],
				page: 1,
				originalData: [], //影院所有数据
				isPage: true,
				cityList: [],
				cityShowList: [],
				isLoad: false,
				show: false,
				keyWord: ''
			}
		},
		onReachBottom() {
			if (this.isPage) {
				this.page++
				this.getPageData()
			} else {
				this.$toast("没有更多了")
			}
		},
		onLoad(option) {
			uni.$ajax.get({url:'/movies',withCredentials: true})
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('filmDataFromOpene', function(data) {
				_this.filmInfo = data.data.info
				_this.position = data.data.position
				console.log(data.data.position)

			})

		},
		methods: {

			getDataUrl(data) {
				uni.navigateTo({
					url: '/pages/movie/choice-movie?movieId=' + this.filmInfo.movieId + '&item=' +
						encodeURIComponent(JSON.stringify(data))
				})
			},
		}
	}
</script>

<style lang="less">
	.cinema-top {
		display: flex;
		justify-content: space-between;
		// position: fixed;
		// #ifdef  H5
		top: 88rpx;
		// #endif
		// #ifdef  MP-WEIXIN
		top: 0;
		// #endif
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		padding: 30rpx 32rpx;
		z-index: 9999;
	}
	// .cinema-top {
	// 	background-color: #636775;
	// 	padding: 32rpx;
	// 	position: relative;

	// 	.tops-item {
	// 		display: flex;
	// 		align-items: center;
	// 		z-index: 9999;
	// 	}

	// 	.btins {
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		right: 0;
	// 		width: 100%;
	// 		height: 100%;
	// 		// z-index: 99;
	// 		filter: blur(15px);
	// 		-webkit-filter: blur(15px);
	// 	}

	// 	.cinema-img {
	// 		width: 180rpx;
	// 		height: 248rpx;

	// 		image {
	// 			width: 180rpx;
	// 			height: 248rpx;
	// 			border-radius: 20rpx;
	// 		}
	// 	}

	// 	.cinema-info {
	// 		margin-left: 30rpx;

	// 		.cinema-info-top {
	// 			display: flex;
	// 			align-items: center;

	// 			.top-name {
	// 				color: #FFFFFF;
	// 				font-size: 32rpx;
	// 				font-weight: 600;
	// 			}

	// 			.top-type {
	// 				background-color: #7B7B7B;
	// 				border-radius: 6rpx;
	// 				padding: 2rpx 8rpx;
	// 				color: #FFFFFF;
	// 				font-size: 17rpx;
	// 				margin-left: 30rpx;
	// 			}
	// 		}

	// 		.rate-item {
	// 			display: flex;
	// 			align-items: center;
	// 			margin-top: 16rpx;

	// 			.rate-nun {
	// 				color: #FF6E06;
	// 				font-size: 28rpx;
	// 				font-weight: 550;
	// 				margin-left: 16rpx;
	// 			}

	// 		}
	// 	}
	// }

	.list-type {
		color: #FFFFFF;
		font-size: 24rpx;
		margin-top: 12rpx;

		text {
			color: #FF6E06;
			font-size: 550;
			margin-right: 8rpx;
		}
	}

	.cinema-down {
		display: flex;
		align-items: center;
		padding: 22rpx 32rpx;
		border-bottom: 2rpx solid #DFE0E2;

		.down-city {
			display: flex;
			align-items: center;

			text {
				color: #636775;
				font-size: 28rpx;
			}

			image {
				width: 24rpx;
				height: 24rpx;
				margin-left: 8rpx;
			}
		}

		.serchs {
			margin-left: auto;
			width: 44rpx;
			height: 44rpx;
		}
	}

	.cinema-list {
		margin: 0rpx 32rpx;
		border-bottom: 2rpx solid #DFE0E2;
		padding: 32rpx 0rpx 40rpx 0rpx;

		.cinema-name {
			color: #2D3039;
			font-size: 32rpx;
			font-weight: 550;
		}

		.cinema-address-item {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;

			.address-text {
				color: #636775;
				font-size: 24rpx;
				width: 78%;
			}

			.distance {
				color: #636775;
				font-size: 28rpx;
			}
		}
	}

	.sessions {
		color: #636775;
		font-size: 24rpx;
		margin-top: 24rpx;
	}

	.region-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 20rpx;

		.region-left {
			width: 75%;
			border-radius: 40rpx;
			height: 68rpx;
			background-color: #F5F6F8;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
		}

		.region-val {
			width: 90%;
			font-size: 30rpx;
		}

		.region-btn {
			background: linear-gradient(207deg, #FF9272 0%, #FC5421 100%);
			border-radius: 50rpx;
			height: 68rpx;
			text-align: center;
			width: 140rpx;
			line-height: 68rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 550;
		}
	}

	.region-list {
		padding: 22rpx 35rpx;
		color: #2D3039;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid #E2E2E2;
	}

	.empty {
		text-align: center;
		padding-top: 30rpx;
		color: #787A82;
		font-size: 24rpx;
	}
</style>
