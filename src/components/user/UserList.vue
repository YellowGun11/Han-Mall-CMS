<!--  -->
<template>
  <div>
    <el-container>
      <el-main>
        <div class="table-content">
          <el-table
            class="table"
            ref="multipleTable"
            :data="currentPageData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column
              type="selection"
              width="55"
            ></el-table-column> -->
            <el-table-column
              prop="member_id"
              label="ID"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="user_account"
              label="账号"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="user_time"
              label="注册时间"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="member_nickname"
              label="昵称"
              width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="member_sex"
              label="性别"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="member_phone"
              label="手机号"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="member_email"
              label="邮箱"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="user_status"
              label="用户状态"
              width="100"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDetail(scope.$index, scope.row)"
                >详情</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  data-id
                  @click="handleChange(scope.$index, scope.row)"
                >冻结/激活</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-footer clear">
          <div class="table-footer-right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="changeCurrentData"
              :current-page.sync="currentPage"
              :page-size="pageDataNumber"
              layout="prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </div>
      </el-main>
      <el-dialog
        title="用户详情"
        :visible.sync="dialogTableVisible"
      >
        <div class="userDetail">
          <div>
            <span>用户ID:</span>
            <span>{{userDetail.member_id}}</span>
          </div>
          <div>
            <span>用户账号:</span>
            <span>{{userDetail.user_account}}</span>
          </div>
          <div>
            <span>用户昵称:</span>
            <span>{{userDetail.member_nickname}}</span>
          </div>
          <div>
            <span>注册时间:</span>
            <span>{{userDetail.user_time}}</span>
          </div>
          <div>
            <span>用户性别:</span>
            <span>{{userDetail.member_sex}}</span>
          </div>
          <div>
            <span>出生日期:</span>
            <span>{{userDetail.member_birthday}}</span>
          </div>
          <div>
            <span>用户手机:</span>
            <span>{{userDetail.member_phone}}</span>
          </div>
          <div>
            <span>用户邮箱:</span>
            <span>{{userDetail.member_email}}</span>
          </div>
          <div>
            <span>账号状态:</span>
            <span>{{userDetail.user_status}}</span>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogTableVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import {
  Message
} from 'element-ui';
export default {
  data() {
    return {
      multipleSelection: [],
      currentPage: 1,
      pageDataNumber: 5,
      currentPageData: [],
      tableData: [],
      userDetail: "",
      dialogTableVisible: false
    };
  },
  components: {},

  computed: {
    userData() {
      return this.$store.getters.getUserData;
    }
  },
  watch: {
    userData: {
      deep: true,
      handler(newVal, oldVal) {
        this.tableData = this.userData;
        this.currentPageData = [];
        for (var i = 0; i < this.pageDataNumber; i++) {
          if (i < this.tableData.length) {
            this.currentPageData.push(this.tableData[i]);
          }
        }
      }
    }
  },

  methods: {
    //用户详情按钮
    handleDetail(index, row) {
      this.userDetail = row;
      this.dialogTableVisible = true;
    },
    handleChange(index, row) {
      let memberId = row.member_id;
      if (row.user_status == "激活") {
        this.$confirm("此操作将冻结该用户的账号, 是否继续?", "提示", {
          type: "warning"
        }).then(() => {
          this.tableData.forEach((item, index) => {
            if (memberId == item.member_id) {
              item.user_status='冻结'
              let status=0
              this.$post("/userStopUsing", { memberId,status }).then(data => {
                if (data.status == 1) {
                  row.member_status='冻结'
                  console.log(row.member_status)
                  Message({
                    type: "success",
                    showClose: true,
                    message: "冻结成功！"
                  });
                }
              });
            }
          });
        });
      } else {
        this.tableData.forEach((item, index) => {
            if (memberId == item.member_id) {
              item.user_status='激活'
              let status=1
              this.$post("/userStopUsing", { memberId,status }).then(data => {
                if (data.status == 1) {
                  row.user_status='激活'
                  Message({
                    type: "success",
                    showClose: true,
                    message: "激活成功！"
                  });
                }
              });
            }
          });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    changeCurrentData(val) {
      console.log(`当前页: ${val}`);
      this.currentPageData = [];
      for (
        var i = (val - 1) * this.pageDataNumber;
        i < this.pageDataNumber * val;
        i++
      ) {
        if (i < this.tableData.length) {
          this.currentPageData.push(this.tableData[i]);
        }
      }
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
      this.$store.dispatch("changeUserData", data);
      this.tableData = this.userData;
      this.currentPageData = [];
      for (var i = 0; i < this.pageDataNumber; i++) {
        if (i < this.tableData.length) {
          this.currentPageData.push(this.tableData[i]);
        }
      }
    });
  }
};
</script>

<style scoped>
.clear:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.el-header {
  height: auto;
}
.table-footer {
  margin-top: 10px;
}

.table-footer-left {
  float: left;
}
.table-footer-right {
  float: right;
}

.userDetail {
  font-size: 16px;
}
.userDetail > div {
  margin-left: 100px;
  margin-bottom: 15px;
}
</style>