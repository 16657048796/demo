<template>
  <div id="loginer">
    <ul class="menu-tab">
      <li
        :class="{ select: item.toggle }"
        v-for="(item, index) in menuTab.menu"
        :key="index"
        @click="toggleBtn(item)"
      >
        {{ item.txt }}
      </li>
    </ul>
    <div class="menu-login">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item class="eachItem" prop="email">
          <label class="menu-text" for="email">邮箱</label>
          <el-input
            type="text "
            id="email"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="eachItem" prop="pass">
          <label class="menu-text" for="pass">密码</label>
          <el-input
            type="text"
            id="pass"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 注册块中的选项框 -->
        <el-form-item v-show="menuTab.toggeleTabPass" prop="checkPass">
          <label class="menu-text" for="auteCode">确认密码</label>
          <el-input
            type="text"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="eachItem" prop="age">
          <label class="menu-text" for="auteCode">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input id="auteCode" v-model="ruleForm.age"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                class="code-btn"
                type="success"
                :disabled="buttonCodeShow"
                @click="getCode"
              >
                {{ buttonCodeText }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="eachItem">
          <el-button
            class="btnSubmit"
            type="danger"
            :disabled="buttonLoginShow"
            @click="doRegister"
            >{{ buttonLoginText }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import verify from "@/api/validata.js";
import { get_login, do_login,do_register } from "@/api/login";
import { ref, reactive } from "@vue/composition-api";
export default {
  setup(prop, { refs, root }) {
    //验证码方法验证
    let checkAge = (rule, value, callback) => {
      ruleForm.age = value = verify.validate_inputValue(value);
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    //邮箱验证
    let email = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱账号不能为空"));
      } else if (!verify.test_email(value)) {
        callback(new Error("请输入正确的邮箱账号"));
      } else {
        callback();
      }
    };
    //密码验证
    var pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!verify.test_pass(value)) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    //再次输入密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //通过后台获取验证码验证
    const getCode = () => {
      //模拟请求数据网络延迟
      buttonCodeShow.value = true;
      buttonCodeText.value = "发送中";

      if (ruleForm.email == "") {
        // console.log(1)
        root.$message.error("邮箱不能为空");
        buttonCodeShow.value = false;
        buttonCodeText.value = "获取验证码";
      }else if(!verify.test_email(ruleForm.email)) {
        root.$message.error("请输入正确的邮箱账号");
        buttonCodeShow.value = false;
        buttonCodeText.value = "获取验证码";
      }else{
        buttonCodeState.value = setTimeout( _ => {
          const data = {
            username: ruleForm.email,
            module:ipt.value,
          };
          buttonCodeShow.value = false;
          buttonCodeText.value = "获取验证码";
          get_login(data).then((res) => {
            root.$message.success(res.data.message);
            buttonLoginShow.value = false;
          })
          .catch((err) => {
            console.log("请求出错", err);
          });
        }, 3000);
      }
    };
    //数据
    let rules = reactive({
      email: [{ validator: email, trigger: "blur" }],
      pass: [{ validator: pass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
      age: [{ validator: checkAge, trigger: "blur" }],
    });
    //视图层数据
    let ruleForm = reactive({
      email: "",
      pass: "",
      checkPass: "",
      age: "",
    });
    //登录注册切换的数据
    let menuTab = reactive({
      toggeleTabPass: false,
      menu: [
        {
          txt: "登录",
          toggle: true,
        },
        {
          txt: "注册",
          toggle: false,
        },
      ],
    });
    //methods
    //登陆切换
    function toggleBtn(item) {
      menuTab.menu.map((item) => (item.toggle = false));
      item.toggle = true;
      if (item.txt == "登录") {
        menuTab.toggeleTabPass = false;
        buttonLoginText.value = "登录";
        ipt.value="/login/"
      } else {
        menuTab.toggeleTabPass = true;
        buttonLoginText.value = "注册";
		ipt.value="/register/"
      }
      //切换改变获取验证码按钮的状态
      clearTimeout(buttonCodeState.value);
      buttonCodeShow.value = false;
      buttonCodeText.value = "获取验证码";
      resetForm("ruleForm");
	}
	//登陆注册  
	function doRegister(){
		const data={
			username:ruleForm.email,
			password:ruleForm.pass,
			code:ruleForm.age
    }
    const DessAsss={data,ipt:ipt.value}
        root.$store.dispatch('app/login',DessAsss).then((res)=>{
          console.log("跳转")
        root.$message.success(res.data.message);
      if(ipt.value=="/login/"){
        root.$router.push({ 
          path:"/Demo"
        })
      }else if(ipt.value=="/register/"){
        menuTab.menu.map((item) => (item.toggle = false));
        menuTab.menu[0].toggle=true
        menuTab.toggeleTabPass = false;
        buttonLoginText.value = "登录"; 
        ipt.value="/login/"
      //切换改变获取验证码按钮的状态
        clearTimeout(buttonCodeState.value);
        buttonCodeShow.value = false;
        buttonCodeText.value = "获取验证码";
        resetForm("ruleForm");
      }
    }).catch((err)=>{
          console.log("跳转","111111111")
          alert(err)
    })
		// do_register(data,ipt.value).then((res) => {
    //   root.$message.success(res.data.message);
    //   if(ipt.value=="/login/"){
    //     root.$router.push({ 
    //       path:"/Demo"
    //     })
    //   }else if(ipt.value=="/register/"){
        
    //     menuTab.menu.map((item) => (item.toggle = false));
    //     menuTab.menu[0].toggle=true
    //     menuTab.toggeleTabPass = false;
    //     buttonLoginText.value = "登录";
    //     ipt.value="/login/"
    //   //切换改变获取验证码按钮的状态
    //     clearTimeout(buttonCodeState.value);
    //     buttonCodeShow.value = false;
    //     buttonCodeText.value = "获取验证码";
    //     resetForm("ruleForm");
    //   }
		// }).catch((err) => {
		// 	console.log("请求出错", err);
		// });
	}
    // //登录按钮
    // function submitForm(formName) {
    //   refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // }
    //重置选择框
    function resetForm(formName) {
      refs[formName].resetFields();
    }
    //登录注册按钮的显示与隐藏
    const buttonLoginShow = ref(true);
    //登录注册按钮的文本
    const buttonLoginText = ref("登录");
    //获取验证码按钮显示与隐藏
    const buttonCodeShow = ref(false);
    //获取验证码按钮文字
    const buttonCodeText = ref("获取验证码");
    //验证码按钮状态
    const buttonCodeState = ref(null);
	//给后台状态
	const ipt=ref("/login/")
    return {
      menuTab,
      getCode,
      ruleForm,
      rules,
      toggleBtn,
      // submitForm,
      resetForm,
      buttonCodeState,
      buttonCodeText,
      buttonLoginText,
      buttonLoginShow,
	  buttonCodeShow,
	  doRegister,
	  ipt
    };
  },
};
</script>
<style scoped lang="scss">
#loginer {
  height: 100vh;
  background: #344a5f;
}
.menu-tab {
  text-align: center;
  padding-top: 120px;
  li {
    display: inline-block;
    height: 36px;
    width: 88px;
    line-height: 36px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
  }
  .select {
    background: rgba(0, 0, 0, 0.1);
  }
}
.menu-login {
  width: 330px;
  margin: 0 auto;
  .login-form {
    .eachItem {
      margin-top: 20px;
      .btnSubmit {
        width: 100%;
      }
    }
    .menu-text {
      color: #fff;
      font-size: 12px;
    }
    .code-btn {
      width: 100%;
    }
  }
}
</style>
