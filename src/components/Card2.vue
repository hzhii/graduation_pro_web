<template>
  <div class="test">
    <el-col :span="24">
      <div class="tabs">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
          <el-radio-button label="top">top</el-radio-button>
          <el-radio-button label="right">right</el-radio-button>
          <el-radio-button label="bottom">bottom</el-radio-button>
          <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>
      </div>
    </el-col>
    <div class="main" v-for="item in dataSource" :key="item.index">
      <h2 style="color:#4f77c7">| &nbsp;{{ item.FirstTitle }}</h2>
      <div style="display:flex;flex-wrap: wrap;">
        <div class="card" v-for="items in item.data" :key="items.index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div style="float:left;margin-top:2px;display:flex">
                <svg-icon
                  icon-class="asset"
                  aria-hidden="true"
                  style="font-size:21px"
                >
                </svg-icon
                >&nbsp;&nbsp;<span class="firstspan">{{
                  items.SecondTitle
                }}</span>
              </div>
              <div
                style="float: right; padding: 3px 0;background: #c5dfff"
                type="text"
              >
                <svg-icon
                  icon-class="asset"
                  aria-hidden="true"
                  style="font-size:21px"
                >
                </svg-icon
                >&nbsp;
                <span class="secondspan">{{ items.total }}</span>
              </div>
            </div>
            <div class="text item">
              <div class="content" v-for="i in items.data" :key="i.index">
                <span>{{ i.ThirdTitle }}</span
                >&nbsp;<span id="blue">{{ i.total }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "right",
      dataSource: [
        {
          FirstTitle: "营销管理系统",
          data: [
            {
              SecondTitle: "市场交易",
              total: 300,
              data: [
                {
                  ThirdTitle: "管理功能",
                  total: 62
                },
                {
                  ThirdTitle: "标准化",
                  total: 34
                },
                {
                  ThirdTitle: "市场交易",
                  total: 56
                }
              ]
            },
            {
              SecondTitle: "班组织标准化",
              total: 300,
              data: [
                {
                  ThirdTitle: "管理功能",
                  total: 34
                },
                {
                  ThirdTitle: "标准化",
                  total: 78
                },
                {
                  ThirdTitle: "市场交易",
                  total: 24
                }
              ]
            }
          ]
        },
        {
          FirstTitle: "资产管理系统管理系统",
          data: [
            {
              SecondTitle: "市场交易",
              total: 300,
              data: [
                {
                  ThirdTitle: "管理功能",
                  total: 62
                },
                {
                  ThirdTitle: "标准化",
                  total: 34
                },
                {
                  ThirdTitle: "市场交易",
                  total: 56
                }
              ]
            },
            {
              SecondTitle: "班组织标准化",
              total: 300,
              data: [
                {
                  ThirdTitle: "管理功能",
                  total: 34
                },
                {
                  ThirdTitle: "标准化",
                  total: 78
                },
                {
                  ThirdTitle: "市场交易",
                  total: 24
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.test {
  .tabs {
    text-align: center;
  }
}

.card {
  display: flex;
  flex-wrap: wrap;
}

.text {
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  .content {
    padding: 8px;
    margin: 10px 10px;
    background-color: #dde2e8;
    #blue {
      color: blue;
      padding: 0 0 0 5px;
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 12px;
  .firstspan {
    font-size: 20px;
    display: block;
  }
  .secondspan {
    font-size: 16px;
  }
}

.content-icon-svg {
  font-size: 21px;
}
</style>
