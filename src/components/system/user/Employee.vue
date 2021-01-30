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
              <el-breadcrumb-item>用户档案</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>用户档案</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 查询区域 -->
          <div class="search">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="审批人">
                <el-input
                  v-model="formInline.user"
                  placeholder="审批人"
                ></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 操作按钮区域 -->
          <div class="button">
            <el-button type="primary" @click="">添加员工</el-button>
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="name" label="姓名" sortable width="180">
              </el-table-column>
              <el-table-column
                prop="username"
                label="同户名"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                sortable
                width="180"
                :formatter="formatRole"
              >
              </el-table-column>
              <el-table-column prop="age" label="年龄" sortable width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址" sortable width="180">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="联系电话"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column prop="role" label="角色" sortable width="180">
              </el-table-column>
              <el-table-column prop="dep" label="所属部门" sortable width="180">
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
import { queryUser } from "@/api/manage";
export default {
  name: "Employee",
  data() {
    return {
      tableData: [],
      formInline: {
        user: "",
        region: ""
      },
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
        sex: ""
      },
      total: 0
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    onSubmit() {
      console.log("submit!");
    },
    async getAllUser() {
      const that = this;
      await queryUser(this.queryInfo).then(resp => {
        if (resp.code == 200) {
          that.tableData = resp.result.records;
          that.total = resp.result.total;
        } else {
          that.$message.warning(resp.message);
        }
      });
    },
    // 性别转换
    formatRole: function(row, column) {
      return row.sex == "1" ? "男" : row.sex == "0" ? "女" : "null";
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllUser();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllUser();
    }
  },
  created() {
    this.getAllUser();
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
