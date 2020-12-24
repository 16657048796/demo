<template>
  <div id="userSon">
    <div class="userSon_operation">
      <div class="pull-left userSon_operation_left">
        <!-- <p class="userSon_operation_left_text">关键字：</p> -->
        <template class="userSon_operation_left_select">
          <!-- <el-select v-model="data.value" placeholder="请选择">
            <el-option
              v-for="item in data.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
            <label>活动区域：</label>
            <el-select v-model="data.value" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </template>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="danger">搜索</el-button>
      </div>
      <div class="pull-right userSon_operation_right">
        <el-button type="danger" @click="centerDialogVisible=true">新增</el-button>
        <dialogUser :centerDialogVisible.sync="centerDialogVisible"  />
      </div>
    </div>
    <div class="userSon_table">
      <template>
        <el-table :data="table_data.tableData" highlight-current-row border  style="width: 100% ">
            
          <el-table-column type="selection"  align="center" width="50">
          </el-table-column>
          <el-table-column prop="date" label="日期" align="center" >
          </el-table-column>
          <el-table-column prop="name" label="真实姓名" align="center">
          </el-table-column>
          <el-table-column prop="telephone" label="手机号" align="center">
          </el-table-column>
          <el-table-column prop="address" align="center" label="地址"> </el-table-column>
          <el-table-column prop="role" width="240" align="center"  label="角色"> </el-table-column>
          <el-table-column width="110" prop="swipt" align="center" label="禁用状态">
            <template slot-scope="scope">
                <el-switch
                v-model="scope.row.swipt"
                v-if="scope.row.swipt!=undefined"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </template>
          </el-table-column>
          <el-table-column width="188" align="center"  label="地址">
            <el-button type="danger">删除</el-button>
            <el-button type="success">编辑</el-button>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import { get_list } from "@/api/login";
import { onMounted, reactive, ref } from "@vue/composition-api";
//引入弹框组件
import dialogUser from "./components/dialogUser";
export default {
  components:{
    dialogUser
  },
  setup(props,{emit}) {
    //顶部下拉框数据
    const data = reactive({
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    });
    //表格数据
    const table_data = reactive({
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          telephone:"16657048796",
          role: "超管",
          address: "上海市普陀区金沙江路 1518 弄",
          swipt:false,
          index:0
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          telephone:"16657048796",
          role: "信息管理",
          address: "上海市普陀区金沙江路 1518 弄",
          swipt:true,
          index:1
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          telephone:"16657048796",
          role: "信息管理",
          address: "上海市普陀区金沙江路 1518 弄",
          swipt:true,
          index:2
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          telephone:"16657048796",
          role: "用户管理",
          address: "上海市普陀区金沙江路 1518 弄",
          index:3
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          telephone:"16657048796",
          role: "超管",
          address: "上海市普陀区金沙江路 1518 弄",
          swipt:true,
          index:4
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          telephone:"16657048796",
          role: "用户管理",
          address: "上海市普陀区金沙江路 1518 弄",
          index:5
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          telephone:"16657048796",
          role: "超管",
          address: "上海市普陀区金沙江路 1518 弄",
          swipt:true,
          index:6
        },
      ],
    });
    const input = ref("");
    const centerDialogVisible = ref(false);
    // const swipt = ref(true);
    
    return {
      data,
      input,
    //   swipt,
      table_data,
      centerDialogVisible
    };
  },
};
</script>

<style scoped lang="scss">
// #userSon {
//   padding: 30px;
//   .userSon_operation {
//       height: 60px;
//     .userSon_operation_left {
//       .userSon_operation_left_text {
//         display: inline-block;
//       }
//       .el-select {
//         width: 160px;
//         box-sizing: border-box;
//       }
//       .el-input {
//         width: 180px;
//         box-sizing: border-box;
//         margin-left: 20px;
//       }
//       .el-button {
//         width: 100px;
//         margin-left: 20px;
//       }
//     }
//     .userSon_operation_right {
//       .el-button {
//         width: 100px;
//       }
//     }
//   }
//   .userSon_table {
//       padding-top: 30px !important;
//     .el-button {
//       width: 60px;
//       height: 28px;
//       line-height: 28px;
//       text-align: center;
//       padding: 0;
//     }
//   }
// }
@media screen and(min-width:1440px) and (max-width: 1920px) {
    #userSon {
    padding: 30px;
    .userSon_operation {
        height: 60px;
        .userSon_operation_left {
        .userSon_operation_left_text {
            display: inline-block;
        }
        .el-select {
            width: 160px;
            box-sizing: border-box;
        }
        .el-input {
            width: 180px;
            box-sizing: border-box;
            margin-left: 20px;
        }
        .el-button {
            width: 100px;
            margin-left: 20px;
        }
        }
        .userSon_operation_right {
        .el-button {
            width: 100px;
        }
        }
    }
    .userSon_table {
        padding-top: 30px !important;
        .el-button {
        width: 60px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0;
        }
    }
    }
}
@media screen and(min-width:1440px) and (max-width: 1920px) {
    #userSon {
    padding: 30px;
    .userSon_operation {
        height: 60px;
        .userSon_operation_left {
            .userSon_operation_left_text {
                display: inline-block;
            }
            .el-select {
                width: 140px;
                box-sizing: border-box;
            }
            .el-input {
                width: 160px;
                box-sizing: border-box;
                margin-left: 20px;
            }
            .el-button {
                width: 80px;
                margin-left: 20px;
            }
        }
        .userSon_operation_right {
            .el-button {
                width: 80px;
            }
        }
    }
    .userSon_table {
        padding-top: 30px !important;
        .el-button {
        width: 60px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0;
        }
    }
    }
}
</style>