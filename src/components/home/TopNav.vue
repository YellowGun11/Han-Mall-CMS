<!--  -->
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content bg-purple">采薇汉服电商后台管理系统</div>
    </el-col>
    <el-col class="amdinInfor" :span="6" :offset="10">
      <div>
        <img class="adminImg" :src="imgSrc" alt="" @click="adminInfo()">
        <el-dropdown trigger="click" @command="logout">
          <p class="el-dropdown-link">
            {{name}}
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <!-- 员工信息模块 -->
    <el-dialog title="管理员信息" :visible.sync="dialogTableVisible">
      <div class="userDetail">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="ruleForm.account" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="tel">
            <el-input type="tel" v-model.number="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input type="email" v-model.number="ruleForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pwd">
            <el-input type="password" v-model.number="ruleForm.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: "",
      name: "",
      dialogTableVisible: false,
      ruleForm: {
        account: "",
        tel: "",
        mail: "",
        pwd: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        mail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  components: {},

  computed: {
    adminImg() {
      return this.$store.getters.getAdminImg;
    },
    adminName() {
      return this.$store.getters.getAdminName;
    },
    adminTel() {
      return this.$store.getters.getAdminTel;
    },
    adminMail() {
      return this.$store.getters.getAdminMail;
    }
  },

  methods: {
    adminInfo() {
      this.dialogTableVisible = true;
      this.ruleForm.account = this.adminName;
      this.ruleForm.tel = this.adminTel;
      this.ruleForm.mail = this.adminMail;
    },
    submitForm(formName) {
      this.dialogTableVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = this.ruleForm;
          this.$post("updateAdminData", formData).then(data => {
            if (data.status == 1) {
              alert("修改成功!");
              this.$store.dispatch("logout").then(() => {
                this.$router.push("/");
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    logout() {
      console.log("注销");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },

  created() {
    this.imgSrc = this.adminImg;
    this.name = this.adminName;
  }
};
</script>

<style scoped>
.adminImg {
  margin-top: 5px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.amdinInfor {
  /* margin-top: 0;
  line-height: 0;
  padding: 0; */
}
.el-dropdown {
  margin-left: 10px;
  line-height: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-dropdown-menu {
  padding: 0;
  margin-left: 10px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>