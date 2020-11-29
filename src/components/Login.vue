<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img
          src="../assets/images/logo.jpg"
          alt=""
        >
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormrules"
        ref="loginFormref"
      >
        <!-- 用户名 -->
        <el-form-item prop="account_number">
          <el-input
            v-model="loginForm.account_number"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="account_password">
          <el-input
            v-model="loginForm.account_password"
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button
            @click="login"
          >登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        "account_number": '184804290',
	      "account_password": '123456'
      },
      // 验证表单用户名和密码的合法性
      loginFormrules: {
        account_number: [
          { required: true, message: '请输入账号', trigger: 'blur' }, 
        ],
        account_password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    };
  },
  created() {
      document.title= "Sign in"
  },
  methods: {
     login() {
      //    登录请求
      //   1项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
       this.$refs.loginFormref.validate(valid => {
        if (!valid) return  // 发起修改信息的网络请求
        this.$http.post('login', this.loginForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.success === true) {
              // 提示登录成功
              this.$message.success('登录成功')
              window.sessionStorage.setItem('id',res.data.data.id)
              window.sessionStorage.setItem('token',res.data.data.token)
              //2、通过编程式导航跳转到后台主页，路由地址是/home
              this.$router.push('/home').catch(() => {})
            }else{
              this.$message.error('登录失败')
             }
          })
      })
    },
    reset() {
      this.loginForm = []
    }
  }
}
</script>
<style scoped>
.login_container {
  /* background: url(../assets/images/background.jpg); */
  background: #f3e4d4;
  background-size: 100% 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgba(255,255,255,0.4);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.el-input {
  opacity: 0.65;
  border: 0;
  outline: none;
  border-style: none;
}
.el-input:focus-within {
  outline: none;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
  opacity: 0.8;
}
.el-button {
  opacity: 0.85;
}
</style>
