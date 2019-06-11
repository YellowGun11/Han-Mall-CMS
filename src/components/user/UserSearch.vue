<!--  -->
<template>
  <el-row :gutter="10">
    <el-col
      :xs="12"
      :sm="6"
      :md="6"
      :lg="6"
      :xl="3"
    >
      <el-col
        ref="element"
        :xs="12"
        :sm="8"
        :md="7"
        :lg="6"
      >
        <p class="order-id">用户ID:</p>
      </el-col>
      <el-col
        :xs="8"
        :sm="16"
        :md="17"
        :lg="18"
      >
        <el-input
          placeholder="请输入ID"
          v-model="userID"
          clearable
        ></el-input>
      </el-col>
    </el-col>
    <el-col
      :xs="12"
      :sm="6"
      :md="6"
      :lg="6"
      :xl="3"
    >
      <el-col
        ref="element"
        :xs="12"
        :sm="8"
        :md="7"
        :lg="6"
      >
        <p class="order-name">用户手机:</p>
      </el-col>
      <el-col
        :xs="8"
        :sm="16"
        :md="17"
        :lg="18"
      >
        <el-input
          placeholder="请输入手机号"
          v-model="userTel"
          clearable
        ></el-input>
      </el-col>
    </el-col>
    <el-col
      :xs="12"
      :sm="6"
      :md="5"
      :lg="5"
      :xl="3"
    >
      <el-button
        type="success"
        @click="searchOrder"
      >搜索</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      userAllData: [],
      userID: "",
      userTel: ""
    };
  },
  methods: {
    searchOrder() {
      let searchData = [];
      if (this.userID) {
        if (this.userTel) {
          this.userAllData.forEach((item, index) => {
            if (
              item.member_id == this.userID &&
              item.member_phone == this.userTel
            ) {
              searchData.push(item);
            }
          });
        } else {
          this.userAllData.forEach((item, index) => {
            if (item.member_id == this.userID) {
              searchData.push(item);
            }
          });
        }
      } else {
        if (this.userTel) {
          this.userAllData.forEach((item, index) => {
            if (item.member_phone == this.userTel) {
              searchData.push(item);
            }
          });
        } else {
          this.userAllData.forEach((item, index) => {
            searchData.push(item);
          });
        }
      }
      this.$store.dispatch("changeUserData", searchData);
    },
    //将后台传过来的时间long型转为时间格式
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-"; //此时为四位数字表示 getYear()的话为两位数字表示
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-"; //当前月份(0-11,0代表1月)
      var D = date.getDate() + " "; //当前日(1-31)
      var h = date.getHours() + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s = date.getSeconds();
      var ms = ":" + date.getMilliseconds(); //毫秒值

      return Y + M + D + h + m + s; //此处可以自定义需要的显示类型
    },
    timestampToBirth(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-"; //此时为四位数字表示 getYear()的话为两位数字表示
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-"; //当前月份(0-11,0代表1月)
      var D = date.getDate() + " "; //当前日(1-31)
      var h = date.getHours() + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s = date.getSeconds();
      var ms = ":" + date.getMilliseconds(); //毫秒值

      return Y + M + D; //此处可以自定义需要的显示类型
    }
  },
  created() {
    this.$fetch("/getUserData").then(resp => {
      let data = resp.data;
      console.log(data);
      data.forEach((item, index) => {
        if (item.user_status == 1) {
          item.user_status = "激活";
        } else {
          item.user_status = "冻结";
        }
        item.user_time = this.timestampToTime(item.user_time);
        item.member_birthday = this.timestampToBirth(item.member_birthday);
      });
      this.userAllData = data
    });
  }
};
</script>

<style scoped>
</style>