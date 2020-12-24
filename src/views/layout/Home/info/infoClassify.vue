<!--  -->
<template>
  <div class="infoClassify">
    <div class="infoClassify_gss">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select
              v-model="category_value"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in category.item"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%"
              v-model="date_value"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日  HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="center"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap key-work">
          <label>关键字：</label>
          <div class="warp-content">
            <el-select
              v-model="search_key"
              style="width: 100%; min-width: 60px"
            >
              <el-option
                v-for="item in search_option.data"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_keyWork"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="getList"
          >搜索</el-button
        >
      </el-col>
      <!-- 新增 -->
      <template>
        <el-col :offset="1" :span="2">
          <el-button
            type="danger"
            class="pull-right"
            style="width: 100%"
            @click="centerDialogVisible = true"
            >新增</el-button
          >
        </el-col>
        <el-dialog
          title="新增"
          :append-to-body="true"
          :visible.sync="centerDialogVisible"
          width="28%"
          left
          class="newly_wrap"
        >
          <el-form label-width="auto" :model="formLabelAlign">
            <el-form-item label="类型：" prop="region">
              <el-select v-model="formLabelAlign.type" placeholder="请选择">
                <el-option
                  v-for="item in category.item"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id"
                ></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="标题：">
              <el-input
                v-model="formLabelAlign.name"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="概括：" prop="desc">
              <el-input
                type="textarea"
                :rows="4"
                v-model="formLabelAlign.region"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item class="newly_buttons">
              <el-button @click="centerDialogVisible = false">取消</el-button>
              <el-button
                type="danger"
                @click="submit(), (centerDialogVisible = false)"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </div>

    <!-- 换行 -->
    <!-- <div class="black-space-30"></div> -->
    <div class="infoClassify_table">
      <template>
        <el-table
          :data="table_data_row.item"
          highlight-current-row
          border
          style="width: 100%"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" align="center" width="50">
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center">
          </el-table-column>
          <el-table-column
            v-bind:formatter="_cate"
            prop="categoryId"
            label="类型"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            :formatter="_date"
            label="日期"
            width="240"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="role"
            width="110"
            align="center"
            label="管理人"
          >
          </el-table-column>
          <!-- <el-table-column width="188" align="center"  label="地址">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="success" size="small">编辑</el-button>
          </el-table-column> -->
          <el-table-column width="188" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="open(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="bottom">
      <el-button class="bottom_btn" @click="batch_btn">批量删除</el-button>
      <el-pagination
        class="bottom_pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="sizes,prev, pager, next"
        :page-sizes="[5,10,15,20]"
        :page-size="total_data.pageNumber"
        :current-page="total_data.pageSize"
        :total="total"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
import { delePopup } from "@/untils/delePopup";
import { common } from "@/untils/common";
import { formatDate } from "@/untils/timer";
import { get_list, add_list, dele_list } from "@/api/getList";
export default {
  setup(props, { root }) {
    // 日期值
    let date_value = ref("");
    // 信息分类值
    let category_value = ref("");

    const { category: _category, getCategoryAll } = common();
    // category.item=_category.item
    watch(
      () => _category.item,
      (value) => {
        category.item = value;
      }
    );
    onMounted((_) => {
      getCategoryAll();
    });
    //信息分类下拉数据
    let category = reactive({
      item: [],
    });
    // 搜索类型数组
    let search_option = reactive({
      data: ["标题", "类型", "日期"],
    });
    const total = ref();
    const total_data = reactive({
      pageNumber: 5,
      pageSize: 1,
    });
    function handleSizeChange(val) {
      total_data.pageNumber = val;
      new_getList();
    }
    function handleCurrentChange(val) {
      console.log(val);
      total_data.pageSize = val;
      new_getList();
    }
    //搜索字段id
    let search_key = ref("id");
    //搜索字段
    let search_keyWork = ref("");
    //搜索字段
    let loadingData = ref(false);

    // 表示数据
    let table_data = reactive({
      item: [],
    });
    //搜索
    function getList() {
        const data={
        categoryId: category_value.value,
        // pageNumber: total_data.pageSize,
        // pageSize: total_data.pageNumber,
        pageNumber: 1,
        pageSize: total_data.pageNumber,
      }
        if(date_value.value!==""){
            const data={
                categoryId: category_value.value,
                startTime:date_value.value[0],
                endTime:date_value.value[1],
                pageNumber: 1,
                pageSize: total_data.pageNumber,
            }
        }
      get_list(data).then((res) => {
        console.log(res);
        table_data_row.item = res.data.data.data;
        date_value.value=""
      });
    }
    //搜索
    function handleSelectionChange() {}
    //新增
    function toCategory() {}
    //搜索
    function toData() {}
    const dialog_info = ref(false);

    onMounted(() => {
      new_getList();
    });
    //刷新列表
    function new_getList() {
      const data = {
        pageNumber: total_data.pageSize,
        pageSize: total_data.pageNumber,
      };
      get_list(data)
        .then((res) => {
          table_data_row.item = res.data.data.data;
          total.value = res.data.data.total;
        })
        .catch((err) => {});
    }
    const _cate = (row) => {
      let str = "";
      category.item.forEach((cate) => {
        if (cate.id == row.categoryId) {
          str = cate.category_name;
        }
      });
      return str;
      // return
    };
    //时间戳
    const _date = (row) => {
      return formatDate(row.createDate);
    };
    //表格数据
    const table_data_row = reactive({
      item: [],
    });

    //新增弹框开关
    const centerDialogVisible = ref(false);
    //新增弹框样式
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });
    //提交表单数据
    function submit() {
      const data = {
        categoryId: formLabelAlign.type,
        title: formLabelAlign.name,
        content: formLabelAlign.region,
      };
      add_list(data)
        .then((res) => {
          // console.log(res)
          new_getList();
        })
        .catch((err) => {});
      formLabelAlign.name = "";
      formLabelAlign.region = "";
      formLabelAlign.type = "";
    }

    //表单删除
    //删除弹窗
    function open(index, rows) {
      const { confirm } = delePopup();
      confirm({
        content: "确认删除此信息？",
        tip: "提示",
        type: "warning",
        center: "center",
        callback: () => {
          dele_list({ id: Array(rows.id) })
            .then((res) => {
              total_data.pageNumber=5
              total_data.pageSize=1
              new_getList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        ids: index,
      });
    }
    //批量删除
    function selectionChange(selection) {
      selection_data = selection;
      console.log(selection);
    }
    let selection_data = reactive([]);
    function batch_btn() {
      var selection_data_dele = selection_data.map((item) => item.id);
      const { confirm } = delePopup();
      confirm({
        content: "确认删除此信息？",
        tip: "提示",
        type: "warning",
        center: "center",
        callback: () => {
          dele_list({ id: selection_data_dele })
            .then((res) => {
              new_getList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    }
    //表单编辑
    function handleEdit(index, row) {
      console.log(index, row);
    }
    return {
      date_value,
      category,
      category_value,
      search_option,
      search_key,
      search_keyWork,
      loadingData,
      table_data,
      getList,
      handleSelectionChange,
      toCategory,
      toData,
      table_data_row,
      dialog_info,
      formLabelAlign,
      centerDialogVisible,
      handleEdit,
      open,
      submit,
      _date,
      _cate,
      total,
      handleSizeChange,
      handleCurrentChange,
      total_data,
      batch_btn,
      selectionChange,
    };
  },
};
</script>
<style scoped lang="scss">
.infoClassify {
  padding: 30px;
  .el-col {
    padding-right: 10px;
  }
  .infoClassify_gss {
    height: 60px;
  }
  .infoClassify_table {
    margin-top: 20px;
  }
}
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-work {
    @include labelDom(right, 99, 40);
  }
}

.newly_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  padding: 30px;
  p {
    font-size: 20px;
    font-weight: 500;
    height: 60px;
  }
  .el-form-item {
    margin-top: 30px;
  }
  .el-dialog__body {
    padding: 30px;
  }
}
.newly_buttons {
  .el-form-item__content {
    background: #888;
    .el-button {
      width: 150px;
      height: 40px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
.bottom {
  margin-top: 20px;
  .bottom_pagination {
    float: right;
  }
  .bottom_btn {
    float: left;
  }
}
</style>
