import {do_register} from "../../api/login"
import {setUsername, setToken, getUsername, getToken , removeUsername , removeToken} from "../../api/cookie"
import router from "../../router"
const state={
    isCollapse:JSON.parse(localStorage.getItem("isCollapse"))  ||  false,
    username:getUsername() || '',
    token:getToken() ||  ''
}
const mutations={
    navToggle(state){
        state.isCollapse=!state.isCollapse
        localStorage.setItem("isCollapse",JSON.stringify(state.isCollapse))
    },
    set_username(state,value){
        state.username=value
        localStorage.setItem("username",JSON.stringify(value))
    },
    set_token(state,value){
        state.token=value
        localStorage.setItem("token",JSON.stringify(value))
    },
    remove_name(state){
        state.username=''
        state.token=''
        removeUsername()
        removeToken()
        router.push({
            name:"Login"
        })  
    }
}
const actions={
    login({commit},{data,ipt}){
        return new Promise((resolve,reject)=>{
            do_register(data,ipt).then((res)=>{
                console.log("----------------",res)
                let {username,token}=res.data.data
                commit("set_username",username)
                commit("set_token",token)
                setUsername(username)
                setToken(token)
                resolve(res)
            }).catch((err)=>{

                reject(err)
            })
        })
    }
}
const getters={
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
};
