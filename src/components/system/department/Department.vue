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
              <el-breadcrumb-item>部门档案</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>部门档案</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 查询区域 -->
          <div class="search">
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            </el-form>
          </div>
          <!-- 操作按钮区域 -->
          <div class="button">
            <el-button type="primary" @click="" icon="el-icon-edit"
              >添加部门档案</el-button
            >
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column
                label="操作"
                width="180"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- 修改操作按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click=""
                  >
                  </el-button>
                  <el-popconfirm title="确定删除吗？" @onConfirm="">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      slot="reference"
                    ></el-button>
                  </el-popconfirm>
                </template>
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
    <!-- 添加编辑框 -->
    <el-dialog
      :title="addTitle"
      :visible.sync="addVisible"
      @close="addClose"
      width="590px"
      append-to-body
    >
      <el-form
        ref="addFormRef"
        :inline="true"
        :model="addForm"
        :rules="rules"
        size="small"
        label-width="66px"
      >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="addClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 修改编辑框 -->
    <el-dialog
      :title="editTitle"
      :visible.sync="editVisible"
      @close="editClose"
      width="590px"
      append-to-body
    >
      <el-form
        ref="editFormRef"
        :inline="true"
        :model="editForm"
        :rules="editRules"
        size="small"
        label-width="66px"
      >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="editClose">取消</el-button>
        <el-button type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      addForm: {},
      editForm: {},
      rules: {},
      editRules: {},
      addTitle: "添加档案",
      editTitle: "修改档案",
      editVisible: false,
      addVisible: false
    };
  },
  methods: {
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllUser();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllUser();
    },
    addClose() {
      this.addVisible = false;
      this.addForm.role = "";
      this.addForm.dep = "";
      this.addForm.sex = "";
      this.$refs.addFormRef.resetFields();
    },
    editClose() {
      this.editVisible = false;
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleDelete(record) {
      const that = this;
      deleteUser({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功");
          that.getAllUser();
        } else {
          this.$message.error("系统异常,请稍后再试");
        }
      });
    },
    handleEdit(record) {
      console.log("record", record);
      this.getUserRole({ id: record.id });
      this.getUserDept({ id: record.id });
      this.editVisible = true;
      this.editForm = record;
    },
    //提交添加表单
    handleSubmit() {},
    //提交修改表单
    editSubmit() {}
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
