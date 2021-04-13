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
              <el-breadcrumb-item>分析页</el-breadcrumb-item>
              <el-breadcrumb-item>数据分析</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>数据分析</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 上 -->
          <el-row
            :gutter="40"
            class="panel-group"
            style="height: 400px"
            v-show="this.$store.state.user.sysrole.nameZh == '系统管理员'"
          >
            <el-col :span="8" class="card-panel-col">
              <div class="card-panel">
                <div ref="chart1" class="card-panel-description"></div>
              </div>
            </el-col>
            <el-col :span="8" class="card-panel-col">
              <div class="card-panel">
                <div ref="chart2" class="card-panel-description"></div>
              </div>
            </el-col>
            <el-col :span="8" class="card-panel-col">
              <div class="card-panel">
                <div ref="chart4" class="card-panel-description"></div>
              </div>
            </el-col>
          </el-row>
          <!-- 中 -->
          <el-row class="panel-group" style="height: 600px">
            <el-col :span="24" class="card-panel-col">
              <div class="card-panel">
                <el-date-picker
                  v-model="value2"
                  type="month"
                  :clearable="false"
                  @change="changeDate"
                >
                </el-date-picker>
                <div ref="chart5" class="card-panel-description"></div>
              </div>
            </el-col>
          </el-row>
          <!-- 下 -->
          <el-row
            class="panel-group"
            style="height: 600px"
            v-show="this.$store.state.user.sysrole.nameZh == '系统管理员'"
          >
            <el-col :span="24" class="card-panel-col">
              <div class="card-panel">
                <div ref="chart3" class="card-panel-description"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  getCharts1,
  getCharts2,
  getCharts3,
  getCharts4,
  getCharts5
} from "@/api/manage";
require("echarts/theme/macarons"); // echarts theme
export default {
  name: "Echarts",
  data() {
    return {
      activeName: "first",
      value2: ""
    };
  },
  methods: {
    formatTime(value) {
      var moment = require("moment");
      if (value == undefined) {
        return "";
      }
      return moment(value).format("YYYY-MM");
    },
    changeDate() {
      this.value2 = this.formatTime(this.value2);
      this.getCharts5();
    },
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      month = month + 1;
      month = month.toString().padStart(2, "0");
      this.value2 = `${year}-${month}`;
    },
    async getCharts1() {
      const that = this;
      await getCharts1()
        .then(resp => {
          if (resp.code == 200) {
            that.drawChart1(resp.result);
          }
        })
        .catch(err => {
          this.$message.error("获取数据失败!");
        });
    },
    async getCharts2() {
      const that = this;
      await getCharts2()
        .then(resp => {
          if (resp.code == 200) {
            that.drawChart2(resp.result.date, resp.result.num);
            console.log(resp.result.date);
            console.log(resp.result.num);
          }
        })
        .catch(err => {
          this.$message.error("获取数据失败!");
        });
    },
    async getCharts3() {
      const that = this;
      await getCharts3()
        .then(resp => {
          if (resp.code == 200) {
            that.drawChart3(resp.result.section, resp.result.num);
          }
        })
        .catch(err => {
          this.$message.error("获取数据失败!");
        });
    },
    async getCharts4() {
      const that = this;
      await getCharts4()
        .then(resp => {
          if (resp.code == 200) {
            that.drawChart4(resp.result.education, resp.result.num);
          }
        })
        .catch(err => {
          this.$message.error("获取数据失败!");
        });
    },
    async getCharts5() {
      const that = this;
      await getCharts5({ date: this.value2 })
        .then(resp => {
          if (resp.code == 200) {
            that.drawChart5(resp.result.name, resp.result.num);
          }
        })
        .catch(err => {
          this.$message.error("获取数据失败!");
        });
    },
    drawChart1(data) {
      const that = this;
      const myChart = echarts.init(this.$refs.chart2);
      myChart.setOption({
        title: {
          text: "部门人数概览",
          top: 20,
          left: "left"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          bottom: 0
        },
        series: [
          {
            name: "部门人数",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8
            },
            label: {
              show: true,
              position: "inside"
            },
            data: data
          }
        ]
      });
      //响应式布局
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    drawChart2(dataName, dataValue) {
      const that = this;
      const myChart = echarts.init(this.$refs.chart3);
      myChart.setOption({
        title: {
          text: "近7天登录人数",
          top: 20,
          left: "left"
        },
        tooltip: { trigger: "axis" },
        legend: {},
        xAxis: {
          type: "category",
          data: dataName,
          offset: 2,
          axisLabel: {
            show: true,
            rotate: 10,
            interval: "auto",
            align: "center",
            margin: 30
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: dataValue,
            type: "line",
            label: {
              show: true,
              position: "top"
            },
            itemStyle: {
              normal: {
                color: "#B3E4A1"
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.5
              }
            }
          }
        ]
      });
      //响应式布局
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    drawChart3(section, num) {
      const that = this;
      const myChart = echarts.init(this.$refs.chart1);
      myChart.setOption({
        title: {
          text: "员工年龄组成",
          top: 20,
          left: "left"
        },
        legend: {},
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: section
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: num,
            type: "bar",
            showBackground: true,
            barWidth: "40%",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            itemStyle: {
              normal: {
                //这里是重点
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#0A64A4",
                    "#24577B",
                    "#03406A",
                    "#3E94D1",
                    "#65A5D1",
                    "#A4BBCB",
                    "#546571"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  color: "#000000",
                  show: true,
                  position: "inside"
                }
              }
            }
          }
        ]
      });
    },
    drawChart4(education, num) {
      const that = this;
      const myChart = echarts.init(this.$refs.chart4);
      myChart.setOption({
        title: {
          text: "员工学历组成",
          top: 20
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: education
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: education
        },
        series: [
          {
            type: "bar",
            data: num,
            barWidth: "40%",
            itemStyle: {
              normal: {
                //这里是重点
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#66A287",
                    "#587A6A",
                    "#216949",
                    "#97D1B6",
                    "#A6D1BD",
                    "#90BAD8",
                    "#9B9CDE"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  color: "#000000",
                  show: true,
                  position: "inside"
                }
              }
            },
            label: {
              color: "#000000",
              show: true,
              position: "inside"
            }
          }
        ]
      });
    },
    drawChart5(name, num) {
      const that = this;
      const myChart = echarts.init(this.$refs.chart5);
      myChart.setOption({
        title: {
          left: "center",
          text: that.formatTime(that.value2) + "月请假人数总览"
        },
        tooltip: { trigger: "axis" },
        xAxis: {
          data: name,
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "slider", //滑动轴
            start: 1, //距离左侧0刻度的距离，1%
            end: 35 //距离左侧0刻度的距离，35%，相当于规定了滑动的范围
          }
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            barWidth: "40%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: num
          }
        ]
      });
    }
  },
  created() {
    this.getNowTime();
    this.getCharts1();
    this.getCharts2();
    this.getCharts3();
    this.getCharts4();
    this.getCharts5();
  }
};
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
  }
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      font-size: 12px;
      position: relative;
      margin: 0 auto;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);

      .card-panel-description {
        display: flex;
        justify-content: center;
        font-weight: bold;
        height: 400px;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
