<template>
  <div class="main_container">
    <div class="bread">
      <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix">
          <!-- 面包屑区域 -->
          <div class="text item">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/index' }"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item>外链</el-breadcrumb-item>
              <el-breadcrumb-item>百度</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>百度一下</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <iframe
            id="content"
            src="https://www.baidu.com/"
            frameborder="0"
            style="width:100%;height:600px"
          ></iframe>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.main_container {
  .bread {
    .title {
      span {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 32px;
        font-weight: 600;
      }
    }
    .page {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
