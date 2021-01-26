<template>
  <!-- 头部区域 -->
 <div class="container">
    <div class="title">
      <span>档案信息管理系统</span>
    </div>
    <div class="box">
      <!-- 头像 -->
      <div class="head">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <!-- 登录姓名 -->
      <div class="name">
        <el-dropdown>
          <span class="el-dropdown-link" style="color: #fff">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-switch-button"
              @click.native="warn()"
              >注销登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
 </div>
</template>

<script>
import { logout } from "@/api/login";
export default {
  name: "Header",
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    async signOut() {
      const _this = this;
      await logout().then(response => {
        if (response.code === 200) {
          _this.$store.commit("logout");
          _this.$router.push("/");
        }
      });
    },
    warn() {
      const _this = this;
      this.$confirm("是否退出?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.signOut();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
 .container{
   width: 100%;
   position: relative;
   .box{
     display: flex;
     position: absolute;
     left: 90%;
     .name{
       margin: 0 15px;
     }
     >div{
       display: flex;
       align-items: center
     }
   }
 }
</style>
