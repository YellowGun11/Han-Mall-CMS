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
              prop="admin_id"
              label="管理员编号"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="admin_name"
              label="账号"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="admin_tel"
              label="手机"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="admin_mail"
              label="邮箱"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="admin_authority"
              label="权限等级"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="admin_is_forget"
              label="密码状态"
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
                  @click="handleDel(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="success"
                  data-id
                  @click="handleReset(scope.$index, scope.row)"
                >重置密码</el-button>
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


      
   
      <!-- 员工详情模态框 -->
      <el-dialog
        title="员工详情"
        :visible.sync="dialogTableVisible"
      >
        <div class="userDetail">
          <div>
            <span>员工编号:</span>
            <span>{{adminDetail.admin_id}}</span>
          </div>
          <div>
            <span>员工账号:</span>
            <span>{{adminDetail.admin_name}}</span>
          </div>
          <div>
            <span>账号密码:</span>
            <span>{{adminDetail.admin_password}}</span>
          </div>
          <div>
            <span>员工手机:</span>
            <span>{{adminDetail.admin_tel}}</span>
          </div>
          <div>
            <span>员工邮箱:</span>
            <span>{{adminDetail.admin_mail}}</span>
          </div>
          <div>
            <span>密码状态:</span>
            <span>{{adminDetail.admin_is_forget}}</span>
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
      adminDetail: "",
      dialogTableVisible: false
    };
  },
  components: {},

  computed: {
    adminData() {
      return this.$store.getters.getAdminData;
    }
  },
  watch: {
    adminData: {
      deep: true,
      handler(newVal, oldVal) {
        this.tableData = this.adminData;
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
    //员工详情按钮
    handleDetail(index, row) {
      this.adminDetail = row;
      this.dialogTableVisible = true;
    },
    //员工删除按钮
    handleDel(index, row){
      let power=row.admin_authority
      let admin_id=row.admin_id
      if(power>0){
        alert("无法删除！")
      }else{
        this.$confirm("确认删除该员工账号信息吗?", "提示", {
          type: "warning"
          }).then(() => {
            this.tableData.forEach((item, index) => {
              if (admin_id == item.admin_id) {
                console.log(index)
                this.tableData.splice(index, 1);
                this.$post("/delAdminData", { admin_id }).then(data => {
                  if (data.status == 1) {
                    alert("操作成功")
                  }
                });
              }
            });
        });
      }
    },
    //员工密码重置按钮
    handleReset(index, row){
      let power=row.admin_authority
      let admin_id=row.admin_id
      if(power>0){
        alert("无法重置！")
      }else{
        this.$confirm("确认将该员工账号密码重置为初始密码吗?", "提示", {
          type: "warning"
          }).then(() => {
            this.tableData.forEach((item, index) => {
              if (admin_id == item.admin_id) {
                item.admin_password='123456'
                this.$post("/resetAdminData", { admin_id }).then(data => {
                  if (data.status == 1) {
                    alert("操作成功")
                  }
                });
              }
            });
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
    }
    
    
  },
  created() {
    this.$fetch("/getAdminData").then(resp => {
      let data = resp.data;
      console.log(data);
      this.$store.dispatch("changeAdminData", data);
      this.tableData = this.adminData;
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