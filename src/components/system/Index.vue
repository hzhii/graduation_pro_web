<template>
  <el-container class="home-container">
    <el-header>
      <Header></Header>
    </el-header>
  <el-container>
    <el-aside width="200px">
    <Menu></Menu>
    </el-aside>
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import Header from "./Header";
import Menu from "./Menu";
export default {
  components: {
    Header,
    Menu
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
  background-color:#373d41;

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
