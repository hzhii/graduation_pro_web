<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>病案管理</el-breadcrumb-item>
      <el-breadcrumb-item>病历管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getRecordListByName"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加病历</el-button>
        </el-col>
      </el-row>
      <!-- 病历列表区域 -->
      <el-table :data="recordlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="病人姓名" prop="patientName"></el-table-column>
        <el-table-column label="年龄" prop="patientAge"></el-table-column>
        <el-table-column label="性别" prop="patientGender"></el-table-column>
        <el-table-column label="病人描述" prop="patientSymptom"></el-table-column>
        <el-table-column label="诊断结果" prop="diagnosisResult"></el-table-column>
        <el-table-column label="医生建议" prop="doctorAdvice"></el-table-column>
        <el-table-column label="药方" prop="medical"></el-table-column>
        <el-table-column label="主治医生" prop="doctorName"></el-table-column>
        <el-table-column label="所属科室" prop="departmentName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.mrecordID,
            scope.row.patientName,
            scope.row.patientSymptom,
            scope.row.diagnosisResult,
            scope.row.doctorAdvice,
            scope.row.medical)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle
                       @click="removeRecordById(scope.row.mrecordID)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[2,5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加病历的对话框 -->
    <el-dialog title="添加病历" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="选择病人" prop="patientId">
          <el-select v-model="addForm.patientId" placeholder="请选择病人">
            <el-option v-for="item in patientlist" :key="item.patientId" :label="item.patientName"
                       :value="item.patientId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病人描述" prop="patientSymptom">
          <el-input v-model="addForm.patientSymptom"></el-input>
        </el-form-item>
        <el-form-item label="诊断结果" prop="diagnosisResult">
          <el-input v-model="addForm.diagnosisResult"></el-input>
        </el-form-item>
        <el-form-item label="医生建议" prop="doctorAdvice">
          <el-input v-model="addForm.doctorAdvice"></el-input>
        </el-form-item>
        <el-form-item label="药方" prop="medical">
          <el-input v-model="addForm.medical"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRecord">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 修改病历的对话框 -->
    <el-dialog title="修改病历信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="病人姓名" prop="patientName">
          <el-input v-model="editForm.patientName" disabled></el-input>
        </el-form-item>
        <el-form-item label="病人描述" prop="patientSymptom">
          <el-input v-model="editForm.patientSymptom"></el-input>
        </el-form-item>
        <el-form-item label="诊断结果" prop="diagnosisResult">
          <el-input v-model="editForm.diagnosisResult"></el-input>
        </el-form-item>
        <el-form-item label="医生建议" prop="doctorAdvice">
          <el-input v-model="editForm.doctorAdvice"></el-input>
        </el-form-item>
        <el-form-item label="药方" prop="medical">
          <el-input v-model="editForm.medical"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRecordInfo">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5
      },
      recordlist: [],
      patientlist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      //添加病历的表单数据
      addForm: {
        patientId: '',
        patientSymptom: '',
        diagnosisResult: '',
        doctorAdvice: '',
        medical: ''
      },
      editForm: {
        mrecordID: '',
        patientName: '',
        patientSymptom: '',
        diagnosisResult: '',
        doctorAdvice: '',
        medical: ''
      },
      addFormRules: {
        patientSymptom: [
          {required: true, message: '请输入病人描述', trigger: 'blur'}
        ],
        diagnosisResult: [
          {required: true, message: '请输入诊断结果', trigger: 'blur'}
        ],
        doctorAdvice: [
          {required: true, message: '请输入医生建议', trigger: 'blur'}
        ],
        medical: [
          {required: true, message: '请输入药方', trigger: 'blur'}
        ]
      },
      editFormRules: {
        patientSymptom: [
          {required: true, message: '请输入病人描述', trigger: 'blur'}
        ],
        diagnosisResult: [
          {required: true, message: '请输入诊断结果', trigger: 'blur'}
        ],
        doctorAdvice: [
          {required: true, message: '请输入医生建议', trigger: 'blur'}
        ],
        medical: [
          {required: true, message: '请输入药方', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //获取病历列表
    async getRecordList() {
      await this.$http.post('/studentSystem/getRecord', {
        "pagenum": this.queryInfo.pagenum,
        "pagesize": this.queryInfo.pagesize
      }).then((response) => {
        this.recordlist = response.data.list
        this.total = response.data.total
        console.log(response)
      }).catch((error) => {
        this.$message.warning("获取病历列表失败！")
        console.log(error)
      })
    },
    async getRecordListByName() {
      await this.$http.post('studentSystem/getRecordByName', {
        "queryInfo": this.queryInfo.query,
        "pagenum": this.queryInfo.pagenum,
        "pagesize": this.queryInfo.pagesize
      }).then((response) => {
        if (response.data.list != null) {
          this.recordlist = response.data.list
          this.total = response.data.total
          this.queryInfo.query = ''
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    async getPatientList() {
      await this.$http.post('/studentSystem/getAllPatient').then((response) => {
        this.patientlist = response.data
        console.log(this.patientlist)
        console.log(this.recordlist)
      }).catch((error) => {
        console.log(error)
      })
    },

    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getRecordList()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getRecordList()
    },
    //监听添加病历对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //监听修改病历对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //展示编辑遍历的对话框
    showEditDialog(mrecordID, patientName, patientSymptom, diagnosisResult, doctorAdvice, medical) {
      this.editForm.mrecordID = mrecordID
      this.editForm.patientName = patientName
      this.editForm.patientSymptom = patientSymptom
      this.editForm.diagnosisResult = diagnosisResult
      this.editForm.doctorAdvice = doctorAdvice
      this.editForm.medical = medical
      this.editDialogVisible = true
    },
    addRecord() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        //发起添加病历的网络请求
        await this.$http.post('studentSystem/addRecord', this.addForm).then((response) => {
          this.$message.success("添加病历成功！")
          this.getRecordList()
        }).catch((error) => {
          this.$message.warning("添加病历失败！")
          console.log(error)
        })
        this.addDialogVisible = false
      })
    },
    editRecordInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        //发起修改用户信息的数据请求
        await this.$http.post('studentSystem/updateRecord', this.editForm).then((response) => {
          this.$message.success("修改病历信息成功!")
          //刷新病历列表数据
          this.getRecordList();

        }).catch((error) => {
          this.$message.warning("修改病历信息失败！")
          console.log(error)
        })
        this.editDialogVisible = false
      })
    },
    //根据Id删除对应的病历信息
    async removeRecordById(mrecordID) {
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该病历数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //如果用户确认删除则返回值为字符串confirm
      //如果用户取消了删除则返回值为字符串cancel
      if (confirmResult != 'confirm') {
        return this.$message.info('已取消删除')
      }
      await this.$http.post('studentSystem/deleteRecord', {"recordID": mrecordID}).then((response) => {
        this.$message.success('删除病历成功！')
        this.queryInfo.pagenum = 1
        this.getRecordList()
      }).catch((error) => {
        this.$message.warning("删除病历失败！")
        console.log(error)
      })
    }
  },
  created() {
    this.getRecordList()
    this.getPatientList()
  }

}
</script>

<style lang="less" scoped>

</style>
