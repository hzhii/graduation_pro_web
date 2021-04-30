<template>
  <div
    class="login_container"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <vue-particles
      class="lizi"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <h3>档案信息管理系统</h3>
      </div>
      <!-- 登录表单区-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
        @keyup.enter.native="signIn"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
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
import { login } from "@/api/login";
import { timeFix } from "@/utils/validate";
import Background from "@/assets/background.jpg";
import bg from "@/assets/bg.jpg";
export default {
  data() {
    return {
      loading: false,
      Background: Background,
      bg: bg,
      //登录表单的数据绑定对象
      loginForm: {
        id: "",
        username: "",
        password: ""
      },
      //表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        //验证密码是否合法
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击重置按钮，重置登录
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    signIn() {
      this.loading = true;
      const _this = this;
      const h = this.$createElement;
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        /* const result = await this.$http.post('/studentSystem/login',this.loginForm) */
        await login(this.loginForm)
          .then(response => {
            if (response.code == 200 && response.message == "成功") {
              _this.$store.commit("login", response.result.info.username);
              _this.$store.commit("setId", response.result.info.id);
              _this.$store.commit("setToken", response.result.token);
              _this.$store.commit("setUser", response.result.info);
              _this.$store.commit("setPerms", response.result.perms);
              _this.loading = false;
              _this.$notify({
                title: "登陆成功!",
                message:
                  `${timeFix()}` +
                  "," +
                  response.result.info.name +
                  "," +
                  "欢迎回来！",
                type: "success"
              });
              this.$router.push("/index");
            } else {
              this.$message.error("用户名或密码错误");
              this.loading = false;
            }
            console.log(response);
          })
          .catch(error => {
            this.$message.error("系统异常，请稍后重试");
            console.log(error);
          });
      });
    }
  }
};
</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  //background: url(../assets/bg.jpg) no-repeat center;
  //background-size: cover;
  .lizi {
    height: 100%;
    background: linear-gradient(-180deg, #40899b 0%, #6ad399 100%);
  }
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 90%;
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
