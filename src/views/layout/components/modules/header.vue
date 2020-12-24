<template>
    <div id="header_wrap">
        <div class="pull-left header_left" @click="navMenuTab">
            <svg-icon iconName="menu" />
        </div>
        <div class="pull-right header_right">
            <div class="header_right_l">
                <h3>{{username}}</h3>
                <el-avatar  src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1901406496,2226073946&fm=26&gp=0.jpg"></el-avatar>
            </div>
            <div class="header_right_r" @click="exit">
                <svg-icon :iconName="minus" :iconClass="minus"/>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import {removeUsername,removeToken} from  "@/api/cookie"
export default {
    setup(props,{root}){
        const minus=ref("exit")
        function navMenuTab(){
            root.$store.commit('app/navToggle')
            // this.$store.commit("navToggle")
        }
        const username=root.$store.state.app.username
        // const 
        function exit(){
            root.$store.commit("app/remove_name")

        }
        return {
            minus ,
            navMenuTab,
            username,
            exit
        }
    }
}
</script>

<style scoped lang="scss">
    #header_wrap{
        position: fixed;
        top: 0;
        right: 0px;
        height: $LayoutHeader;
        line-height: $LayoutHeader;
        left: $nav-width;
        background-color: #fff;
        .header_left{
            margin-left: 20px;
        }
        .header_right{
            height: $LayoutHeader;
            line-height: $LayoutHeader;
            // vertical-align: middle;
            // margin-top: 13px;
            .header_right_l{
                // display: inline-block;
                margin-right: 20px;
                // width: 40px
                height: 40px;
                float: left;
                margin-top: 13px;
                h3{
                    color: #000;
                    display:inline-block;
                }
            }
            .header_right_r{
                display: inline-block;
                width: $LayoutHeader;
                height:$LayoutHeader ;
                text-align: center;
                line-height: $LayoutHeader;
                text-align: center;
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -10px;
                    width: 8px;
                    height: $LayoutHeader;
                    background: linear-gradient(to right, rgb(255, 255, 255), #ededed);
                }
            }
        }
    }
    .exit{
        color: #333;
        margin: 0;
    }
    .el-avatar>img{
        display: inline-block !important;
        width: 40px !important;
        height: 40px !important;

    }
    .open #header_wrap{
        left: 75px;
        @include webkit(transition,all .3s linear);
    }
    .close #header_wrap{
        left: $nav-width;
        @include webkit(transition,all .3s linear);
    }
</style>