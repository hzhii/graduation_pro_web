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
          <!-- 查询区域 -->
          <div class="search">
            <el-form
              :inline="true"
              :model="queryInfo"
              class="demo-form-inline"
              v-has="'query'"
            >
              <el-form-item label="姓名">
                <el-input
                  placeholder="输入姓名"
                  v-model="queryInfo.name"
                ></el-input>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-select
                  placeholder="请选择审核状态"
                  v-model="queryInfo.status"
                >
                  <el-option
                    v-for="item in statusType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" icon="el-icon-search" @click="search"
                  >查询</el-button
                >
                <el-button
                  type="warning"
                  icon="el-icon-refresh-right"
                  @click="clear"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
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
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <el-form-item label="请假原因">
                      <span v-has="'query'">{{ props.row.reason }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="id" width="180" v-if="show">
              </el-table-column>
              <el-table-column prop="userName" label="姓名" width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="请假类型"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="请假开始时间"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="endTime" label="请假结束时间" width="180">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="审核状态"
                sortable
                width="180"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.status == ''
                        ? ' '
                        : scope.row.status == '通过'
                        ? 'primary'
                        : scope.row.auditStatus == '不通过'
                        ? 'warning'
                        : 'danger'
                    "
                    :disable-transitions="false"
                    >{{ scope.row.status }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column prop="leader" label="审核人" width="180">
              </el-table-column>
              <el-table-column
                label="操作"
                width="180"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="8">
                      <el-popconfirm
                        title="确定给予通过吗？"
                        @onConfirm="handlePass(scope.row.id)"
                      >
                        <el-button
                          type="success"
                          icon="el-icon-check"
                          size="mini"
                          v-has="'edit'"
                          slot="reference"
                          circle
                        ></el-button>
                      </el-popconfirm>
                    </el-col>
                    <el-col :span="8">
                      <el-popconfirm
                        title="确定不予通过吗？"
                        @onConfirm="handleNoPass(scope.row.id)"
                      >
                        <el-button
                          type="warning"
                          icon="el-icon-close"
                          size="mini"
                          slot="reference"
                          v-has="'edit'"
                          circle
                        ></el-button>
                      </el-popconfirm>
                    </el-col>
                    <el-col :span="8">
                      <el-popconfirm
                        title="确定删除吗？"
                        @onConfirm="handleDelete(scope.row.id)"
                      >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          slot="reference"
                          v-has="'deleted'"
                          circle
                        ></el-button>
                      </el-popconfirm>
                    </el-col>
                  </el-row>
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
            <div>
              <el-form
                :model="applyForm"
                :rules="rules"
                ref="applyForm"
                label-width="100px"
                class="demo-border"
              >
                <el-form-item label="用户id" prop="userId" v-show="hide">
                  <el-input v-model="applyForm.id"></el-input>
                </el-form-item>
                <el-form-item label="申请类型" prop="type">
                  <el-select
                    v-model="applyForm.type"
                    placeholder="请选择申请类型"
                  >
                    <el-option
                      v-for="item in types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                  <el-date-picker
                    v-model="applyForm.startTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                  <el-date-picker
                    v-model="applyForm.endTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="请假原因" prop="reason">
                  <el-input
                    type="textarea"
                    v-model="applyForm.reason"
                  ></el-input>
                </el-form-item>
                <el-button @click="" size="small">取消</el-button>
                <el-button type="primary" @click="handleSubmit" size="small"
                  >提交申请</el-button
                >
              </el-form>
            </div>
          </el-dialog>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  leaveApply,
  getLeaveRecord,
  getMyRecord,
  getDeptRecord,
  handlePass,
  handleNoPass,
  handleDeleteLeave
} from "@/api/manage";
import store from "@/store";
export default {
  data() {
    return {
      statusType: [
        {
          value: "审核中",
          label: "审核中"
        },
        {
          value: "通过",
          label: "通过"
        },
        {
          value: "不通过",
          label: "不通过"
        }
      ],
      applyForm: {
        type: "",
        startTime: "",
        endTime: "",
        reason: "",
        id: this.$store.state.id
      },
      types: [
        {
          value: "事假",
          label: "事假"
        },
        {
          value: "年假",
          label: "年假"
        },
        {
          value: "病假",
          label: "病假"
        },
        {
          value: "产假",
          label: "产假"
        }
      ],
      hide: false,
      value1: "",
      tableData: [],
      show: false,
      queryInfo: {
        status: "",
        name: "",
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      applyTitle: "请假申请",
      applyVisible: false,
      rules: {
        type: [
          { required: true, trigger: "change", message: "请选择请假类型" }
        ],
        reason: [
          { required: true, trigger: "blur", message: "请输入请假理由" }
        ],
        startTime: [
          {
            required: true,
            trigger: "blur",
            message: "请输入开始时间"
          }
        ],
        endTime: [
          { required: true, trigger: "blur", message: "请输入结束时间" }
        ]
      }
    };
  },
  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    applyClose() {
      this.applyVisible = false;
      this.applyForm.type = "";
      this.applyForm.startTime = "";
      this.applyForm.endTime = "";
      this.applyForm.reason = "";
      this.$refs.applyForm.resetFields();
    },
    applyAdd() {
      this.applyVisible = true;
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getRecord();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getRecord();
    },
    //提交添加表单
    handleSubmit() {
      const that = this;
      this.$refs.applyForm.validate(async valid => {
        if (!valid) return;
        //发起添加的网络请求
        await leaveApply(this.applyForm)
          .then(response => {
            if (response.code == 200) {
              this.$message.success("提交成功!");
              that.getRecord();
            } else {
              this.$message.error("提交失败,请稍后再试!");
            }
          })
          .catch(error => {
            this.$message.warning("系统异常，请稍后重试");
            console.log(error);
          });
        that.applyClose();
      });
    },
    search() {
      const that = this;
      this.getRecord();
    },
    clear() {
      this.queryInfo.name = "";
      this.queryInfo.status = "";
      this.getRecord();
    },
    getRecord() {
      const that = this;
      const role = this.$store.state.user.sysrole.nameZh;
      if (role == "系统管理员") {
        getLeaveRecord(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
          } else {
            that.tableData = [];
            that.total = 0;
            that.$message.warning(resp.message);
          }
        });
      } else if (role == "普通员工") {
        getMyRecord(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
          } else {
            that.tableData = [];
            that.total = 0;
            that.$message.warning(resp.message);
          }
        });
      } else {
        getDeptRecord(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
          } else {
            that.tableData = [];
            that.total = 0;
            that.$message.warning(resp.message);
          }
        });
      }
    },
    handleDelete(record) {
      handleDeleteLeave({ id: record }).then(resp => {
        if (resp.code == 200) {
          let totalPage = Math.ceil((this.total - 1) / this.queryInfo.pageSize); // 总页数
          let currentPage =
            this.queryInfo.pageNum > totalPage
              ? totalPage
              : this.queryInfo.pageNum;
          this.queryInfo.pageNum = currentPage < 1 ? 1 : currentPage;
          this.$message.success("删除成功");
          this.getRecord();
        }
      });
    },
    handlePass(record) {
      handlePass({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("通过成功");
          this.getRecord();
        }
      });
    },
    handleNoPass(record) {
      handleNoPass({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("不通过成功");
          this.getRecord();
        }
      });
    }
  },
  created() {
    this.getRecord();
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
