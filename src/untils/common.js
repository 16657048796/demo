import { reactive } from "@vue/composition-api"

import {get_categoryAll} from "@/api/getList"
export const common = () =>{
    const   category= reactive({
        item:[]
    })
    const getCategoryAll=()=>{
        get_categoryAll({}).then(res=>{
            category.item=res.data.data
        }).catch(err=>{
            alert("刷新数据失败")
        })

    }
    return {
        category,
        getCategoryAll
    }
}













