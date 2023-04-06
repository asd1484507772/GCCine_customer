import {apiUrl} from "./config.js"
import qs from './qs'
import {getRefresh} from "@/api/api.js" 
const request = {};
/**
 * 接口请求
 * @param url 接口地址
 * @param method 请求方法 [get,post,put]  
 * @param data 参数  
 */
const httprequest = (options) =>{
	let header = {...options.header};
	header = handleHeader(header);
	if(options.method=='post'){
		header['content-type'] = 'application/x-www-form-urlencoded'
	}
	let  data = options.data
	// console.log(data)
	// if(options.method=='post'){
	// 	data.mchid = 'blindbox'
	// }
	let url = options.url
	if(options.showLoad){
		uni.showLoading({
			title:'加载中...',
			// mask:true
		})
	}
	
	return new Promise((resolve, reject) => {
	    uni.request({
	        url: url,
	        method: options.method,
	        data:data,
	        header,
	        success: (res) => {
	            if (res.statusCode !== 200) {
	                const data = res.data
	                if(res.statusCode == '400' || res.statusCode == '500') {
						uni.hideLoading()
	                    uni.showModal({
	                    	title:'提示',
							content:'网络繁忙,请稍后重试',
							success(res){}
	                    })
	                }
					if(res.statusCode == '401' || res.data.code==1001){
						uni.removeStorageSync('token')
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}
	                reject(res)
	            } else {
					const result = res.data
					const code = result.code
					if(code==1001){
						uni.removeStorageSync('token')
						uni.showModal({
							title:'提示',
							content:'登录异常,请重新登录',
							success(res){
								uni.navigateTo({
									url:'/pages/authorization/authorization'
								})
							}
						})
					}else if(code!=0){
						uni.showToast({
						    title: res.data.msg,
						    icon: 'none',
						    duration: 2000
						})
						 // reject(res)
						 uni.hideLoading()
					}else{
						const result = res.data
						resolve(res.data);
						uni.hideLoading()
					}
	                
	            }
	        },fail(data) {
	        	console.log("--------")
				console.log(data)
	        }
	    })
	})
}
function handleHeader(header){
	let usertoken = uni.getStorageSync('token')
	if(usertoken){
		header.Authorization = 'Bearer '+usertoken
	}
    return header
}
function handleData(props){
    let data = props;
    return data
}
export default httprequest;
