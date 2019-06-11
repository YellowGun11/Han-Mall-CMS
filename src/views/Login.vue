<template>
  <div id="login">
    <div class="me-login-box me-login-box-radius">
      <h1>采薇后台管理 登录</h1>
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.account"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>
          忘记密码？点击
          <strong>
            <el-button @click="open3" class="me-login-design-color">找回</el-button>
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$store
            .dispatch("login", that.userForm)
            .then(() => {
              // that.$router.go(-1);
              that.$router.push("/index");
            })
            .catch(error => {
              if (error !== "error") {
                that.$message({
                  message: error,
                  type: "error",
                  showClose: true
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    open3() {
      this.$prompt("请输入账号邮箱", "找回密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          let mail = value;
          this.$post("/changPwdStatus", { mail }).then(data => {
            if (data.status == 1) {
              this.$message({
                type: "success",
                message: "验证码已发送至邮箱，请在邮箱中重置密码"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100vh;
  /*height: 1000px;*/
  background: url("../assets/images/login-bg.jpg") no-repeat;
  background-size: cover;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.me-login-box {
  position: absolute;
  width: 300px;
  height: 260px;
  background-color: rgba(255, 255, 255, 0.77);
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.4);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5fb878 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}
</style>
