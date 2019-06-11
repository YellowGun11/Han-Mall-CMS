<template>
  <div class="table-content">
    <el-table
      ref="multipleTable"
      :data="currentPageData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="user_account"
        label="评论人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="comments_time"
        label="评论时间"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="comments_content"
        label="评论内容"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="comments_type"
        label="评论等级"
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
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer clear">
      <div class="table-footer-left">
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="batchDelete"
        ></el-button>
      </div>
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

    <el-dialog title="评论详情" :visible.sync="dialogTableVisible">
      <div class="commentDetail">
        <div>
          <span>商品名称:</span>
          <span>{{commentDetail.goods_name}}</span>
        </div>
        <div>
          <span>商品尺寸:</span>
          <span>{{commentDetail.good_size}}</span>
        </div>
        <div>
          <span>评论内容:</span>
          <span>{{commentDetail.comments_content}}</span>
        </div>
        <div>
          <span>评论时间:</span>
          <span>{{commentDetail.comments_time}}</span>
        </div>
        <div>
          <span>评论人:</span>
          <span>{{commentDetail.user_account}}</span>
        </div>
        <div>
          <span>评论等级:</span>
          <span>{{commentDetail.comments_type}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogTableVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
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
      commentDetail: "",
      dialogTableVisible: false,
      selected:""
    };
  },
  components: {},

  computed: {
    commentData() {
      return this.$store.getters.getCommentData;
    }
  },
  watch: {
    commentData: {
      deep: true,
      handler(newVal, oldVal) {
        this.tableData = this.commentData;
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
    //查看详情
    handleDetail(index, row) {
      this.commentDetail = row;
      this.dialogTableVisible = true;
    },
    //单个删除
    handleDelete(index, row) {
      let id = row.comments_id;
      let goodsId=row.goods_id;
      this.$confirm("此操作将永久删除这条评论, 是否继续?", "提示", {
        type: "warning"
      }).then(() => {
        this.tableData.forEach((item, index) => {
          if (id == item.comments_id) {
            this.tableData.splice(index, 1);
            this.$post("/commentsDelete", { id,goodsId }).then(data => {
              if (data.status == 1) {
                Message({
                  type: "success",
                  showClose: true,
                  message: "删除成功！"
                });
              }
            });
          }
        });
      });
    },
    //选中
    handleSelectionChange(val) {
      this.selected = val;
    },
    //批量删除
    batchDelete() {
      if (this.selected.length <= 0) {
        this.$message.warning("请选择要删除的商品");
        return;
      }
      var that = this;
      this.$confirm(
        "此操作将永久删除这" + this.selected.length + " 条评论数据, 是否继续?",
        "提示",
        { type: "warning" }
      ).then(() => {
        var selectedData = that.selected;
        var ids = []; //提取选中项的id
        for (var i = 0; i < selectedData.length; i++) {
          ids.push(selectedData[i].comments_id);
        }
        this.$post("/commentsDeleteGroup", { ids }).then(data => {
          if (data.status == 1) {
                Message({
                  type: "success",
                  showClose: true,
                  message: "删除成功！"
                });
              }
        });
        this.tableData.forEach((item, index) => {
          var tableItem = item;
          var tableIndex = index;
          ids.forEach((item, index) => {
            if (item == tableItem.comments_id) {
              this.tableData.splice(tableIndex, 1);
            }
          });
        });
      });
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
          this.tableData[i].comments_time = this.timestampToTime(
            this.tableData[i].comments_time
          );
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
    }
  },
  created() {
    this.$fetch("/getCommentData").then(resp => {
      console.log(resp.data);
      let theData = resp.data;
      theData.forEach((item, index) => {
        item.comments_time = this.timestampToTime(item.comments_time);
      });
      this.$store.dispatch("changeCommentData", theData);
      this.tableData = this.commentData;
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

.commentDetail {
  font-size: 16px;
}
.commentDetail > div {
  margin-left: 100px;
  margin-bottom: 15px;
}
</style>