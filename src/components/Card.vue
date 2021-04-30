<template>
  <div class="mainContainer">
    <div v-for="l in 6" :key="l" class="card-container">
      <el-card class="box-card" :body-style="getBgStyle">
        <div class="card-top">
          <div class="top-left" style="float: left">
            <svg-icon icon-class="zookeeper" aria-hidden="true"> </svg-icon
            >ZooKeeper
          </div>
          <div class="top-right" style="float: right">
            <svg-icon
              v-if="getRunState"
              :icon-class="iconClass"
              aria-hidden="true"
            >
            </svg-icon>
            <span style="padding: 0px 10px">|</span>
            <el-dropdown :hide-on-click="true" placement="bottom-start">
              <span class="el-dropdown-link">
                <svg-icon icon-class="more" aria-hidden="true"> </svg-icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="card-main">
          <div class="storage">
            <div
              style="width:100px; height:50%; border-radius:5px; background-color:red; position:absolute; left:0; bottom:0;opacity:0.2"
            ></div>
            <div class="storage_top" style="margin-top:10px">
              CPU总额
            </div>
            <div class="storage_bottom" style="margin-top:90px">
              128Cores
            </div>
            <div class="storage_info" style="margin-top:100px">使用率</div>
          </div>
          <div class="storage">
            内存总额
            <div
              style="width:100px; height:50%; border-radius:5px; background-color:red; position:absolute; left:0; bottom:0;opacity:0.2"
            ></div>
          </div>
          <div class="storage">
            储存总额
            <div
              style="width:100px; height:50%; border-radius:5px; background-color:red; position:absolute; left:0; bottom:0;opacity:0.2"
            ></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconColor: "green",
      state: "start",
      iconClass: ""
    };
  },
  methods: {
    open() {
      this.state = "start";
    },
    close() {
      this.state = "end";
    }
  },
  computed: {
    getBgStyle() {
      if (this.state == "start") {
        this.iconClass = "greenPoint";
        return {};
      } else {
        this.iconClass = "grayPoint";
        return { backgroundColor: "#d2d2d2" };
      }
    },
    getRunState() {
      if (this.state == "start") {
        return "greenPoint";
      } else {
        return "grayPoint";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mainContainer {
  display: flex;
  flex-wrap: wrap;
  .card-container {
    padding: 10px;
  }
  .box-card {
    .card-top {
      overflow: hidden;
      zoom: 1;
    }
    .card-main {
      display: flex;
      justify-content: center;
      text-align: center;
      > .storage {
        margin: 6px;
        height: 180px;
        width: 150px;
        border-radius: 5px;
        background-color: #ddd;
        position: relative;
      }
    }
  }
}
</style>
