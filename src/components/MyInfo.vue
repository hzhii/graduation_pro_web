<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="24"
        :md="8"
        :lg="6"
        :xl="5"
        style="margin-bottom: 10px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img
                  :src="
                    userInfo.avaterName
                      ? 'http://localhost:8080' +
                        '/avatar/' +
                        userInfo.avaterName
                      : Avatar
                  "
                  title="点击上传头像"
                  class="avatar"
                  @click="toggleShow"
                />
                <myUpload
                  v-model="show"
                  :headers="headers"
                  :url="updateAvatarApi"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                />
              </div>
            </div>
            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <i class="el-icon-edit"></i> 登录账号
                  <div class="user-right">{{ userInfo.username }}</div>
                </div>
              </li>
              <li>
                <i class="el-icon-bank-card"></i> 用户姓名
                <div class="user-right">{{ userInfo.name }}</div>
              </li>
              <li>
                <i class="el-icon-sunny"></i> 用户角色
                <div class="user-right">{{ roleName }}</div>
              </li>
              <li>
                <i class="el-icon-water-cup"></i> 所属部门
                <div class="user-right">{{ deptName }}</div>
              </li>
              <li>
                <i class="el-icon-mobile-phone"></i> 手机号码
                <div class="user-right">{{ userInfo.telephone }}</div>
              </li>
              <li>
                <i class="el-icon-unlock"></i> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true" style="cursor:pointer"
                    >修改密码</a
                  >
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <!--    用户资料    -->
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户资料" name="first">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                style="margin-top: 10px;"
                size="small"
                label-width="65px"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" style="width: 35%" />
                </el-form-item>
                <el-form-item label="手机号" prop="telephone">
                  <el-input v-model="form.telephone" style="width: 35%;" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex" style="width: 178px">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                  <el-button
                    :loading="saveLoading"
                    size="mini"
                    type="primary"
                    @click="doSubmit"
                    >保存配置</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="登录日志" name="second">
              <el-table :data="tableData" style="width: 100%" height="300">
                </el-table-column>
                <el-table-column prop="requestIp" label="请求IP" width="180">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="登陆时间"
                  sortable
                  width="180"
                  :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column prop="address" label="登录地址" width="180">
                </el-table-column>
                <el-table-column prop="browser" label="浏览器" width="180">
                </el-table-column>
              </el-table>
              <!-- 分页 -->
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
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <updatePass ref="pass" />
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import updatePass from "./modal/updatePass";
import { updateUser, getInfo, getLog } from "@/api/manage";
import { isvalidPhone } from "@/utils/validate";
import Avatar from "@/assets/avatar.png";
import store from "@/store";

export default {
  name: "myInfo",
  components: { updatePass, myUpload },
  data() {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    return {
      updateAvatarApi: "http://localhost:8080/upload/avatar",
      show: false,
      activeName: "first",
      Avatar: Avatar,
      form: {},
      total: 0,
      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      deptName: "",
      roleName: "",
      saveLoading: false,
      userInfo: {},
      rules: {
        name: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        telephone: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      headers: {
        "Access-Token": this.$store.state.token
      }
    };
  },
  methods: {
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      var moment = require("moment");
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //获取用户相关信息
    GetInfo() {
      const that = this;
      getInfo().then(res => {
        that.userInfo = res.result;
        that.form = res.result;
        that.deptName = res.result.dept.deptName;
        that.roleName = res.result.sysrole.nameZh;
      });
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
      this.GetInfo();
      store.dispatch("GetInfo").then(() => {});
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    },
    toggleShow() {
      this.show = !this.show;
    },
    // 截图成功回调函数
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
    },
    doSubmit() {
      const that = this;
      if (this.$refs["form"]) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.saveLoading = true;
            updateUser(this.form)
              .then(response => {
                if (response.code == 200) {
                  that.$notify({
                    title: response.message,
                    type: "success",
                    duration: 1500
                  });
                  this.saveLoading = false;
                  that.GetInfo();
                }
              })
              .catch(() => {
                this.saveLoading = false;
              });
          }
        });
      }
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getLog();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getLog();
    },
    async getLog() {
      const that = this;
      await getLog(this.queryInfo).then(resp => {
        if (resp.code == 200) {
          that.tableData = resp.result.list;
          that.total = resp.result.total;
        } else {
          that.$message.warning(resp.message);
        }
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.GetInfo();
    this.getLog();
    console.log(this.userInfo);
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;
    a {
      color: #317ef3;
    }
  }
}

.page {
  display: flex;
  justify-content: flex-end;
}
</style>
