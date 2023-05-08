import ajax from 'uni-ajax'                                 // 引入 uni-ajax 模块

const instance = ajax.create(config)                        // 创建请求实例

instance.interceptors.request.use(onFulfilled, onRejected)  // 添加请求拦截器
instance.interceptors.response.use(onFulfilled, onRejected) // 添加响应拦截器

export default instance                                     // 导出创建后的实例