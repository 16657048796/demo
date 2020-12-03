<template>
  <div id="loginer">
      <ul class="menu-tab">
        <li :class="{select:item.toggle}"  v-for="(item,index) in menuTab" :key="index" @click="toggleBtn(item)">{{item.txt}}</li>
      </ul>
	  <div class="menu-login">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
			<el-form-item class="eachItem" prop="pass">
				<label class="menu-text" for="email" >邮箱</label>
				<el-input type="text " id="email" autofocus v-model="ruleForm.pass" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item class="eachItem"   prop="checkPass">
				<label class="menu-text" for="password">密码</label>
				<el-input type="password" id="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item class="eachItem"  prop="age">
				<label class="menu-text" for="auteCode">验证码</label>
				<el-row :gutter="10">
					<el-col :span="15">
						<el-input id="auteCode" v-model="ruleForm.age"></el-input>
					</el-col> 
					<el-col :span="9">
						<el-button class="code-btn" type="success"> 验证码 </el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item class="eachItem" >
				<el-button class="btnSubmit" type="danger" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>
	  </div>
  </div>
</template>

<script>

export default {
  data(){
	  const validate_inputValue = (s) =>{ 
		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
		var rs = "";
		console.log(typeof (s))
		var ss=String(s)
		for (var i = 0; i < ss.length; i++) {
			rs = rs + ss.substr(i, 1).replace(pattern, '');
			// console.log( "11",rs)
		}
		return rs;
	}

	  var checkAge = (rule, value, callback) => {
		   this.ruleForm.age = value = validate_inputValue(value)
		  let reg=/[0-9]$/
        if (!value) {
          return callback(new Error('验证码不能为空'));
		}else if(!reg.test(value)){
			return callback(new Error('请输入正确的验证码'));
		}else{
			callback()
		}
      };
      var email = (rule, value, callback) => {
		  let reg=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
          callback(new Error('邮箱账号不能为空'));
        } else if (!reg.test(value)) {
			callback(new Error("请输入正确的邮箱账号"))
		}else{
          	callback();
		}
      };
      var validatePass2 = (rule, value, callback) => {
		  let reg=/^(\w){6,20}$/
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的密码'));
        } else {
          callback();
        }
      };
    return{
      menuTab:[
        {
          txt:"登录",
          toggle:true
        },
        {
          txt:"注册",
          toggle:false
        }
	  ],
		ruleForm: {
			pass: '',
			checkPass: '',
			age: '23123'
		},
		rules: {
			pass: [{ validator: email, trigger: 'blur' }],
			checkPass: [{ validator: validatePass2, trigger: 'blur' }],
			age: [{ validator: checkAge, trigger: 'blur' }]
		}
    }
  },
  methods:{
    toggleBtn(item){
      this.menuTab.map(item=>item.toggle=false);
      item.toggle=true
    },
	submitForm(formName) {
		this.$refs[formName].validate((valid) => {
			if (valid) {
				alert('submit!');
			} else {
				console.log('error submit!!');
			return false;
			}
		});
	},
	resetForm(formName) {
		this.$refs[formName].resetFields();
	}

  },
  
      };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#loginer{
  height: 100vh;
  background: #344a5f;
}
.menu-tab{
	text-align: center;
  padding-top: 120px;
  li{
    display: inline-block;
    height: 36px;
    width: 88px;
    line-height: 36px;
    color: #fff;
	cursor: pointer;
	font-size: 14px;
  }
  .select{
    background: rgba(0,0,0,.1);
  }
}
.menu-login{
	width: 330px;
  margin: 0 auto;
  .login-form{
	.eachItem{
		margin-top: 20px;
		.btnSubmit{
			width: 100%;
		}
	}
	.menu-text{
		color:#fff;
		font-size: 12px;
	}
	.code-btn{
		width: 100%;
	}	
  }
}
</style>
