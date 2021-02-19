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
              <el-breadcrumb-item>请假管理</el-breadcrumb-item>
              <el-breadcrumb-item>请假申请</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>请假申请</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 操作按钮区域 -->
          <div class="button">
            <el-button type="primary" @click="applyAdd" icon="el-icon-edit"
              >申请请假</el-button
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
                prop="id"
                label="id"
                sortable
                width="180"
                v-if="show"
              >
              </el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="请假类型"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="请假开始时间"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="请假结束时间"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="请假原因"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="联系电话"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="审核状态"
                sortable
                width="180"
              >
              </el-table-column>
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
          <!-- 新增对话框 -->
          <el-dialog
            :title="applyTitle"
            :visible.sync="applyVisible"
            @close="applyClose"
            width="590px"
            append-to-body
          >
            <div ref="step">
              <el-steps :active="active" finish-status="success">
                <el-step title="个人信息"></el-step>
                <el-step title="请假信息"></el-step>
                <el-step title="提交状态"></el-step>
              </el-steps>
              <el-form ref="applyFormRef" :model="applyForm">
                <div ref="form1" v-if="active == 0">
                  <el-form-item label="名字">
                    <el-input v-model="applyForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-input v-model="applyForm.sex"></el-input>
                  </el-form-item>
                  <el-form-item label="所属部门">
                    <el-input v-model="applyForm.dep"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input v-model="applyForm.telephone"></el-input>
                  </el-form-item>
                </div>
                <div ref="form2" v-if="active == 1">1</div>
                <div ref="form3" v-if="active == 2">2</div>
              </el-form>
              <div ref="button">
                <el-button
                  style="margin-top: 12px;"
                  @click="next"
                  v-if="active != 3"
                  >下一步</el-button
                >
                <el-button
                  style="margin-top: 12px;"
                  @click="applyClose"
                  v-if="active == 3"
                  >关闭</el-button
                >
              </div>
            </div>
          </el-dialog>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      applyForm: {
        name: "",
        sex: "",
        dep: "",
        telephone: ""
      },
      tableData: [],
      show: false,
      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      applyTitle: "请假申请",
      applyVisible: false,
      applyForm: {},
      rules: {}
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    applyClose() {
      this.applyVisible = false;
      this.active = 0;
      this.applyForm.name = "";
      this.applyForm.sex = "";
      this.applyForm.telephone = "";
      this.applyForm.dep = "";
      this.$refs.applyFormRef.resetFields();
    },
    applySubmit() {
      console.log("提交成功!");
    },
    applyAdd() {
      this.applyVisible = true;
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
    console.log(this.active);
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
