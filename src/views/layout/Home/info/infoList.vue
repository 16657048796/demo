<template>
    <div id="category">
        <el-button type="danger" @click='addFirstCategory' >添加一级分类</el-button>
		<div class='space-20'></div>	
        <hr class="hr" />
		<div class='space-20'></div>	
        <div>
            <el-row :gutter="30">
                <el-col :span="10">
                    <div class="category-wrap">
                        <div class="category" v-for='(cate) in category.item' :key='cate.id'>
                            <!--一级分类-->
                            <h4>
                                <svg-icon iconName="plus1"></svg-icon>
								{{cate.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round @click="editCategory(cate)">编辑</el-button>
                                    <el-button size="mini" type="success" round @click='addSecondCategory(cate)'>添加子级</el-button>
                                  <el-button size="mini" round @click='deleteFirstCategory(cate)'>删除</el-button>
                                </div>
                            </h4>
                            <!--子级分类-->
                            <ul >
                                <li v-for='_cate in cate.children' :key='_cate.id'>
									{{_cate.category_name}}
                                    <div class="button-group">
                                        <el-button size="mini" type="danger" round>编辑</el-button>
                                        <el-button size="mini" round @click="deleteFirstCategory(_cate)">删除</el-button>
                                    </div>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </el-col>
				<el-col :span="14">
                    <h4 class="menu-title">分类编辑</h4>
                    <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
                        <el-form-item label="一级分类名称：" prop="categoryName" v-if='category_first_input'  >
                            <el-input v-model="form.categoryName" :disabled='is_disabled' ></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" prop="secCategoryName" v-if='category_second_input'>
                            <el-input v-model="form.secCategoryName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" style='width:100px' @click='submit'>确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>	
            </el-row>
        </div>
    </div>
</template>

<script>
import {get_list} from "@/api/login"
import { onMounted, reactive ,ref, watch} from '@vue/composition-api';
  // let sha1=require("js-sha1")
  //sha1值
  import {delePopup} from "@/untils/delePopup"
  import {common} from "@/untils/common"
import {get_categoryAll,add_firstCategory,add_childrenCategory,delete_category,edit_category} from "@/api/getList"
export default {

    setup(){
        //刷新
        const {category:_category,getCategoryAll}=common()
        // category.item=_category.item
        watch(()=>_category.item,(value)=>{
            category.item=value
        })
        onMounted(_=>{
            getCategoryAll()

        })
        //数据
        const category=reactive({
            item:[]
        })
        const form=reactive({
                categoryName:'',
                secCategoryName:'',
                cate:1
        })
        //添加一级分类
        function addFirstCategory(){
            category_second_input.value=false
            is_disabled.value=false
            category_second_lei.value='一级类型'
        }
        //添加子级
        function addSecondCategory(cate){
            is_disabled.value=true
            category_second_input.value=true
            category_second_lei.value='二级类型'
            form.cate=cate.id
        }
        //删除
        
    //删除弹窗
        function deleteFirstCategory(cate){
            // this.$confirm('确认删除此信息？', '提示', {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            // type: "warning",
            // confirmButtonClass:"btn-danger",
            // showClose:true,
            // center: true
            // }).then(() => {
            //     delete_category({
            //         categoryId:cate.id
            //     }).then(res=>{
            //         getCategoryAll()
            //     }).catch(err=>{
            //         alert("删除失败，请稍后重试")
            //     })
            //     this.$message({
            //         type: 'success',
            //         message: '删除成功!'
            //     });
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     });
            // });
            const {confirm}=delePopup()
            confirm({
                content:"确认删除此信息？",
                tip:"提示",
                type:"warning",
                center:"center",
                callback:(id)=>{
                    delete_category({categoryId:id}).then(res=>{
                        getCategoryAll()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                },
                id:cate.id
            })

        }
        // function deleteFirstCategory(cate){
        //     const data={
        //         categoryId:cate.id
        //     }
        //     delete_category(data).then(res=>{
                
        //         getCategoryAll()
        //     }).catch(err=>{
        //         alert("删除失败，请稍后重试")
        //     })
        // }
        //刷新数据
        // function getCategoryAll(){
        //     const dataAll={}
        //     get_categoryAll(dataAll).then(res=>{
        //         category.item=res.data.data
        //     }).catch(err=>{
        //         alert("刷新数据失败")
        //     })
        // }
        //添加一级
        function addFirstCategoryAll(){ 
            const data={
                categoryName:form.categoryName
            }
            add_firstCategory(data).then(res=>{

                getCategoryAll()

            }).catch(err=>{ 
                console.log(1)
            })
        }
        //添加二级
        function addChildrenCategory(){
            const data={
                categoryName:form.secCategoryName,
                parentId:form.cate
            }
            add_childrenCategory(data).then(res=>{
                getCategoryAll()
            }).catch(err=>{

            })
        }

        function editCategory(cate){
            addFirstCategory()
            
            // const data={
            //     id:cate.id,
            //     categoryName:"1111"
            // }
            // edit_category(data).then(res=>{
            //     getCategoryAll()
            // }).catch(err=>{

            // })
        }

        //确定按钮
        function submit(){
            if(category_second_lei.value=='一级类型'){
                addFirstCategoryAll()
            }else if(category_second_lei.value=='二级类型'){
                addChildrenCategory()
            }
            // const dataAll={}
            // get_categoryAll(dataAll).then(res=>{
            //     console.log(111111111)
            // }).catch(err=>{
            //     console.log(12)
            // })
        }

        //是否显示数据
        //一级分类是否显示
        const category_first_input=ref(true)
        //一级输入框是否禁用
        const is_disabled=ref(false)
        //二级输入框是否显示
        const category_second_input=ref(false)
        //添加的数据类型
        const category_second_lei=ref('一级类型')
        return {
            category,form,

            category_first_input,is_disabled,category_second_input,

            addFirstCategory,submit,addSecondCategory,deleteFirstCategory,editCategory

        }





    },
    
//   mounted(){
//     const data={
//         username:"123",
//         truename:"123",
//         phone:"123",
//         pageNumber:1,
//         pageSize:10

//     }
//     get_list(data).then((res)=>{
//     }).catch ((err)=>{
//       console.log(err)
//     })
//   }
};
</script>
<style scoped lang="scss">

ul,li{
    margin: 0;
    padding: 0;
}
#category{
	padding:20px;
	color:#344a5f;
}
.category-wrap {
    div:first-child {
        &:before { top: 20px; }
    }
    div:last-child {
        &:before { bottom: 21px; }
    }
}
.menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
}
.category {
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &:before {
        content: '';
        position: absolute;
        left: 22px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;
    }
    h4 {
        position: relative;
        padding-left: 40px;
    }
    svg {
        position: absolute;
        left: 14px;
        top: 15px;
        background-color: #fff;
        font-size: 17px;    
        margin-top: -5px;
    }
    li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li, h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .button-group { display: block; }
        }
    }
}
.button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button { font-size: 12px; }
}
.from-wrap {
    width: 410px;
    padding-top: 26px;
}
.hr-e9e9e9 {
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
	border-bottom: 1px solid #e9e9e9;
	
}
</style>