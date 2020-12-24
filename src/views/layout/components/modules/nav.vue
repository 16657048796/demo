<template>
    <div id="nav_wrap" >
        <div class="nav_logo" >
            <img src="@/assets/logo.png"  alt="">
        </div>
        <div>
            <el-menu default-active="1-4-1"  class="el-menu-vertical-demo" sub-menu="0" :collapse="isCollapse"  background-color="#344a5f" active-color="red" inactive-color="red" text-color="#fff" >
                <template   v-for="(item,index) in routesTab"  >
                    <el-submenu :index="index+''" v-if="item.hidden" :key="index">
                        <template slot="title"  >
                            <svg-icon :iconName='item.mate.icon' :iconClass="item.mate.icon"/>
                            <span slot="title">{{item.mate.name}}</span>
                        </template>
                        <router-link :to="_item.path" v-for="(_item,_index)  in item.children" :key="_index" >
                            <el-menu-item :index="_item.path" >{{_item.mate.name}}
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
export default {
    setup(prop, { refs, root }) {
        const isCollapse= computed(()=>{
            return root.$store.state.app.isCollapse
        })
        const routesTab=root.$router.options.routes
        return {
            routesTab,
            isCollapse
        }
    }
}
</script>

<style scoped lang="scss">
    #nav_wrap{
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: $nav-width;
        background-color: #344a5f;
        .nav_logo{
            width: 75px;
            height: 75px;
            margin: 28px auto;
            img{
                width: 75px;
                height: 75px;
            }
        }
        .nav_menu_wrap{
            background: #344a5f;
            .nav_menu_navbar_one{
                background: #344a5f;
            }
        }
    }
    // .el-submenu {
    //     .el-submenu__title{
    //         background: red !important;
    //         .el-menu-item:hover{
    //             background: red !important;
    //             color: #fff;
    //         }
    //     }
    // }
    li.el-submenu div.el-submenu__title:hover{
        background: red !important;
    }
    router-link{
        font-size: 14px;
        font: none;
    }
    .indexMain #nav_wrap{
        @include webkit(transition,width .3s linear);
    }
    .open{
        #nav_wrap{
            width: 75px;
            .nav_logo{
                text-align: center;
                img{
                    @include webkit(transition,width height .3s linear);
                    width: 50px;
                    height: 50px;
                }
            }
        }   
    }
    .close #nav_wrap{
        width: $nav-width;
    }
    .el-menu{
        border-right: none;
    }
</style>