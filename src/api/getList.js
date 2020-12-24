import axios from "./request.js"


//获取信息分类
export  const get_categoryAll = (data)=>{
    return axios.request({
        method:"post",
        url:"/news/getCategoryAll/",
        data:data
    })
}
//获取一级信息分类
export  const add_firstCategory= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/addFirstCategory/",
        data:data
    })
}
//获取二级信息分类
export  const add_childrenCategory= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/addChildrenCategory/",
        data:data
    })
}
//删除信息分类
export  const delete_category= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/deleteCategory/",
        data:data
    })
}
//修改信息分类
export  const edit_category= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/editCategory/",
        data:data
    })
}
//获取信息列表
export  const get_list= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/getList/",
        data:data
    })
}
//获取信息列表
export  const add_list= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/add/",
        data:data
    })
}
//删除信息
export  const dele_list= (data)=>{
    return axios.request({
        method:"post",
        url:"/news/deleteInfo/",
        data:data
    })
}






