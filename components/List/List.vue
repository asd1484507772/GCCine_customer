<template>
	<view>
		
	
	<!-- <view class="container"    @scroll="handleScroll" ref="container"> -->
		<scroll-view  scroll-y="true" class="scroll-box" :style="{ height: scrollBoxHeight }" @scroll.passive="handleScroll" @scrolltolower="handleScrollToLower">
					<view class="movie-list" :style="{ top: listTop + 'px'}">
						
						<view class="movie-card" v-for="(value,index) in showList" :key="index"  :style="{ height: itemHeight + 'px' }" @click="getUrl(value)">
							<!-- 电影图片 -->
							<view class="movie-img">
								<image :src="value.posterUrl"></image>
								<view class="movie-projectionFormat"><text class="screen">IMAX</text><text class="dimension">2D</text></view>
							</view>
							<!-- 电影信息 -->
							<view class="movie-info">
								<!-- 电影名 -->
								<view class="movie-info-top">
									<view class="movie-name">{{value.movieName}}</view>
								</view>
								<!-- 电影评分 -->
								<view class="movie-rate">
									<u-rate :count="5" v-model="value.grade" active-color="#FF6E06" :size="30"></u-rate>
									<text class="rate-num">{{value.grade}}</text>
								</view>
								<!-- 导演 -->
								<view class="director">导演：{{value.director}}</view>
								<!-- 主演 -->
								<view class="starring">主演：{{value.cast}}</view>
						
								<!-- 电影时长 -->
								<view class="movie-info-bottom">
									<view class="movie-length">{{value.duration}}分钟</view>
								</view>
							</view>
							<!-- 购票按钮 -->
							<view class="movie-btns" v-show="tanIndex==1">购票</view>
							<view class="movie-btns-presale" v-show="tanIndex!=1">预售</view>
							
						</view>
						<u-loadmore :status="status" :load-text="loadText"/>
					</view>		
		</scroll-view>
	
		
	<!-- </view> -->
	</view>	
</template>

<script>
	import { debounce } from "lodash";
	export default {
		name:"List",
		props: {
			// 要渲染的数据
			items: {
			  type: Array,
			  required: true
			},
			// 每条数据渲染的节点的高度
			itemHeight: {
			  type: Number,
			  required: true
			},
			// 每次渲染的 DOM 节点个数
			showNumber: {
			  type: Number,
			  required: true
			},
			// 电影上映切换
			tanIndex:{
				type: Number,
				required: true
			},
			// 定位信息
			cityInfo: {
				type: Object,
				required: true
			},
		},
	
		data() {
			return {
				// 要展示的数据的起始下标
				startIndex: 0, 
				// 要展示的数据的结束下标
				endIndex: 0,
				scrollTop:0,
				showList:[],
				// 下拉加载更多状态
				status: 'loadmore',
				// 状态对应文字
				loadText: {
					loadmore: '上拉或点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			};
		},
		computed:{
			    // 容器的高度
			    scrollBoxHeight () {
			      return this.itemHeight * (this.showNumber-1) + 'px'
			    },
				// 列表向上滚动时要动态改变 top 值
				listTop() {
					// 在这需要获得一个可以被itemHeight整除的数来作为item的偏移量，这样随机滑动时第一条数据都是完整显示的
				    return this.scrollTop - (this.scrollTop % this.itemHeight);
				},
				
				
		},
		mounted(){
			this.getShowList()
			
		},
		methods:{
			
			//计算可视区域数据
			getShowList(){				
				this.startIndex = Math.floor(this.scrollTop/this.itemHeight);   //可视区域第一条数据的索引
				this.endIndex = this.startIndex + this.showNumber;   //可视区域最后一条数据的后面那条数据的索引
				this.showList = this.items.slice(this.startIndex, this.endIndex)  //可视区域显示的数据，即最后要渲染的数据。实际的数据索引是从this.startIndex到this.endIndex-
		
			},
			 // 容器的滚动事件
			handleScroll:debounce(function (e) {
			  // 获取容器顶部滚动的尺寸
			this.scrollTop = e.detail.scrollTop
			// 计算卷去的数据条数，用计算的结果作为获取数据的起始和结束下标
			// 起始的下标就是卷去的数据条数，向下取整
			if (!this.scrollAnimationFrame) {
			    this.scrollAnimationFrame = requestAnimationFrame(() => {
			      this.getShowList();
			      this.scrollAnimationFrame = null;
			    });
			}
			  
			// 结束的下标就是起始的下标加上要展示的数据条数
			
			},100),
				
			handleScrollToLower(){
				this.status = "loading"
			},
			//跳转到电影院列表
			getUrl(data) {
				if (this.cityInfo.city == '定位中') {
					this.$toast("请选择位置信息")
					return false
				}
				let info = {
					position: this.cityInfo,
					info: data
				}
				console.log(info)
				uni.navigateTo({
					url: '/pages/movie/cinema-list',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('filmDataFromOpene', {
							data: info
						})
					}
				})
			},
		}
	}
</script>

<style scoped lang="less" >
	.scroll-box{
		margin-bottom: 20rpx;
		position: relative;

	}
	.movie-list{
		position: absolute;
		top: 0;
		width: 100%;
	}
	.movie-card {
		margin: 20rpx 25rpx 0rpx 25rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 0 32rpx;
		display: flex;
		align-items: center;

		// 电影海报
		.movie-img {
			width: 180rpx;
			height: 248rpx;
			position: relative;

			image {
				width: 180rpx;
				height: 248rpx;
				border-radius: 20rpx;
				
			}
			// 电影放映格式
			.movie-projectionFormat {
				position: absolute;
				top: 10rpx;
				left: 10rpx;
				border-radius: 8rpx;
				color: #FFFFFF;
				font-size: 17rpx;
				background-color: rgba(0, 0, 0, 0.7);
				// 屏幕类型
				.screen {
					padding: 0rpx 8rpx;
				}
				// 放映类型
				.dimension {
					padding: 0 8rpx 0 0;
				}
			}

		}
		// 电影信息
		.movie-info {
			margin-left: 24rpx;
			width: 50%;
			// 电影信息头部
			.movie-info-top {
				display: flex;
				align-items: center;
				// 电影名称
				.movie-name {
					color: #2D3039;
					font-size: 32rpx;
					font-weight: 600;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			// 电影评分
			.movie-rate {
				display: flex;
				align-items: center;
				margin-top: 16rpx;
				// 电影评分数字
				.rate-num {
					color: #FF6E06;
					font-size: 28rpx;
					font-weight: 550;
					margin-left: 16rpx;
				}
			
			}
			// 导演
			.director {
				color: #636775;
				font-size: 24rpx;
				margin-top: 16rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			// 主演
			.starring {
				color: #787A82;
				font-size: 24rpx;
				margin-top: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			// 电影信息底部
			.movie-info-bottom {
				display: flex;
				align-items: center;
				margin-top: 12rpx;
				// 电影时长
				.movie-length {
					padding: 6rpx 12rpx;
					border-radius: 6rpx;
					border: 2rpx solid #DADCE4;
					color: #A6A8AE;
					font-size: 20rpx;
				}
			}
		}
		// 购票按钮
		.movie-btns {
			margin-left: auto;
			width: 110rpx;
			height: 58rpx;
			background: linear-gradient(207deg, #fb54aa; 0%, #fb5773 100%);
			border-radius: 29rpx;
			text-align: center;
			line-height: 58rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 550;
		}
		// 预售按钮
		.movie-btns-presale {
			margin-left: auto;
			width: 110rpx;
			height: 58rpx;
			background: linear-gradient(207deg, #51c4d3; 0%, #2486b9 100%);
			border-radius: 29rpx;
			text-align: center;
			line-height: 58rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 550;
		}
	}
	
	
</style>