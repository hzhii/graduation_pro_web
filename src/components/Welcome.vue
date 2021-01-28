<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
      </el-breadcrumb>
    <h3>Welcome</h3>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style>

</style>
