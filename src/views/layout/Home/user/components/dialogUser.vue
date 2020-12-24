<template>
  <el-dialog
    title="新增"
    :append-to-body="true"
    :visible.sync="my_centerDialogVisible"
    @close="close"
    width="28%"
    left
    class="newly_wrap"
  >
  <!-- 地区的选择 -->
    <el-form label-width="auto" :model="formLabelAlign" >

      <el-form-item label="用户名：">
        <el-input
          v-model="formLabelAlign.username"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input
          v-model="formLabelAlign.name"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input
          v-model="formLabelAlign.phone"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
        <!-- 地址行 -->
      <el-form-item label="地区：" class="from_region">
        <!-- 第一层引入外部JSON数据进行选择  弄完也会进行双向数据绑定进行参数保存 -->
        <el-select v-model="regionValue" placeholder="请选择" >
            <el-option
            v-for="(item,index) in regionJson"
            :key="index"
            :label="item.name"
            :value="index">
            </el-option>
        </el-select>
        <!-- 第二层的获取首先判断第一层的值是否存在，如果不存在，那就用默认的第一个值 ，如果存在就进行a[num].b进行调用  弄完也会进行双向数据绑定进行参数保存 -->
        <el-select v-model="regionValue_one" placeholder="请选择">
            <template>
                <el-option
                v-for="(item,index) in regionValue ? regionJson[regionValue].city : regionJson[0].city"
                :key="index" 
                :label="item.name"
                :value="index">
                </el-option>
            </template>
        </el-select>
        <!-- 第三层的获取首先判断第二层的值是否存在，如果不存在，那就用默认的第一个值a[0].b[0].c ，如果存在  就进行a[num1].b[num2].c进行调用  弄完也会进行双向数据绑定进行参数保存 -->
        <el-select v-model="regionValue_two" placeholder="请选择" >
            <template>
                <el-option
                v-for="(item,index) in regionValue_one ? regionJson[regionValue].city[regionValue_one].area : regionJson[regionValue].city[0].area"
                :key="index" 
                :label="item"
                :value="index">
                </el-option>
            </template>
        </el-select>
      </el-form-item>
      <!-- 是否启用 -->
      <el-form-item label="是否启用：">
        <el-radio v-model="formLabelAlign.radio" label="1">禁用</el-radio>
        <el-radio v-model="formLabelAlign.radio" label="2">启用</el-radio>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色：">
        <el-checkbox-group 
            v-model="role"
            :max="1"
            >
          <el-checkbox v-for="(item,index) in checkList" :key="index" :label="item" >{{item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item class="newly_buttons">
        <el-button @click="my_centerDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="my_centerDialogVisible = false"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import regionJson from "@/untils/region.json";
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
      
    const formLabelAlign = reactive({
      username: "",
      name: "",
      phone: "",
      radio:"1",
      checkList:["系统管理员","信息管理员","用户管理员",
      ],
      checkListDate:[]
    });
    //页面的初始值false
    const my_centerDialogVisible = ref(false);

    //对父级传过来的值进行监听，监听到发生变化时会对模块进行更新
    watch(
      () => props.centerDialogVisible,
      (newresource, prevResource) => {
        my_centerDialogVisible.value = newresource;
      }
    );
    //返回父级一个参数
    function close() {
      emit("update:centerDialogVisible", false);
    }
    //初始化定义地址模块的三个属性
    const  regionValue=ref(0)
    const regionValue_one=ref(0)
    const regionValue_two=ref()
    //对第一个属性进行更新，如有变化清除数据中存在的值
    watch(regionValue,(a,b)=>{
        regionValue_one.value=undefined
        regionValue_two.value=undefined
    })
    //对第二个属性进行更新，如有变化清除数据中存在的值
    watch(regionValue_one,(a,b)=>{
        regionValue_two.value=undefined
    })
    //角色数据
    const role=ref([])

      const checkList=ref(["系统管理员","信息管理员","用户管理员",
      ])
    return {
      formLabelAlign,
      my_centerDialogVisible,
      close,
      regionValue,regionValue_one,regionValue_two,
    //地址JSON数据
        regionJson,
        //角色
        role,checkList
    };
  },
};
</script>

<style scoped lang="scss">
</style>