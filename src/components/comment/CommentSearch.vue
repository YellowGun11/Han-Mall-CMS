<template>
  <el-row :gutter="10">
    <el-col
      :xs="12"
      :sm="6"
      :md="6"
      :lg="10"
      :xl="3"
    >
      <el-col
        ref="element"
        :xs="12"
        :sm="8"
        :md="8"
        :lg="5"
      >
        <p>时间范围:</p>
      </el-col>
      <el-col
        :xs="8"
        :sm="16"
        :md="16"
        :lg="16"
      >
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
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
        :sm="9"
        :md="8"
        :lg="8"
      >
        <p class="order-name">评论等级:</p>
      </el-col>
      <el-col
        :xs="8"
        :sm="15"
        :md="15"
        :lg="15"
      >
        <el-select
          v-model="comment_type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-col>
    <el-col
      :xs="12"
      :sm="6"
      :md="5"
      :lg="3"
      :xl="3"
    >
      <el-button
        type="success"
        @click="searchComment"
      >搜索</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      comment_type: "",
      options2: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "好评",
          label: "好评"
        },
        {
          value: "中评",
          label: "中评"
        },
        {
          value: "差评",
          label: "差评"
        }
      ],
      commentAllData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timeValue: ""
    };
  },

  components: {},

  methods: {
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
    searchComment() {
      let newData = [];
      if (this.timeValue) {
        let min = this.timeValue[0].getTime();
        let max = this.timeValue[1].getTime();
        if (this.comment_type) {
          this.commentAllData.forEach((item, index) => {
            let theTime = new Date(item.comments_time);
            if(min<=theTime && theTime<=max && this.comment_type==item.comments_type){
              newData.push(item)
            }
          });
        } else {
          this.commentAllData.forEach((item, index) => {
            let theTime = new Date(item.comments_time);
            if(min<=theTime && theTime<=max){
              newData.push(item)
            }
          });
        }
      } else if (this.comment_type) {
        this.commentAllData.forEach((item, index) => {
            if(this.comment_type==item.comments_type){
              newData.push(item)
            }
          });
      } else {
        newData=this.commentAllData
      }
      this.$store.dispatch("changeCommentData", newData);
    }
  },
  created() {
    this.$fetch("/getCommentData").then(resp => {
      console.log(resp.data);
      this.commentAllData = resp.data;
      this.commentAllData.forEach((item, index) => {
        item.comments_time = this.timestampToTime(item.comments_time);
      });
    });
  }
};
</script>

<style scoped>
</style>