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
                label-width="80px"
              >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄" prop="age">
                  <el-input v-model="form.age" />
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="身高体重" prop="height">
                  <el-input v-model="form.height" placeholder="CM/KG" />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号" prop="telephone">
                  <el-input v-model="form.telephone" />
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="所在院校" prop="university">
                  <el-input v-model="form.university" placeholder="所在院校" />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所学专业" prop="major">
                  <el-input v-model="form.major" />
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="请输入邮箱"/>
                </el-form-item>
                  </el-col>
              </el-row>
               <el-row>
                <el-col :span="16">
                  <el-form-item label="居住地址" prop="address">
                  <el-input v-model="form.address" />
                </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="籍贯" prop="nativePlace">
                  <el-input v-model="form.nativePlace" placeholder="请输入籍贯所在"/>
                </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="身份证号" prop="identityCard">
                  <el-input v-model="form.identityCard" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="家庭成员" prop="family">
                  <el-input type="textarea" v-model="form.family" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="所获荣誉" prop="honor">
                  <el-input type="textarea" v-model="form.honor" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="工作经历" prop="workExperience">
                  <el-input type="textarea" v-model="form.workExperience" />
                  </el-form-item>
                </el-col>
              </el-row>
                <el-col :span="16">
                  <el-form-item label="个人介绍" prop="selfIntroduce">
                  <el-input type="textarea" v-model="form.selfIntroduce" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                  <el-col :span="5">
                     <el-form-item label="民族" prop="nation" >
                  <el-select
                    v-model="form.nation"
                    placeholder="请选择民族"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in nations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="最高学历" prop="education">
                  <el-select
                    v-model="form.education"
                    placeholder="请选择学历"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in educations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="6">
                <el-form-item label="政治面貌" prop="political">
                  <el-select
                    v-model="form.political"
                    placeholder="请选择学历"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in politicals"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item label="性别">
                  <el-radio-group v-model="form.sex" size="small">
                    <el-radio-button label="1">男</el-radio-button>
                    <el-radio-button label="0">女</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                   <el-form-item label="婚姻状况">
                  <el-radio-group v-model="form.marriage">
                   <el-radio-button label="已婚">已婚</el-radio-button>
                    <el-radio-button label="未婚">未婚</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                   <el-form-item label="健康状况">
                  <el-radio-group v-model="form.health">
                   <el-radio-button label="健康">健康</el-radio-button>
                    <el-radio-button label="不健康">不健康</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                </el-col>
              </el-row>
                
               
                
                <el-form-item label="操作">
                  <el-button
                    :loading="saveLoading"
                    size="mini"
                    type="primary"
                    @click="doSubmit"
                    >保存配置</el-button
                  >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="outWord"
                    >导出Word</el-button
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
            <el-tab-pane label="近五次登录记录" name="third">
                <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in tableData"
      :key="index"
      placement="top"
      >
      <el-card>
        <h4>{{activity.address}}</h4>
        <p>登陆与于 {{formatTime(activity.time)}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
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
import { isvalidPhone,isCardNo,validEmail } from "@/utils/validate";
import Avatar from "@/assets/avatar.png";
import store from "@/store";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

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

    const validCard = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入身份证号码"));
      } else if (!isCardNo(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };

    const validIsEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };




    return {
      reverse: true,
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
      nations: [
         {
      "id": "01",
      "name": "汉族"
    },
    {
      "id": "02",
      "name": "蒙古族"
    },
    {
      "id": "03",
      "name": "回族"
    },
    {
      "id": "04",
      "name": "藏族"
    },
    {
      "id": "05",
      "name": "维吾尔族"
    },
    {
      "id": "06",
      "name": "苗族"
    },
    {
      "id": "07",
      "name": "彝族"
    },
    {
      "id": "08",
      "name": "壮族"
    },
    {
      "id": "09",
      "name": "布依族"
    },
    {
      "id": "10",
      "name": "朝鲜族"
    },
    {
      "id": "11",
      "name": "满族"
    },
    {
      "id": "12",
      "name": "侗族"
    },
    {
      "id": "13",
      "name": "瑶族"
    },
    {
      "id": "14",
      "name": "白族"
    },
    {
      "id": "15",
      "name": "土家族"
    },
    {
      "id": "16",
      "name": "哈尼族"
    },
    {
      "id": "17",
      "name": "哈萨克族"
    },
    {
      "id": "18",
      "name": "傣族"
    },
    {
      "id": "19",
      "name": "黎族"
    },
    {
      "id": "20",
      "name": "傈僳族"
    },
    {
      "id": "21",
      "name": "佤族"
    },
    {
      "id": "22",
      "name": "畲族"
    },
    {
      "id": "23",
      "name": "高山族"
    },
    {
      "id": "24",
      "name": "拉祜族"
    },
    {
      "id": "25",
      "name": "水族"
    },
    {
      "id": "26",
      "name": "东乡族"
    },
    {
      "id": "27",
      "name": "纳西族"
    },
    {
      "id": "28",
      "name": "景颇族"
    },
    {
      "id": "29",
      "name": "柯尔克孜族"
    },
    {
      "id": "30",
      "name": "土族"
    },
    {
      "id": "31",
      "name": "达斡尔族"
    },
    {
      "id": "32",
      "name": "仫佬族"
    },
    {
      "id": "33",
      "name": "羌族"
    },
    {
      "id": "34",
      "name": "布朗族"
    },
    {
      "id": "35",
      "name": "撒拉族"
    },
    {
      "id": "36",
      "name": "毛难族"
    },
    {
      "id": "37",
      "name": "仡佬族"
    },
    {
      "id": "38",
      "name": "锡伯族"
    },
    {
      "id": "39",
      "name": "阿昌族"
    },
    {
      "id": "40",
      "name": "普米族"
    },
    {
      "id": "41",
      "name": "塔吉克族"
    },
    {
      "id": "42",
      "name": "怒族"
    },
    {
      "id": "43",
      "name": "乌孜别克族"
    },
    {
      "id": "44",
      "name": "俄罗斯族"
    },
    {
      "id": "45",
      "name": "鄂温克族"
    },
    {
      "id": "46",
      "name": "崩龙族"
    },
    {
      "id": "47",
      "name": "保安族"
    },
    {
      "id": "48",
      "name": "裕固族"
    },
    {
      "id": "49",
      "name": "京族"
    },
    {
      "id": "50",
      "name": "塔塔尔族"
    },
    {
      "id": "51",
      "name": "独龙族"
    },
    {
      "id": "52",
      "name": "鄂伦春族"
    },
    {
      "id": "53",
      "name": "赫哲族"
    },
    {
      "id": "54",
      "name": "门巴族"
    },
    {
      "id": "55",
      "name": "珞巴族"
    },
    {
      "id": "56",
      "name": "基诺族"
    }
      ],
      educations:[
        {
      "id": "01",
      "name": "小学"
    },
    {
      "id": "02",
      "name": "初中"
    },
    {
      "id": "03",
      "name": "普高"
    },
    {
      "id": "04",
      "name": "中专"
    },
    {
      "id": "05",
      "name": "职高"
    },
    {
      "id": "06",
      "name": "技工"
    },
    {
      "id": "07",
      "name": "大专"
    },
    {
      "id": "08",
      "name": "本科"
    },
    {
      "id": "09",
      "name": "硕士研究生"
    },
    {
      "id": "10",
      "name": "博士研究生"
    },
    {
      "id": "11",
      "name": "其他"
    }
      ],
      politicals:[
           {
      "id": "01",
      "name": "中共党员"
    },
    {
      "id": "02",
      "name": "中共预备党员"
    },
    {
      "id": "03",
      "name": "共青团员"
    },
    {
      "id": "04",
      "name": "民革党员"
    },
    {
      "id": "05",
      "name": "民盟盟员"
    },
    {
      "id": "06",
      "name": "民建会员"
    },
    {
      "id": "07",
      "name": "民进会员"
    },
    {
      "id": "08",
      "name": "农工党党员"
    },
    {
      "id": "09",
      "name": "致公党党员"
    },
    {
      "id": "10",
      "name": "九三学社社员"
    },
    {
      "id": "11",
      "name": "台盟盟员"
    },
    {
      "id": "12",
      "name": "无党派人士"
    },
    {
      "id": "13",
      "name": "群众"
    }
      ],
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
        telephone: [{ required: true, trigger: "blur", validator: validPhone }],
        address: [{ required: true, trigger: "blur",message:"请输入居住地址" }],
        age: [{required: true, trigger: "blur",message:"年龄"}],
        height: [{required: true, trigger: "blur",message:"请输入身高体重"}],
        university: [{ required: true, trigger: "blur",message:"请输入院校" }],
        major: [{required: true, trigger: "blur",message:"请输入所学专业"}],
        identityCard: [{required: true, trigger: "blur",validator: validCard}],
        email: [{required: true, trigger: "blur",validator: validIsEmail}],
        nativePlace: [{required: true, trigger: "blur",message:"请输入籍贯所在"}],
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
    formatTime(value){
 var moment = require("moment");
 if (value == undefined) {
        return "";
      }
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
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
    },
    outWord() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        window.location.origin + "/static/mod.docx",
        (error, content) => {
          if (error) {
            throw error;
          }
          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          let docxData = {
            name: that.form.name,
            sex: that.form.sex == "1" ? "男" : "女",
            age: that.form.age,
            deptName: that.deptName,
            nameZh: that.roleName,
            telephone: that.form.telephone,
            address: that.form.address,
            id: that.form.id,
            email: that.form.email,
            marriage: that.form.marriage,
            height: that.form.height,
            identityCard: that.form.identityCard,
            nation: that.form.nation,
            education: that.form.education,
            political: that.form.political,
            health: that.form.health,
            major: that.form.major,
            nativePlace: that.form.nativePlace,
            university: that.form.university,
            family: that.form.family,
            honor: that.form.honor,
            workExperience: that.form.workExperience,
            selfIntroduce: that.form.selfIntroduce
          };
          doc.setData({
            ...docxData
          });
          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, that.form.name + "信息档案.docx");
          console.log(that.form)
        }
      );
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
