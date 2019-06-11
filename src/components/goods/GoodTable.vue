<!--  -->
<template>
  <div id="goods-table">
    <div class="select-box clear">
      <div class="select-box1">
        <label class="select1-title">选择状态:</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="select-box2">
        <label class="select1-title">选择类型:</label>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="currentPageData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsType_name" label="类别" width="120"></el-table-column>
        <el-table-column prop="goods_price" label="单价" width="120"></el-table-column>
        <el-table-column prop="goods_collection" label="收藏量" width="100"></el-table-column>
        <el-table-column prop="goods_comments" label="评论数" width="100"></el-table-column>
        <el-table-column prop="goods_state" label="状态" width="140"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer clear">
      <div class="table-footer-left">
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="batchDelete"></el-button>
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

    <el-dialog title="商品详情" :visible.sync="dialogTableVisible">
      <div class="goodsDetail">
        <div>
          <span>商品名称:</span>
          <span>{{goodsDetail.goods_name}}</span>
        </div>
        <div>
          <span>商品类型:</span>
          <span>{{goodsDetail.goodsType_name}}</span>
        </div>
        <div>
          <span>商品价钱:</span>
          <span>{{goodsDetail.goods_price}}</span>
        </div>
        <div>
          <span>商品库存量:</span>
          <span>{{goodsDetail.goodsAccouts}}</span>
        </div>
        <div>
          <span>商品收藏量:</span>
          <span>{{goodsDetail.goods_collection}}</span>
        </div>
        <div>
          <span>商品评论数:</span>
          <span>{{goodsDetail.goods_comments}}</span>
        </div>
        <div>
          <span>折扣系数:</span>
          <span>{{goodsDetail.goods_discount_price}}</span>
        </div>
        <div>
          <span>商品状态:</span>
          <span>{{goodsDetail.goods_state}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
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
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "上架",
          label: "上架"
        },
        {
          value: "下架",
          label: "下架"
        }
      ],
      options2: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "女装",
          label: "女装"
        },
        {
          value: "配饰",
          label: "配饰"
        }
      ],
      value: "",
      value2: "",
      tableData: [],
      allGoodsData: [],
      multipleSelection: [],
      currentPage: 1,
      pageDataNumber: 5,
      currentPageData: [],
      selectData: [],
      selected: [],
      goodsDetail: "",
      dialogTableVisible: false
    };
  },

  components: {},

  computed: {
    goodsData() {
      return this.$store.getters.getGoodsData;
    }
  },
  watch: {
    goodsData: {
      deep: true,
      handler(newVal, oldVal) {
        this.anewTableData(this.goodsData);
      }
    },
    value: {
      deep: true,
      handler(newVal, oldVal) {
        // console.log("newValue", newVal);
        // console.log("oldValue", oldVal.text);
        this.selectResult();
      }
    },
    value2: {
      deep: true,
      handler(newVal, oldVal) {
        this.selectResult();
      }
    }
  },
  methods: {
    //详情
    handleDetail(index, row) {
      // console.log(index, row);
      this.goodsDetail = row;
      this.goodsDetail.goodsAccouts =
        parseInt(this.goodsDetail.goodsDetails_s) +
        parseInt(this.goodsDetail.goodsDetails_m) +
        parseInt(this.goodsDetail.goodsDetails_l);
      this.dialogTableVisible = true;
    },
    //编辑
    handleEdit(index, row) {
      this.goodsDetail = row;
      let id = row.goods_id;
      this.$store.dispatch("getGoodsDetail", this.goodsDetail);
      this.$router.push({
        path: `/goods/goodsEdit/${id}`
      });
    },
    //删除
    handleDelete(index, row) {
      let id = row.goods_id;
      this.$confirm("此操作将永久删除这个商品数据, 是否继续?", "提示", {
        type: "warning"
      }).then(() => {
        this.tableData.forEach((item, index) => {
          if (id == item.goods_id) {
            this.tableData.splice(index, 1);
            this.$post("/goodsDelete", { id }).then(data => {
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
    //条件选择
    selectResult() {
      if (this.value == "" || this.value == "0") {
        this.selectData = [];
        if (this.value2 == "0" || this.value2 == "") {
          this.anewTableData(this.allGoodsData);
        } else {
          this.allGoodsData.forEach((item, index) => {
            if (item.goodsType_name == this.value2) {
              this.selectData.push(item);
            }
          });
          this.anewTableData(this.selectData);
        }
      } else {
        this.selectData = [];
        if (this.value2 == "0" || this.value2 == "") {
          this.allGoodsData.forEach((item, index) => {
            if (item.goods_state == this.value) {
              this.selectData.push(item);
            }
          });
          this.anewTableData(this.selectData);
        } else {
          this.allGoodsData.forEach((item, index) => {
            if (
              item.goods_state == this.value &&
              item.goodsType_name == this.value2
            ) {
              this.selectData.push(item);
            }
          });
          this.anewTableData(this.selectData);
        }
      }
    },
    //重新渲染表格数据
    anewTableData(tableData) {
      this.tableData = tableData;
      this.currentPageData = [];
      for (var i = 0; i < this.pageDataNumber; i++) {
        if (i < this.tableData.length) {
          this.currentPageData.push(this.tableData[i]);
        }
      }
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
        "此操作将永久删除这" + this.selected.length + " 个商品数据, 是否继续?",
        "提示",
        { type: "warning" }
      ).then(() => {
        var selectedData = that.selected;
        var ids = []; //提取选中项的id
        for (var i = 0; i < selectedData.length; i++) {
          ids.push(selectedData[i].goods_id);
        }
        this.$post("/goodsDeleteGroup", { ids }).then(data => {
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
            if (item == tableItem.goods_id) {
              this.tableData.splice(tableIndex, 1);
            }
          });
        });
      });
    }
  },
  created() {
    this.$fetch("/getGoodsData").then(data => {
      let goodData = data.data;
      this.$store.dispatch("changeGoodsDate", goodData);
      this.allGoodsData = this.goodsData;
      this.anewTableData(this.goodsData);
    });
  }
};
</script>

<style scoped>
.select1-title {
  margin-right: 5px;
}
.clear:after {
  content: "";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}
.select-box1 {
  float: left;
}
.select-box2 {
  float: left;
  margin-left: 20px;
}
.table-content {
  margin-top: 10px;
}
.table-footer-left {
  float: left;
}
.table-footer-right {
  float: right;
}
.goodsDetail {
  font-size: 16px;
}
.goodsDetail > div {
  margin-left: 100px;
  margin-bottom: 15px;
}
</style>