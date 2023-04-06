<template>
	<view>
		<view class="movie-position">
			<view class="position-text">{{cinemaInfo.cinemaName}}</view>
			<view class="position-item">
				<view class="item-texts">{{cinemaInfo.cinemaAddress}}</view>
				<view class="item-img-list">
					<image src="../../static/images/collection-icon.png" class="collion"></image>
					<image src="../../static/images/moivew-location.png" class="locaion-img"></image>
				</view>
			</view>
		</view>
		<!-- 轮播盒子 start -->
		<view class="swiper_main">
			<image class="background-img-vague" :src="chooseMovice.posterUrl" mode=""></image>
			<view class="wrap">
				<swipers :list="movieList" height="260" mode="none" name="posterUrl" :autoplay="false" img-mode="scaleToFill" class="swiper_bg"
				 :effect3d="true" bg-color="none" :circular="false" effect3d-previous-margin="280" @change="setBackground" @click="setBackground" :current="swiperCurrent"></swipers>
			</view>
			<div class="box"></div>
		</view>
		<!-- 轮播盒子 end -->
		
		<view class="moive-name">{{chooseMovice.movieName}}</view>
		<view class="moive-info">{{chooseMovice.duration}}分钟{{chooseMovice.movieType}}{{chooseMovice.cast}}</view>
		
		<view class="moive-tab-list">
			<view class="tabs-list-item" :class="{'tab-sel':index==tabIndexs}" v-for="(value,index) in tabLists" :key="index" @click="getTimeTab(value,index)">
				{{value.time}}
				<view class="bottoms" v-if="index==tabIndexs"></view>
			</view>
		</view>
		
		<view class="ticket-list" v-for="(value,index) in timeList" :key="index">
			<view style="width: 79%;">
				<view class="ticet-left">
					<view style="display: flex;align-items: center;">
						<text class="left-time">{{getTime(value.stopSellTime)}}</text>
						<text class="left-type">{{value.showVersionType}}</text>
					</view>
					<view style="display: flex;align-items: center;">
						<view class="ret-price"><text>￥</text>{{value.userPrice}}</view>
						<view class="ret-yuans">¥{{value.showPrice}}</view>
					</view>
				</view>
				<view class="ticet-left" style="margin-top: 20rpx;">
					<view class="ticet-booms">
						<text>时长:{{value.duration}}分钟</text>
						<text style="margin-left: 25rpx;">{{value.hallName}}</text>
					</view>
					<view class="ticet-boom-ret">
						<view class="sheng-text">省</view>
						<view class="sheng-pirce">¥{{province(value.showPrice,value.userPrice)}}</view>
					</view>
				</view>
			</view>
			<view class="buy-btns" @click="getGou(value)">购票</view>
		</view>
		
		<view v-if="isLoad&&timeList.length==0" style="text-align: center;padding-top: 30rpx;font-size: 28rpx;">暂无排片！</view>
		
		
	</view>
</template>

<script>
	import swipers from '@/components/u-swiper.vue'
	// import {filmList,filmScheduling} from "@/api/film.js"
	import config from "@/utils/config.js"
	export default {
		components:{swipers},
		data() {
			return {
				movieList: [
					{
						movieId:12343,
						duration:149,
						movieType:'剧情|历史|战争',
						cast:'吴京 易烊千玺 段奕宏 张涵予 朱亚文',
						movieName:'长津湖之水门桥',
						posterUrl: "https://gw.alicdn.com/i1/O1CN01sSmj2b1daSm6IAUcs_!!6000000003752-0-alipicbeacon.jpg_480x480Q30s150.jpg"
					},
					{
						cast: "易烊千玺 田雨 陈哈琳 齐溪 公磊 许君聪 王宁 黄尧 巩金国",
						duration: 106,
						movieId: 147885,
						movieName: "奇迹·笨小孩",
						movieType: "剧情",
						posterUrl: "https://gw.alicdn.com/i1/O1CN013Ggc2s1Z8HwrwxAfn_!!6000000003149-0-alipicbeacon.jpg_480x480Q30s150.jpg"
					}
					
				],
				//选中的电影
				chooseMovice: {
					movieId:'',
					duration:149,
					movieType:'剧情|历史|战争',
					cast:'吴京 易烊千玺 段奕宏 张涵予 朱亚文'
				}, 
				//swiper默认选中
				swiperCurrent: 0,
				
				tabIndexs:0,
				cinemaInfo:{},//影院信息
				tabLists:[
					{
						time: "05-14",
						list:[
							{
								duration: 149,
								hallName: "2号厅-口罩自备",
								movieId: 146629,
								showId: "MjUyNDkjQGltYW5tQCMxNDY2MjkjQGltYW5tQCMxNjUyNTI4NDAwI0BpbWFubUAjMTA5I0BpbWFubUAjNDk=",
								showPrice: 25.9,
								showTime: "2022-05-14 19:40:00",
								showVersionType: "国语 2D",
								stopSellTime: "2022-05-14 18:25:00",
								userPrice: 22.5,
							},
							{
								duration: 149,
								hallName: "7号厅-口罩自备",
								movieId: 146629,
								showId: "MjUyNDkjQGltYW5tQCMxNDY2MjkjQGltYW5tQCMxNjUyNTIzMDAwI0BpbWFubUAjMTA5I0BpbWFubUAjNDk=",
								showPrice: 24.9,
								showTime: "2022-05-14 18:10:00",
								showVersionType: "国语 2D",
								stopSellTime: "2022-05-14 16:55:00",
								userPrice: 21.7,
							}
						]
					}
				],
				timeList:[],//排期数据
				isLoad:false
			}
		},
		onLoad(option) {
			// this.swiperCurrent = 0
			// this.chooseMovice.movieId = option.movieId
			this.chooseMovice = this.movieList[0]
			this.timeList = this.tabLists[0].list
			this.cinemaInfo =JSON.parse(decodeURIComponent(option.item));
			
			// console.log(this.timeList)
		},
		methods: {
			
			// 切换轮播改变背景
			setBackground(index) {
				console.log(index)
				this.swiperCurrent = index
				this.chooseMovice = this.movieList[index]
				// this.getScheduling()
			},
			// getTimeTab(data,index){
			// 	if(this.tabIndexs!=index){
			// 		this.tabIndexs=index
			// 		this.timeList = data.list
			// 	}
			// },
			getTime(time){
				return config.turnTime(time,0)
			},
			getGou(data){
				// console.log(data)
				let _this = this
				uni.navigateTo({
					url:'/pages/movie/Seat?item='+encodeURIComponent(JSON.stringify(data))+'&cinemaId='+this.cinemaInfo.cinemaId,
					success(res) {
						 res.eventChannel.emit('moviceDataFrom', { data: _this.chooseMovice})
					}
				})
			},
			province(original,price){
				let val = original-price
				return Math.floor(val * 100) / 100
			},
		}
	}
</script>

<style lang="less">
// 轮播图中间
		.swiper_main {
			position: relative;
			height: 324rpx;
			overflow: hidden;

			.background-img-vague {
				position: absolute;
				left: 0;
				right: 0;
				width: 100%;
				// transform: translateX(-50%);
				filter: blur(15px);
				-webkit-filter: blur(15px);
			}

			/deep/.u-swiper-item {
				width: 193rpx !important;
				height: 260rpx !important;
			}

			// 影院背景图
			.moviebg {
				width: 100%;
				height: 100%;
				filter: blur(10rpx);
			}

			.wrap {
				position: absolute;
				left: 0;
				top: 26rpx;
				right: 0;
				margin: 0 auto;
			}

			.box {
				width: 0;
				height: 0;
				border: 10rpx solid;
				border-color: transparent transparent #fff #fff;
				transform: rotate(135deg);
				position: absolute;
				bottom: -10rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
			}

		}
		.movie-position{
			padding: 30rpx 32rpx;
			.position-text{
				color: #2D3039;
				font-size: 32rpx;
				font-weight: 550;
			}
			.position-item{
				display: flex;
				margin-top: 10rpx;
			}
			.item-texts{
				color: #636775;
				font-size: 24rpx;
				width: 72%;
			}
			.item-img-list{
				margin-left: auto;
				display: flex;
				// align-items: center;
				.collion{
					width: 48rpx;
					height: 48rpx;
					margin-right: 50rpx;
				}
				.locaion-img{
					width: 44rpx;
					height: 44rpx;
				}
			}
		}
		.moive-name{
			text-align: center;
			margin-top: 30rpx;
			color: #2D3039;
			font-size: 36rpx;
			font-weight: 600;
		}
		.moive-info{
			text-align: center;
			margin-top: 14rpx;
			color: #636775;
			font-size: 24rpx;
		}
		
		.moive-tab-list{
			margin-top: 40rpx;
			padding: 24rpx 12rpx;
			border-bottom: 2rpx solid #DFE0E2;
			overflow-x: auto;
			white-space:nowrap;
			width: auto;
			overflow-y: hidden;
			.tabs-list-item{
				padding: 0rpx 20rpx;
				display: inline-block;
				position: relative;
				color: #636775;
				font-size: 28rpx;
			}
			.tab-sel{
				color: #FE602B!important;
				font-size: 28rpx;
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
		
		.ticket-list{
			margin: 0rpx 32rpx;
			padding: 38rpx 0rpx;
			border-bottom: 2rpx solid #E0E1E3;
			display: flex;
			align-items: center;
			.ticet-left{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left-time{
					color: #2D3039;
					font-size: 42rpx;
				}
				.left-type{
					color: #2D3039;
					font-size: 28rpx;
					margin-left: 32rpx;
				}
			}
			.ret-price{
				color: #FE602B;
				font-size: 42rpx;
				font-weight: 550;
				text{
					font-size: 28rpx;
				}
			}
			.ret-yuans{
				color: #A6A8AE;
				font-size: 28rpx;
				margin-left: 13rpx;
				text-decoration: line-through;
			}
		}
		.ticet-booms{
			color: #A6A8AE;
			font-size: 24rpx;
		}
		.ticet-boom-ret{
			display: flex;
			align-items: center;
			.sheng-text{
				padding: 0rpx 8rpx;
				height: 30rpx;
				line-height: 30rpx;
				background-color: #3DB97C;
				border-radius: 4rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				text-align: center;
				margin-right: 12rpx;
			}
			.sheng-pirce{
				color: #A6A8AE;
				font-size: 24rpx;
			}
		}
		.buy-btns{
			width: 110rpx;
			height: 58rpx;
			text-align: center;
			line-height: 58rpx;
			background: linear-gradient(207deg, #FF9272 0%, #FC5421 100%);
			border-radius: 30rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 550;
			margin-left: auto;
		}
</style>
