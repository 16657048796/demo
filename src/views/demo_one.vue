<template>
    <div id="main_wrap">
        <el-container>
            <el-header class="main_header_wrap">
                <el-row>
                    <el-col :span="4">大话明智露沟图</el-col>
                </el-row>
            </el-header>
            <el-main class="main_main_wrap">Main</el-main>
        </el-container>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
#main_wrap{
    height: 100Vh;
    background: #eee;
    .main_header_wrap{
        display: block;
        background: #1892f6;
        line-height: 60px;
        text-align: center;
        width: 100%;
        color: #fff;
    }
    .main_main_wrap{
        width: 300px;
        height: 90vh;
        border-right: 1px solid #e7e6ec;
        background: #fff;
    }
}
</style>