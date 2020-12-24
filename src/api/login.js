import axios from "./request.js"
// import axios from "axios"   

//获取登录验证码
export  const get_login= (data)=>{
    return axios.request({
        method:"post",
        url:"/getSms/",
        data:data
    })
}
//登录
// export const do_login=(data)=>{
//     return axios.request({
//         method:"post",
//         url:"/getSms/",
//         data:data
//     })
// }
// //获取注册验证码
// export const get_register=(data)=>{
//     return axios.request({
//         method:"post",
//         url:"/getSms/",
//         data:data
//     })
// }
//注册
export const do_register=(data,ipt)=>{
    return axios.request({
        method:"post",
        url:ipt,
        data:data
    })
}

export const get_list=(data)=>{
    return axios.request({
        method:"post",
        url:'/user/getList/',
        data:data
    })
}