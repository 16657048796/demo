<template>
    <div id="main_wrap">
        <router-view />
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    #main_wrap{
        position: fixed;
        top: $LayoutHeader;
        right: 0px;
        bottom: 0px;
        border: 50px solid #f7f7f7;
        border-bottom: none;
        background-color: #fff;
    }
    
    .open #main_wrap{
        left: 75px;
        @include webkit(transition,all .3s linear);
    }
    .close #main_wrap{
        left: $nav-width;
        @include webkit(transition,all .3s linear);
    }
</style>