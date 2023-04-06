<template>
	<view>
		<view class="movie-top">
			<view class="top-region" @click="getShow">
				<text>{{cityInfo.city}}</text>
				<image src="../../static/images/movie-xiala.png"></image>
			</view>

			<view class="top-tab-list">
				<view class="tab-list-items" @click="gettab(value.type,index)"
					:class="{'sel-item':value.type==tanIndex}" v-for="(value,index) in tabLists" :key="index">
					{{value.text}}
					<view class="cut-img" v-if="tanIndex==value.type"></view>
				</view>
			</view>
			<!-- <image src="../../static/images/movie-serchs.png" class="sechut"></image> -->
		</view>
		<view class="movie-main">
			<List :tanIndex="tanIndex" :cityInfo="cityInfo" :items="dataList" :itemHeight="156" :showNumber="5" ></List>

		</view>


		<!-- <view class="movie-boom">
			<view class="movie-boom-item">
				<image
					src="https://hijinka.oss-cn-shanghai.aliyuncs.com/uploads/mall1/20220308/a55f9bd3766cde52ec9dba8ade8c83d3.png">
				</image>
				<view class="boom-item-text" style="color: #FE602B;">电影</view>
			</view>
			<view class="movie-boom-item" @click="getMy">
				<image
					src="https://hijinka.oss-cn-shanghai.aliyuncs.com/uploads/mall1/20220308/51ac5b0cd61fddc59d10c0a10791961d.png">
				</image>
				<view class="boom-item-text">我的</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	// import {filmList,getCity} from "@/api/film.js"
	import config from "@/utils/config.js"
	import ssSelectCity from '@/components/ss-select-city/index.vue'
	import List from "@/components/List/List.vue"
	export default {
		components: {
			ssSelectCity,
			List
		},
		data() {
			return {
				hotCitys: [
					'杭州',
					'天津',
					'北京',
					'上海',
					'深圳',
					'广州',
					'成都',
					'重庆',
					'厦门'
				],
				value: '杭州',
				tabLists: [{
						text: '正在热映',
						type: 1,
						isLoad: false,
						list: []
					},
					{
						text: '即将上映',
						type: 2,
						isLoad: false,
						list: []
					}
				],
				dataList: [{
						posterUrl: "https://gw.alicdn.com/i1/O1CN01sSmj2b1daSm6IAUcs_!!6000000003752-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "长津湖之水门桥",
						grade: "9.6",
						cast: "吴京 易烊千玺 段奕宏 张涵予 朱亚文 李晨 韩东君 耿乐 杜淳",
						director: "徐克",
						duration: 149,
						publishDate: "2022-02-01 08:00:00",
						like: 1155844,
						movieType: "剧情|历史|战争"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩1",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩奇迹·笨小孩",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩2",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩3",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩4",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩5",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩6",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩7",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "奇迹·笨小孩8",
						grade: "9.6",
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						director: "文牧野阿斯达大师大师大大萨达四大四大四大四大四大四大大萨达四大四大四大撒阿萨",
						duration: 106,
						publishDate: "2022-02-01 08:00:00",
						like: 686060,
						movieType: "剧情"
					},
					{
						posterUrl: "https://gw.alicdn.com/i1/O1CN01sSmj2b1daSm6IAUcs_!!6000000003752-0-alipicbeacon.jpg_480x480Q30s150.jpg",
						movieName: "长津湖之水门桥",
						grade: "9.6",
						cast: "吴京 易烊千玺 段奕宏 张涵予 朱亚文 李晨 韩东君 耿乐 杜淳",
						director: "徐克",
						duration: 149,
						publishDate: "2022-02-01 08:00:00",
						like: 1155844,
						movieType: "剧情|历史|战争"
					},
				],
				rateValue: 3,
				tanIndex:1,
				index: 0,
				show: false,
				cityList: [],
				keyWord: '',
				cityShowList: [],
				isLoad: false,
				cityInfo: {
					city: '北京'
				},
				wellList: [], //所有热映数据
				soonList: [], //所有即将上映数据
				page: 1
			}
		},
		onLoad() {


			// this.getList()
			// this.getCityList()
		},
		onReachBottom() {
			// this.page++
			// if(this.tanIndex==1){
			// 	this.dataList = this.dataList.concat(config.pageDataFn(this.page,8,this.wellList))
			// }else{
			// 	this.dataList = this.dataList.concat(config.pageDataFn(this.page,8,this.soonList))
			// }
		},
		methods: {
			getShow() {
				this.show = !this.show
			},

			
			gettab(type, index) {
				this.index = index
				if (this.tanIndex != type) {
					this.tanIndex = type
				}
			},
			getMy() {
				uni.redirectTo({
					url: '/pages/movie/moive-my'
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F4F5F7;
		
	}
	.movie-top {
		display: flex;
		justify-content: space-between;
		position: sticky;
		// #ifdef  H5
		top: 0;
		// #endif
		// #ifdef  MP-WEIXIN
		top: 0;
		// #endif
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		padding: 30rpx 32rpx;
		// margin-top: 60rpx;
		z-index: 9999;
	}

	.top-region {
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

	.top-tab-list {
		// margin-left: 110rpx;
		display: flex;
		align-items: center;

		.tab-list-items {
			color: #636775;
			font-size: 28rpx;
			padding: 0rpx 25rpx;
			position: relative;
		}

		.sel-item {
			color: #2D3039 !important;
			font-size: 32rpx !important;
			font-weight: 600;
		}

		.cut-img {
			width: 52rpx;
			height: 8rpx;
			position: absolute;
			bottom: -30rpx;
			right: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #FE602B;
		}
	}

	.sechut {
		margin-left: auto;
		width: 44rpx;
		height: 44rpx;
	}

	.movie-main {
		
	}

	// .movie-list {
	// 	margin: 20rpx 25rpx 0rpx 25rpx;
	// 	background-color: #FFFFFF;
	// 	border-radius: 20rpx;
	// 	padding: 28rpx 32rpx;
	// 	display: flex;
	// 	align-items: center;

	// 	.movie-img {
	// 		width: 180rpx;
	// 		height: 248rpx;

	// 		image {
	// 			width: 180rpx;
	// 			height: 248rpx;
	// 			border-radius: 20rpx;
	// 		}

	// 	}

	// 	.movie-info {
	// 		margin-left: 24rpx;
	// 		width: 50%;

	// 		.mo-info-top {
	// 			display: flex;
	// 			align-items: center;

	// 			.tiel {
	// 				color: #2D3039;
	// 				font-size: 32rpx;
	// 				font-weight: 600;
	// 			}

	// 			.movie-d {
	// 				margin-left: 20rpx;
	// 				border-radius: 6rpx;
	// 				border: 1rpx solid #C4C4C4;
	// 				color: #A6A8AE;
	// 				font-size: 17rpx;

	// 				.zimu {
	// 					padding: 2rpx 6rpx;
	// 				}

	// 				.shuzi {
	// 					background-color: #C4C4C4;
	// 					padding: 0rpx 6rpx;
	// 					color: #FFFFFF;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// .rate-item {
	// 	display: flex;
	// 	align-items: center;
	// 	margin-top: 16rpx;

	// 	.rate-nun {
	// 		color: #FF6E06;
	// 		font-size: 28rpx;
	// 		font-weight: 550;
	// 		margin-left: 16rpx;
	// 	}

	// }

	// .director {
	// 	color: #636775;
	// 	font-size: 24rpx;
	// 	margin-top: 16rpx;
	// }

	// .to-star {
	// 	color: #787A82;
	// 	font-size: 24rpx;
	// 	margin-top: 10rpx;
	// 	overflow: hidden;
	// 	text-overflow: ellipsis;
	// 	white-space: nowrap;
	// }

	// .calss-item {
	// 	display: flex;
	// 	align-items: center;
	// 	margin-top: 12rpx;

	// 	.classify-item {
	// 		padding: 6rpx 12rpx;
	// 		border-radius: 6rpx;
	// 		border: 2rpx solid #DADCE4;
	// 		color: #A6A8AE;
	// 		font-size: 20rpx;
	// 	}
	// }

	// .movie-btns {
	// 	margin-left: auto;
	// 	width: 110rpx;
	// 	height: 58rpx;
	// 	background: linear-gradient(207deg, #fb54aa; 0%, #fb5773 100%);
	// 	border-radius: 29rpx;
	// 	text-align: center;
	// 	line-height: 58rpx;
	// 	color: #FFFFFF;
	// 	font-size: 24rpx;
	// 	font-weight: 550;
	// }

	// .movie-btns-presale {
	// 	margin-left: auto;
	// 	width: 110rpx;
	// 	height: 58rpx;
	// 	background: linear-gradient(207deg, #51c4d3; 0%, #2486b9 100%);
	// 	border-radius: 29rpx;
	// 	text-align: center;
	// 	line-height: 58rpx;
	// 	color: #FFFFFF;
	// 	font-size: 24rpx;
	// 	font-weight: 550;
	// }

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

	.movie-boom {
		display: flex;
		align-items: center;
		padding-top: 16rpx;
		padding-bottom: 4rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		.movie-boom-item {
			width: 50%;
			text-align: center;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.boom-item-text {
				color: #A2A4AA;
				font-size: 20rpx;
			}
		}
	}
</style>
