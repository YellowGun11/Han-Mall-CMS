<!--  -->
<template>
  <el-row :gutter="10">
    <el-col :xs="4" :sm="4" :md="4" :lg="4">
      <el-button type="primary" @click="addAdmin()">添加员工</el-button>
    </el-col>
    <!-- 添加员工模块 -->
      <el-dialog
        title="添加员工"
        :visible.sync="dialogTableVisible"
      >
        <div class="userDetail">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="tel">
              <el-input type="tel" v-model.number="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
              <el-input type="email" v-model.number="ruleForm.mail"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="dialogTableVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
        </div>
      </el-dialog>
  </el-row>
</template>

<script>
import { all } from 'q';
export default {
  name: "AdminAdd",
  data() {
    return {
      dialogTableVisible:false,
      ruleForm: {
          account: '',
          tel: '',
          mail:''
        },
        rules: {
          account: [
           { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          mail:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }  
          ]
        }
    };
  },

  components: {},

  methods: {
    addAdmin(){
      this.dialogTableVisible = true;
    },
    submitForm(formName) {
      this.dialogTableVisible = false
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData=this.ruleForm
            this.$post("addAdminData",formData).then(data=>{
              if (data.status == 1) {
                alert("添加成功!")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
     
  }
};
</script>

<style scoped>

</style>