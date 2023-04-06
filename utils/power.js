// import qqMapWX from "@/comne/qq-wx-sdk.js"
export default {
	data() {
		return {
			city:'上海市',
			// qqMap: new qqMapWX({key: '3UUBZ-USDKK-JI5JX-AJBOB-LNW7Q-DSFKC',vm: this})
		}
	},
	onShow(option) {
		// console.log(this.isLocation)
		let position = uni.getStorageSync('LocalHost')
		if(!position&&!this.isLocation){
			this.Monitor()
		}else{
			console.log("到这里了")
			if(this.isHome&&!this.isLocation){
				this.Monitor()
			}else{
				this.city = position?position.ad_info.city:''
			}
			
		}
	},
	methods: {
		//获取用户定位信息
		Monitor(){
			var QQMapWX = require('@/comne/qqmap-wx-jssdk.js');
			let qqmapsdk = new QQMapWX({
				key: '3UUBZ-USDKK-JI5JX-AJBOB-LNW7Q-DSFKC' //腾讯地图 - 申请开发者密钥（key）
			});
			var _this = this
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					var latitude = res.latitude
					var longitude = res.longitude
					// #ifdef MP-WEIXIN
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: latitude,
							longitude: longitude
						},
						success: function(res) {
							console.log(res.result)
							uni.setStorageSync('LocalHost', res.result)
							_this.city = res.result.ad_info.city
						}
					})
					// #endif
					// #ifdef H5
					_this.getH5Loca(latitude,longitude)
					 
					// #endif
				},
				fail(err) {
					console.log(err)
					uni.showModal({
						title: '提示',
						content: '请先授权位置信息',
						success: function(res) {
							if (res.cancel == false && res.confirm) {
								uni.openSetting({
									success: function(data) {
										_this.Monitor()
									}
								})
							} else {
								_this.Monitor()
							}
						}
					});
			
				}
			});
		},
		
		getH5Loca(latitude,longitude){
			let prm = {
				location:{
					latitude: latitude,
					longitude: longitude
				},
				key: '3UUBZ-USDKK-JI5JX-AJBOB-LNW7Q-DSFKC',
				output: 'jsonp',
				get_poi:0,
				coord_type:5
			}
			 let url =  `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}`;
			this.$jsonp(url, prm).then(res=>{
				uni.setStorageSync('LocalHost', res.result)
				this.city = res.result.ad_info.city
			})
		},
	}
}
