<template>
	<view>
		<anilSeat 
		  :title="movieInfo.movieName" 
		  :info="timeData+'|'+movieInfo.movieType"
		  :room-name="officeInfo.hallName"
		  :max="max"
		  :seatData="dataList"
		  @confirm="getInfo"
		  >
		</anilSeat>
	</view>
	
</template>

<script>
	import anilSeat from '@/components/anil-seat.vue'
	// import {getSeat,createOrder} from "@/api/film.js"
	import config from "@/utils/config.js"
	import dataArr from "@/utils/dataArray.js"
	export default {
		components: {anilSeat},
		data() {
			return {
				dataList:[],
				max:4,
				cinemaId:'',
				movieInfo:{},
				officeInfo:{},
				timeData:""
			}
		},
		onLoad(opt) {
			this.getData()
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('moviceDataFrom', function(data) {
				console.log(data)
				_this.movieInfo = data.data
				
			})
			let item = JSON.parse(decodeURIComponent(opt.item));
			_this.timeData = config.turnTime(item.stopSellTime,0)
			this.officeInfo = item
			this.cinemaId = opt.cinemaId
			// this.cinemaInfo = JSON.parse(decodeURIComponent(opt.cinemaInfo));
			
		},
		methods: {
			getData(){
				// console.log(dataArr)
				let arrat = []
				dataArr.data.array.forEach(item=>{
					// let pai = item.seatNo.split('��');
					// let lie = pai[1].split('��')
					arrat.push({
						YCoord:item.rowNo,
						XCoord:item.columnNo,
						SeatCode:item.seatId,
						Status:item.status=='N'?0:1,
						Price:0,
						RowNum:item.pai,
						ColumnNum:item.lie,
						// seatName:item.seatNo
					})
				})
				setTimeout(() => {
					this.dataList  = arrat
					this.$forceUpdate()
				},500);
				
				// console.log(this.dataList)
			},
			
			getInfo(e){
				let array = []
				e.forEach(item=>{
					array.push({
						seatId:item.SeatCode,
						seatName:item.RowNum+'排'+item.ColumnNum+'座'
					})
				})
				let prm = {
					showId:this.officeInfo.showId,
					cinemaId:this.cinemaId,
					showInfor:array
				}
				uni.navigateTo({
					url:'/pages/movie/confirm-order'
				})
			},
		}
	}
</script>

<style lang="less">

</style>
