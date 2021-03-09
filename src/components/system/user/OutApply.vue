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
              <el-breadcrumb-item>出差管理</el-breadcrumb-item>
              <el-breadcrumb-item>出差申请</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>出差申请</span>
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
              <el-form-item label="出行方式">
                <el-select
                  v-model="queryInfo.transportation"
                  placeholder="请选出行方式"
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
            <el-button type="primary" @click="handleAdd" icon="el-icon-edit"
              >申请出差</el-button
            >
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="userId" label="用户编号" width="180">
              </el-table-column>
              <el-table-column prop="userName" label="用户姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="出差地址" width="180">
              </el-table-column>
              <el-table-column prop="reason" label="出差任务" width="180">
              </el-table-column>
              <el-table-column
                prop="transportation"
                label="出行方式"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="startTime" label="开始时间" width="180">
              </el-table-column>
              <el-table-column prop="endTime" label="结束时间" width="180">
              </el-table-column>
              <el-table-column prop="status" label="审核状态" width="180">
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.status == '审核中'
                        ? 'success'
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
              <el-table-column prop="leaderName" label="审核人" width="180">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                align="center"
                width="180"
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
                          slot="reference"
                          v-has="'edit'"
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
                          v-has="'edit'"
                          slot="reference"
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
                          v-has="'deleted'"
                          slot="reference"
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
        ref="addForm"
        :inline="true"
        :model="addForm"
        :rules="rules"
        size="small"
        label-width="66px"
        :label-position="labelPosition"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.userName" :readonly="hide"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号" prop="userId">
              <el-input v-model="addForm.userId" :readonly="hide"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="addForm.startTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出差结束时间" prop="endTime">
              <el-date-picker
                v-model="addForm.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width: 100%">
            <el-form-item
              label="预估出行方式"
              prop="transportation"
              style="width:100%"
            >
              <el-select
                v-model="addForm.transportation"
                placeholder="请选择出差方式"
                style="width: 100%"
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
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width: 100%">
            <el-form-item label="出差地址" prop="address" style="width: 100%">
              <el-cascader
                placeholder="请点击选择地址"
                :options="options"
                v-model="addForm.addressArray"
                @change="handleChange"
                clearable
                style="width: 100%"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width: 100%">
            <el-form-item
              label="出差任务说明"
              prop="reason"
              style="width: 100%"
            >
              <el-input
                type="textarea"
                v-model="addForm.reason"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="addClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAddressJson,
  getAllOutRecord,
  getMyOutRecord,
  getDeptOutRecord,
  addOutRecord,
  deleteOutRecord,
  failOutRecord,
  passOutRecord,
  outSearch
} from "@/api/manage";
import store from "@/store";
export default {
  data() {
    return {
      labelPosition: "top",
      hide: true,
      options: [],
      selectedOptions: [],
      cityArr: [], //城市列表
      areaArr: [], //区县列表
      province: "", //省
      city: "", //市
      area: "", // 区县,
      provinceCityArea: "", //选择器选择的省市区
      noEdit: true,
      queryInfo: {
        name: "",
        transportation: "",
        status: "",
        pageNum: 1,
        pageSize: 5
      },
      types: [
        {
          value: "高铁动车/火车",
          label: "高铁动车/火车"
        },
        {
          value: "长途巴士",
          label: "长途巴士"
        },
        {
          value: "飞机",
          label: "飞机"
        },
        {
          value: "地铁",
          label: "地铁"
        },
        {
          value: "未知",
          label: "未知"
        }
      ],
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
      rules: {
        transportation: [
          { required: true, trigger: "change", message: "请选择出行方式" }
        ],
        reason: [
          { required: true, trigger: "blur", message: "请描述出差任务" }
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
        ],
        address: [
          { required: true, trigger: "change", message: "请选择出差地址" }
        ]
      },
      tableData: [],
      total: 0,
      addForm: {
        userName: this.$store.state.user.name,
        userId: this.$store.state.id,
        startTime: "",
        endTime: "",
        addressArray: "",
        transportation: "",
        reason: "",
        address: ""
      },
      editForm: {},
      editRules: {},
      addTitle: "申请出差",
      editTitle: "修改档案",
      editVisible: false,
      addVisible: false
    };
  },
  methods: {
    //初始化json数据
    initDistPicker() {
      console.log("initDistrictsPicker");
      let self = this;
      getAddressJson().then(function(respones) {
        let distData = respones;
        let options = [];
        // 省
        for (var provinceKy in distData["100000"]) {
          let optProvinceItem = {
            value: provinceKy,
            label: distData["100000"][provinceKy]
          };
          if (distData[provinceKy]) {
            // 市
            for (var cityKy in distData[provinceKy]) {
              optProvinceItem.children = optProvinceItem.children
                ? optProvinceItem.children
                : [];
              let optCityItem = {
                value: cityKy,
                label: distData[provinceKy][cityKy]
              };
              if (distData[cityKy]) {
                // 区
                for (var areaKy in distData[cityKy]) {
                  optCityItem.children = optCityItem.children
                    ? optCityItem.children
                    : [];
                  let optAreaItem = {
                    value: areaKy,
                    label: distData[cityKy][areaKy]
                  };
                  optCityItem.children.push(optAreaItem);
                }
              }
              optProvinceItem.children.push(optCityItem);
            }
          }
          options.push(optProvinceItem);
        }
        self.distData = distData;
        self.options = options;
      });
    },
    //选择地区
    handleChange(value) {
      let self = this;
      console.log("value=>", value);
      //获取省名
      self.options.map((item, index) => {
        if (item.value == value[0]) {
          self.cityArr = item.children; //存储城市列表
          self.province = item.label;
        }
      });
      //获取市名
      self.cityArr.map((item, index) => {
        if (item.value == value[1]) {
          self.areaArr = item.children; //存储区县列表
          self.city = item.label;
        }
      });
      //获取区县名
      self.areaArr.map((item, index) => {
        if (item.value == value[2]) {
          self.area = item.label;
        }
      });
      self.provinceCityArea = self.province + self.city + self.area;
      self.addForm.address = self.province + self.city + self.area;
      console.log("self.provinceCityArea", self.provinceCityArea);
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
    addClose() {
      this.addVisible = false;
      this.$refs.addForm.resetFields();
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleDelete(record) {
      const that = this;
      deleteOutRecord({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功");
          that.getRecord();
        } else {
          this.$message.error("系统异常,请稍后再试");
        }
      });
    },
    //提交添加表单
    handleSubmit() {
      const that = this;
      this.$refs.addForm.validate(async valid => {
        if (!valid) return;
        addOutRecord(that.addForm).then(resp => {
          if (resp.code == 200) {
            this.$message.success("添加成功!");
            that.getRecord();
            that.addClose();
          }
        });
      });
      console.log(this.addForm);
    },
    //批准
    handlePass(record) {
      const that = this;
      passOutRecord({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("审核成功!");
          that.getRecord();
        }
      });
    },
    handleNoPass(record) {
      const that = this;
      failOutRecord({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("审核成功!");
          that.getRecord();
        }
      });
    },
    search() {
      const that = this;
      this.getRecord();
    },
    clear() {
      this.queryInfo.name = "";
      this.queryInfo.status = "";
      this.queryInfo.transportation = "";
      this.getRecord();
    },
    getRecord() {
      const that = this;
      const role = this.$store.state.user.sysrole.nameZh;
      if (role == "系统管理员") {
        getAllOutRecord(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
            this.$message.success(resp.message);
          } else {
            that.tableData = [];
            that.total = 0;
            that.$message.warning(resp.message);
          }
        });
      } else if (role == "普通员工") {
        getMyOutRecord(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
            this.$message.success(resp.message);
          } else {
            that.tableData = [];
            that.total = 0;
            that.$message.warning(resp.message);
          }
        });
      } else {
        getDeptOutRecord(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
            this.$message.success(resp.message);
          } else {
            that.tableData = [];
            that.total = 0;
            that.$message.warning(resp.message);
          }
        });
      }
    }
  },
  created() {
    this.initDistPicker();
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
