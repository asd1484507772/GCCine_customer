//使用占位符连接字符串.类似于c#中的FormatString一样。
String.prototype.Format = function() {
	var args = arguments;
	// var cSource = args[0];
	return this.replace(/\{(\d+)\}/g, function(s, i) {
		return args[i];
	});
}

//验证字符串是否为手机号
String.prototype.IsMobileNo = function() {
	//let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
	let reg = /^1(3|4|5|7|8)\d{9}$/
	return (reg.test(this));
}
//验证身份证号码是否正确
String.prototype.IsIdNumber = function() {
	return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this));
}
//全名用指定字符串填充左边到指定长度。
String.prototype.PadLeft = function(bchar, alength) {
	var xchar = '' + this;
	for (var i = 0; i < alength; i++) {
		xchar = bchar + xchar;
		if (xchar.length == alength)
			break;
	}
	return (xchar);
}

String.prototype.ToDate = function() {
	let DateStr = this.substring(0,10);
	// var converted = Date.parse(DateStr);
	// var myDate = new Date(converted);
	// if (isNaN(myDate)) {
		var arys = DateStr.split('-');
		var myDate = new Date(arys[0], --arys[1], arys[2], 0, 0, 0);
	// }
	return myDate;
}

String.prototype.ToDateTime = function(fmt) {
	let dateStr = this;
	if (!fmt) {
		fmt = 'yyyy-MM-dd hh:mm:ss';
	}
	// if (!dateStr || !fmt || (dateStr.length != fmt.length)) {
	// 	throw new Error("转换时间时发生错误,时间字符串与格式字符串不匹配!");
	// }
	//排除特殊字符,避免正则发生错误
	fmt = fmt.replace(/([\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}])/ig, "\\$1");

	function getReg(str) {
		var cfmt = fmt;
		cfmt = cfmt.replace(new RegExp(str + "+", "g"), function(full) {
			return "(" + full + ")";
		}) || "";
		return cfmt.replace(/[yMdhmsS]/g, "\\d");
	}
	var year = parseInt((new RegExp(getReg("y")).exec(dateStr)[1])) || 0;
	var month = parseInt((new RegExp(getReg("M")).exec(dateStr)[1])) - 1 || 0;
	var day = parseInt((new RegExp(getReg("d")).exec(dateStr)[1])) || 0;
	var hour = parseInt((new RegExp(getReg("h")).exec(dateStr)[1])) || 0;
	var minute = parseInt((new RegExp(getReg("m")).exec(dateStr)[1])) || 0;
	var second = parseInt((new RegExp(getReg("s")).exec(dateStr)[1])) || 0;

	return new Date(year, month, day, hour, minute, second);
}


// 数字格式化
Number.prototype.Format = function(decimals, dec_point, thousands_sep) {
	/*
	 3     * 参数说明：
	 5     * decimals：保留几位小数
	 6     * dec_point：小数点符号
	 7     * thousands_sep：千分位符号
	 8     * */
	let number = this;
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.ceil(n * k) / k;
		};

	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{4})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, "$1" + sep + "$2");
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

// 判断闰年  
//---------------------------------------------------  
Date.prototype.isLeapYear = function() {
	return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
}

//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() %
		100)).toString();

	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, this.getMonth() + 1);

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;

}

//+---------------------------------------------------  
//| 日期计算  
//+---------------------------------------------------  
Date.prototype.DateAdd = function(strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
		case 's':
			return new Date(dtTmp.valueOf() + (1000 * Number));
		case 'n':
			return new Date(dtTmp.valueOf() + (60000 * Number));
		case 'h':
			return new Date(dtTmp.valueOf() + (3600000 * Number));
		case 'd':
			return new Date(dtTmp.valueOf() + (86400000 * Number));
		case 'w':
			return new Date(dtTmp.valueOf() + ((86400000 * 7) * Number));
		case 'q':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(),
				dtTmp.getSeconds());
		case 'm':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(),
				dtTmp.getSeconds());
		case 'y':
			return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(),
				dtTmp.getSeconds());
	}
}

//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {
	var dtStart = this;
	if (typeof dtEnd == 'string') //如果是字符串转换为日期型  
	{
		dtEnd = StringToDate(dtEnd);
	}
	switch (strInterval) {
		case 's':
			return parseInt((dtEnd - dtStart) / 1000);
		case 'n':
			return parseInt((dtEnd - dtStart) / 60000);
		case 'h':
			return parseInt((dtEnd - dtStart) / 3600000);
		case 'd':
			return parseInt((dtEnd - dtStart) / 86400000);
		case 'w':
			return parseInt((dtEnd - dtStart) / (86400000 * 7));
		case 'm':
			return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
		case 'y':
			return dtEnd.getFullYear() - dtStart.getFullYear();
	}
}

//+---------------------------------------------------  
//| 日期输出字符串，重载了系统的toString方法  
//+---------------------------------------------------  
Date.prototype.toString = function(showWeek) {
	var myDate = this;
	var str = myDate.toLocaleDateString();
	if (showWeek) {
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str += ' 星期' + Week[myDate.getDay()];
	}
	return str;
}

//+---------------------------------------------------  
//| 把日期分割成数组  
//+---------------------------------------------------  
Date.prototype.ToArray = function() {
	var myDate = this;
	var myArray = Array();
	myArray[0] = myDate.getFullYear();
	myArray[1] = myDate.getMonth();
	myArray[2] = myDate.getDate();
	myArray[3] = myDate.getHours();
	myArray[4] = myDate.getMinutes();
	myArray[5] = myDate.getSeconds();
	return myArray;
}

// 只要日期部份,时间部分全部归零
Date.prototype.ToDate = function(){
	var myDate = this;
	var arr = myDate.ToArray();
	return new Date(arr[0], arr[1], arr[2], 0, 0, 0);
}

//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval) {
	var myDate = this;
	var partStr = '';
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	switch (interval) {
		case 'y':
			partStr = myDate.getFullYear();
			break;
		case 'm':
			partStr = myDate.getMonth() + 1;
			break;
		case 'd':
			partStr = myDate.getDate();
			break;
		case 'w':
			partStr = Week[myDate.getDay()];
			break;
		case 'ww':
			partStr = myDate.WeekNumOfYear();
			break;
		case 'h':
			partStr = myDate.getHours();
			break;
		case 'n':
			partStr = myDate.getMinutes();
			break;
		case 's':
			partStr = myDate.getSeconds();
			break;
	}
	return partStr;
}

//+---------------------------------------------------  
//| 取得当前日期所在月的最大天数  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var date1 = (new Date(ary[0], ary[1] + 1, 1));
	var date2 = date1.dateAdd(1, 'm', 1);
	var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
	return result;
}

//+---------------------------------------------------  
//| 取一唯数组中唯一元素
//+---------------------------------------------------  
Array.prototype.Distinct = function(key) {
	let sourceArray = this;
	let keyName = key;
	var tmp = new Array();
	sourceArray.forEach(function(item, i) {
		let oldObj = tmp.filter(function(o) {
			return o[key] == item[key];
		});
		if (oldObj.length == 0) {
			let obj = {};
			obj[key] = item[key];
			tmp.push(obj);
		}
	})
	return tmp;
}

//+---------------------------------------------------  
//| 取数组中的最大元素的值
//+---------------------------------------------------  
Array.prototype.MaxValue = function(sortKey) {
	return this.MaxRecord(sortKey)[sortKey];
}

//+---------------------------------------------------  
//| 取数组中的最大元素的记录
//+---------------------------------------------------  
Array.prototype.MaxRecord = function(sortKey) {
	let jsonData = this;
	if (!jsonData) return null;
	if (jsonData.length == 0) return null;

	var data = JSON.parse(JSON.stringify(jsonData));
	//排序（倒序）
	data.sort(function(a, b) {
		return a[sortKey] < b[sortKey] ? 1 :
			a[sortKey] == b[sortKey] ? 0 : -1;
	});
	//取第一行值 
	var result = data[0];
	return result;
}

//+---------------------------------------------------  
//| 取数组中的最小元素的记录
//+---------------------------------------------------  
Array.prototype.MinRecord = function(sortKey) {
	let jsonData = this;
	if (!jsonData) return null;
	if (jsonData.length == 0) return null;

	var data = JSON.parse(JSON.stringify(jsonData));
	//排序（顺序）
	data.sort(function(b, a) {
		return a[sortKey] < b[sortKey] ? 1 :
			a[sortKey] == b[sortKey] ? 0 : -1;
	});
	//取第一行值 
	var result = data[0];
	return result;
}

/**
 * 数组元素交换位置
 * @param {array} arr 数组
 * @param {number} index1 添加项目的位置
 * @param {number} index2 删除项目的位置
 * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
 */



///日期处理函数
var dateHelper = {
	//转换时间，获取当前日期
	getCurDate: function() {
		var today = new Date();
		return today.getFullYear().toString() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() +
			":" + today.getMinutes() + ":" + today.getSeconds();
	},
	//+---------------------------------------------------  
	//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
	//+---------------------------------------------------  
	daysBetween: function(DateOne, DateTwo) {
		var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
		var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
		var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

		var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
		var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
		var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

		var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' +
				TwoYear)) /
			86400000);
		return Math.abs(cha);
	},

	//+---------------------------------------------------  
	//| 日期合法性验证  
	//| 格式为：YYYY-MM-DD或YYYY/MM/DD  
	//+---------------------------------------------------  
	isValidDate: function(DateStr) {
		var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;   
		if (sDate == '') return true;
		//如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
		//数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
		var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
		if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
		{
			var t = new Date(sDate.replace(/\-/g, '/'));
			var ar = sDate.split(/[-/:]/);
			if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
				//alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
				return false;
			}
		} else {
			//alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
			return false;
		}
		return true;
	},

	//+---------------------------------------------------  
	//| 日期时间检查  
	//| 格式为：YYYY-MM-DD HH:MM:SS  
	//+---------------------------------------------------  
	checkDateTime: function(str) {
		var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
		var r = str.match(reg);
		if (r == null) return false;
		r[2] = r[2] - 1;
		var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
		if (d.getFullYear() != r[1]) return false;
		if (d.getMonth() != r[2]) return false;
		if (d.getDate() != r[3]) return false;
		if (d.getHours() != r[4]) return false;
		if (d.getMinutes() != r[5]) return false;
		if (d.getSeconds() != r[6]) return false;
		return true;
	},


	//+---------------------------------------------------  
	//| 字符串转成日期类型   
	//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
	//+---------------------------------------------------  
	stringToDate(DateStr) {
		var converted = Date.parse(DateStr);
		var myDate = new Date(converted);
		if (isNaN(myDate)) {
			//var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
			var arys = DateStr.split('-');
			myDate = new Date(arys[0], --arys[1], arys[2]);
		}
		return myDate;
	}
};

// 通讯录联系人相关函数
var contactHelper = {
	// 从通讯录中查找联系人.
	GetContact: function(jobOther) {
		if (plus) {
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressBook) {
				var contactList = findContact(addressBook, jobOther);
			}, function(err) {
				uni.showModal({
					title: "权限确认",
					content: "读手机取通讯录失败！\r\n\r\n请在设置中允许<" + this.$AppName + ">访问您的通讯录!"
				})
			})
		}

		///查找联系人
		var findContact = function(addressBook, jobOther) {
			var fields = ["displayName", "phoneNumbers", "value"];
			addressBook.find(fields, function(contacts) {
				var contactList = [];
				//将非数字全部替换掉。
				let re = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
				contacts.forEach(function(val, index, arr) {
					val.phoneNumbers.forEach(function(v, i, a) {
						let telNo = v.value.replace(re, "").slice(-11);

						let displayName = val.displayName ? val.displayName.replace("|", "").replace("^", "").replace(":", "") :
							"------";
						if (telNo.IsMobileNo()) {
							contactList.push({
								DisplayName: displayName,
								MobileNo: telNo
							});
						};
					});
				});
				contactList.sort(function(b, a) {
					return a["displayName"] < b["displayName"] ? 1 :
						a["displayName"] == b["displayName"] ? 0 : -1;
				});

				jobOther && jobOther(contactList);
			}, function(e) {
				console.log("查找通讯录失败，失败信息:" + e.message);
			})
		}
	},

}

var stringHelper = {
	genTempName(length) {
		var rnd = "";
		for (var i = 0; i < length; i++)
			rnd += Math.floor(Math.random() * 10);
		return rnd;
	}
}
module.exports = {
	date: dateHelper,
	contact: contactHelper,
	string: stringHelper
	// array:arrayHelper
}
