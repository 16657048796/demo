import {  MessageBox } from "element-ui"


export const delePopup=()=>{
    const confirm = ({content,tip,type,center,callback,id})=>{

        MessageBox.confirm(content,tip,{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
            confirmButtonClass:"btn-danger",
            showClose:true,
            center: center
            }).then(() => {
                callback && callback(id)
            }).catch(() => {
            });
    }
    return {
        confirm
    }
}







