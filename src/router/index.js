import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"Login",
  },
  {
    path: "/Login",
    name: "Login",
    component : ()=> import( "@/views/layout/login/Login.vue" )
  },
  {
    path: "/nian",
    name: "nian",
    component : ()=> import( "@/views/demo_two.vue" )
  },
  {
    path: "/Demo",
    name: "Demo",
    hidden:true,
    mate:{
        name:"控制台",
        icon:"console"
    },
    component: () =>import( "@/views/layout/components/index.vue"),
    children:[
        {
            path:"/console",
            name:"DemeConsole",
            mate:{
                name:"控制台下"
            },
            component:() =>import( "@/views/layout/Home/console/conSon.vue"),
        }
    ]
  },
  {
    path: "/Demo",
    name: "Demo",
    hidden:true,
    mate:{
        name:"信息管理",
        icon:"info"
    },
    component: () =>import( "@/views/layout/components/index.vue"),
    children:[
        {
            path:"/infoClassify",
            name:"DemoInfoClassify",
            mate:{
                name:"信息列表"
            },
            component:() =>import( "@/views/layout/Home/info/infoClassify.vue"),
        },
        {
            path:"/infoList",
            name:"DemoInfoList",
            mate:{
                name:"信息分类"
            },
            component:() =>import( "@/views/layout/Home/info/infoList.vue"),
        },
    ]
  },
  {
    path: "/Demo",
    name: "Demo",
    hidden:true,
    mate:{
        name:"用户管理",
        icon:"user"
    },
    component: () =>import( "@/views/layout/components/index.vue"),
    children:[
        {
            path:"/userSon",
            name:"DemoUserSon",
            mate:{
                name:"用户列表"
            },
            component:() =>import( "@/views/layout/Home/user/userSon.vue"),
        }
    ]
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to,from,next)=>{
//   console.log(to)
//   console.log(from)
// })




export default router;
//路由守卫
// router.beforeEach((to,from,next)=>{
//   console.log(to)
//   console.log(from)
//   console.log(next)
// router.beforeEach((to,form,next)=>{
//   const isLogin = localStorage.getItem("ele_login") ? true : false
//   // console.log(to) //从哪来
//   // console.log(form) //到哪去
//   // console.log(next) //
//   if(to.path === '/login'){
//     next()
//   } else {
//     //  是否登陆 没有登录重定向登录页面  如果登录就正常next
//       isLogin ?  next() : next('/login')
//   }
  
// })
// })
