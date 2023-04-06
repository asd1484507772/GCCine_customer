export default {
	//接口域名https://xxxxxx.com
	// #ifdef MP-WEIXIN
	apiUrl: "https://saasapi.hijin.vip",
	// #endif
	// #ifdef H5
	apiUrl: "https://taixianghuih5.hijin.vip/h5test",
	// apiUrl: "https://saasapi.hijin.vip",
	// #endif
	//分页方法
	pageDataFn(number, pageSize, data) {
		//处于第几页 number
		//保存每页数据的数组
		let pagedata = [];
		//pageSize 每页条数
		//设置开始
		let start = (pageSize * number) - pageSize;
		// 设置结束长度
		let end = pageSize * number;
		end = end > data.length ? data.length : end;
		for (let i = start; i < end; i++) {
			//所有分页数据 data
			pagedata.push(data[i])
		}
		return pagedata;
	},
	//时间转换成想要的格式
	turnTime(data, type) {
		var date = new Date(data.replace(/-/g, "/"));
		var YY = date.getFullYear()
		var MM = '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
		var DD = '-' + (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		var ss = ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		if (type == 0) {
			return hh + mm
		} else if (type == 1) {
			return YY + MM + DD
		} else if (type == 2) {
			return YY + MM + DD + " " + hh + mm;
		} else {
			return YY + MM + DD + " " + hh + mm + ss;
		}
	},
	//当前时间跟指定时间相差多少分钟多少秒
	getRemainderTime(startTime) {
		var s1 = new Date(startTime.replace(/-/g, "/")),
			s2 = new Date(),
			runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
		var year = Math.floor(runTime / 86400 / 365);
		runTime = runTime % (86400 * 365);
		var month = Math.floor(runTime / 86400 / 30);
		runTime = runTime % (86400 * 30);
		var day = Math.floor(runTime / 86400);
		runTime = runTime % 86400;
		var hour = Math.floor(runTime / 3600);
		runTime = runTime % 3600;
		var minute = Math.floor(runTime / 60);
		runTime = runTime % 60;
		var second = runTime;
		// 　　return year+','+month+','+day+','+hour+','+minute+','+second;
		return minute + ',' + second;
	},
	//获取当前时间
	formatTime(type) {
		var date = new Date(new Date().getTime());
		var YY = date.getFullYear() + '-';
		var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		var ss = ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		if (type == 1) {
			return DD
		} else if (type == 2) {
			return YY + MM + DD + " " + hh + mm;
		} else {
			return YY + MM + DD + " " + hh + mm + ss;
		}
	},
	//在指定日期上加多少分钟
	MinutesTest(date, num) {
		var sdate1 = new Date(date);
		sdate1.setMinutes(sdate1.getMinutes() + num);
		var YY = sdate1.getFullYear() + '-';
		var MM = (sdate1.getMonth() + 1 < 10 ? '0' + (sdate1.getMonth() + 1) : sdate1.getMonth() + 1) + '-';
		var DD = (sdate1.getDate() < 10 ? '0' + (sdate1.getDate()) : sdate1.getDate());
		var hh = (sdate1.getHours() < 10 ? '0' + sdate1.getHours() : sdate1.getHours()) + ':';
		var mm = (sdate1.getMinutes() < 10 ? '0' + sdate1.getMinutes() : sdate1.getMinutes());
		var ss = ':' + (sdate1.getSeconds() < 10 ? '0' + sdate1.getSeconds() : sdate1.getSeconds());

		// var now= sdate1.getHours()+":"+sdate1.getMinutes();
		return YY + MM + DD + " " + hh + mm + ss;
	},

	//复制公用方法
	copyFun(data) {
		uni.setClipboardData({
			data:data,
			success: function(res) {
				uni.showToast({
					title:'复制成功',
					icon:'none'
				})
			}
		})
	},
	
	//获取指定日期加一天
	getRearTime(time){
	    var day1 = new Date(time.replace(/-/g, "/"));
	    day1.setTime(day1.getTime()+24*60*60*1000);
	    var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
		let year = day1.getFullYear()
		let month = (day1.getMonth()+1)<10?'0'+(day1.getMonth()+1):(day1.getMonth()+1)
		let day = day1.getDate()<10?'0'+day1.getDate():day1.getDate()
		let hh = (day1.getHours() < 10 ? '0' + day1.getHours() : day1.getHours()) + ':';
		let mm = (day1.getMinutes() < 10 ? '0' + day1.getMinutes() : day1.getMinutes());
		let ss = ':' + (day1.getSeconds() < 10 ? '0' + day1.getSeconds() : day1.getSeconds());
	    return year+'-'+month+'-'+day+ " " + hh + mm + ss;
	},
}
