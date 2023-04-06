import config from './config'
/**
 * 上传图片接口请求 
 * fileUrl：请求参数
 */

const WxPay = (data) =>{
	return new Promise((resolve, reject)=> {
		// #ifdef MP-WEIXIN
	   uni.requestPayment({
	   	provider: 'wxpay',
	   	timeStamp: data.timeStamp,
	   	nonceStr: data.nonceStr,
	   	package: data.package,
	   	signType: data.signType,
	   	paySign: data.paySign,
	   	success: function(res) {
			uni.showToast({
				title:'恭喜您,支付成功',
				icon:'none'
			})
			resolve(res);
	   	},
	   	fail: function() {
	   		uni.showToast({
	   			title:'支付失败',
	   			icon:'none'
	   		})
	   	}
	   });
	   // #endif
	   
	   // #ifdef H5
	     var jweixin = require('jweixin-module');
		 jweixin.config({
		  	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		  	appId:data.appId, // 必填，公众号的唯一标识
		  	timestamp:data.timeStamp, // 必填，生成签名的时间戳
		  	nonceStr:data.nonceStr, // 必填，生成签名的随机串
		  	signature:data.paySign, // 必填，签名，见附录1
		  	jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		 });
		  jweixin.chooseWXPay({
		 	  timestamp:data.timeStamp,
		 	  nonceStr:data.nonceStr,
		 	  package:data.package,
		 	  signType:data.signType,
		 	  paySign:data.paySign,
		 	  appId:data.appId,
		 	  success:function(res){
		 		resolve(res);
		 	  },
		 	  cancel:function(r){
		 		  uni.showToast({
		 		  	 title:'您已取消支付',
		 			 icon:'none'
		 		  })
		 	  },
		 	  fail: function(err) {
		 	  	uni.showToast({
		 	  		 title:'支付失败',
		 			 icon:'none'
		 	  	})
		 	  }
		  });
		  jweixin.error(function(res) {
		  	uni.showToast({
		  		icon: 'none',
		  		title: '支付失败了',
		  		duration: 4000
		  	})
		 });
	   // #endif
	})
}
export default WxPay;


