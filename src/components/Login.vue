<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <h3>档案信息管理系统</h3>
      </div>
      <!-- 登录表单区-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="signIn">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/login'
export default {
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        id: '',
        username: '',
        password: ''
      },
      //表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        //验证密码是否合法
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //点击重置按钮，重置登录
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    signIn() {
      const _this = this
      const h = this.$createElement
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        /* const result = await this.$http.post('/studentSystem/login',this.loginForm) */
        await login(this.loginForm).then((response) => {
          if (response.code == 200 && response.message == "成功") {
          _this.$store.commit('login',response.result.info.username)
          _this.$store.commit('setId',response.result.info.id)
          _this.$store.commit('setToken',response.result.token)
          _this.$notify({
          title: '登陆成功!',
          message: '欢迎回来~',
          type:'success'
        });
            this.$router.push("/index")
          } else {
            this.$message.error("用户名或密码错误")
          }
          console.log(response)
        }).catch((error) => {
          this.$message.error("系统异常，请稍后重试")
          console.log(error)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>
