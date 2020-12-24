// import axios from "axios"
// const BASEUSRL = process.env.NODE_ENV === "development" ? '/api' : "" //api
// const http=axios.create({
//     // baseURL:"http://www.web-jshtml.cn/productapi/"
//     baseURL:BASEUSRL  // http://localhost:8010/api/getSms/  只要url中 /api开头的都是接口请求
// })
// //跨域指的是浏览器由于同源策略 不同域名的请求 就会出现跨域：但是如果是两个后台发起网略请求就不会出现跨域了
// //http.defaults.baseURL="https://www.web-jshtml.cn/productapi/" //https://www.baidu.com/getSms



// //添加请求数据拦截
// http.interceptors.request.use(function(config){
//     //在发送请求之前做点什么


//     //手动添加请求头参数  token userID carf
//     // config.headers.token="xxxxx"
//     console.log(111)
//     return config
// },function(error){
//     //对请求错误坐点什么

//     return Promise.reject(error)
// })

// //添加相应数据拦截
// http.interceptors.response.use(response => {
//     //对响应数据坐点什么  数据进行过滤
//     //  if(response.data.status!=0){
//         console.log(1111)
//     //}
//     return response
// },function(error){
//     //对响应数据错误坐点什么
//     console.log("响应拦截出错")
//     Message.error(error.response.data)

//     return Promise.reject(error)
// })

// export default http  
import axios from "axios"
import {Message} from "element-ui"
import {getToken ,getUsername} from "./cookie"
//为了模拟没有后台数据的情况
let baseURL=null;
var flag=false;
if(flag){
  baseURL = process.env.NODE_ENV === 'development' ? "" :""
}else{
  baseURL = process.env.NODE_ENV === 'development' ? "/devApi" :""
}

const http = axios.create({
    baseURL:baseURL //只要url 中/api开头的都是接口请求
})

const toeknWhite=["/getSms/","/login/",'/register/']
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config.headers["Tokey"] = getToken();
    // config.headers["UserName"] = getUsername();
    // return config;  
    // console.log(toeknWhite)  
    // console.log(config.url)  
    // console.log(toeknWhite.indexOf(config.url) !== -1)
    if(toeknWhite.indexOf(config.url) !== -1){
      return config
    }else{
      if(getToken()){
        config.headers.Tokey = getToken();
        config.headers.UserName = getUsername();
        return config
      }else{
        const message="本地token不存在请重新登录"
        Message.error(message)
        return Promise.reject({error:"本地token不存在"})
      }
    }

  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    
    if(response.data.resCode!=0){
        //提示错误信息
        Message.error(response.data.message);  
        return Promise.reject(response);
        
    }
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http