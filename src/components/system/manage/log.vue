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
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
              <el-breadcrumb-item>系统日志</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>系统日志</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 查询区域 -->
          <div class="search">
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            </el-form>
          </div>
          <div class="button">
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete()">
              <el-button
                type="danger"
                icon="el-icon-delete"
                slot="reference"
                v-has="'admin'"
                >删除</el-button
              >
            </el-popconfirm>
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              tooltip-effect="light"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="username" label="用户名" width="180">
              </el-table-column>
              <el-table-column prop="description" label="操作" width="180">
              </el-table-column>
              <el-table-column prop="params" label="请求参数" width="180">
              </el-table-column>
              <el-table-column prop="requestIp" label="请求IP" width="180">
              </el-table-column>
              <el-table-column prop="address" label="登录地址" width="180">
              </el-table-column>
              <el-table-column prop="browser" label="登录浏览器" width="180">
              </el-table-column>
              <el-table-column
                prop="time"
                label="登录时间"
                width="180"
                :formatter="dateFormat"
              >
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页区域 -->
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getSystemLog, deleteSystemLog } from "@/api/manage";
import moment from "moment";
export default {
  data() {
    return {
      noEdit: true,
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
      //多选
      multipleSelection: []
    };
  },
  methods: {
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllLog();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllLog();
    },
    handleDelete() {
      const that = this;
      let params = [];
      this.multipleSelection.forEach(function(item) {
        params.push(item.logId); // 添加所有需要删除数据的id到一个数组，post提交过去
      });
      if (params == "") {
        this.$message.warning("请先选择要删除的公告!");
        return;
      }
      deleteSystemLog({ ids: params }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功");
          this.getAllLog();
        } else {
          this.$message.error("系统异常,请稍后再试");
        }
      });
    },
    dateFormatter(str) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        return (
          [year, month, day].join("-") + " " + [hour, minute, second].join(":")
        );
      } else {
        return [year, month, day].join("-");
      }
    },
    dateFormat(row, column) {
      var date = row[column.property];

      if (date == undefined) {
        return "";
      }

      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    getAllLog() {
      const that = this;
      getSystemLog(this.queryInfo).then(resp => {
        if (resp.code == 200) {
          that.tableData = resp.result.list;
          that.total = resp.result.total;
          this.$message.success("查询成功");
        }
      });
    }
  },
  created() {
    this.getAllLog();
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
    .page {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
