<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>档案信息管理系统</span>
      </div>
      <div>
        <!-- 头像 -->
        <div class="block">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
        <!-- 登录姓名 -->
        <div>
          <el-dropdown>
            <span class="el-dropdown-link" style="color: #fff">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="warn()">注销登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 文本 -->
              <span>病案管理</span>
            </template>
            <el-menu-item index="/student" @click="saveNavState('/student')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>病人管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/course" @click="saveNavState('/course')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>病历管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {logout} from '@/api/login'
export default {
  data() {
    return {
      //被激活的链接地址
      activePath: ""
    };
  },
  
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  computed: {
        username() {
          return this.$store.state.username;
        }
    },
  methods: {
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
   async signOut(){
       const _this = this
       await logout().then((response)=>{
         if (response.code === 200) {
            _this.$store.commit('logout')
            _this.$router.push("/");
          }
       })
    },
    warn(){
      const _this = this
      this.$confirm('是否退出?', '退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.signOut()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}
</style>
