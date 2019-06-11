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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="order_id" label="订单编号" width="180"></el-table-column>
            <el-table-column prop="order_time" label="下单时间" width="150"></el-table-column>
            <el-table-column prop="user" label="收货人" width="100"></el-table-column>
            <el-table-column prop="tel" label="手机" width="120"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="order_is_finish" label="订单状态" width="100"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDetail(scope.$index, scope.row)"
                >详情</el-button>
                <el-button size="mini" data-id @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="success"  @click="handleSend(scope.$index, scope.row)">发货</el-button>
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
              :total="orderAllData.length"
            ></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      currentPage: 1,
      pageDataNumber: 5,
      currentPageData: [],
      orderAllData: [],
    };
  },
  components: {
  },

  computed: {
    orderData() {
      return this.$store.getters.getOrderData;
    }
  },
  watch:{
    orderData: {
      deep: true,
      handler(newVal, oldVal) {
        this.anewTableData(this.orderData);
      }
    },
  },

  methods: {
    //订单编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
      let theOrderno = row.order_id;
      this.$store.dispatch('saveOrderOno',theOrderno)
      this.$router.push('/orderEdit')
    },
    handleSend(index,row){
      let order_staust=row.order_is_finish
      let orderId=row.order_id
      if(order_staust=='待发货'){
        this.$confirm("确认该订单商品发货吗?", "提示", {
        type: "warning"
      }).then(() => {
            this.$post("/sendOrder", { orderId }).then(data => {
              if (data.status == 1) {
                alert("操作成功")
                row.order_is_finish='待收货'
              }
            });
      });
      }else{
        alert("无效操作")
      }
    },
    //订单详情按钮
    handleDetail(index, row) {
      var theOrderno = row.order_id;
      this.$store.dispatch('saveOrderOno',theOrderno)
      this.$router.push('/orderDetail')
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
      for (var i = (val - 1) * this.pageDataNumber;i < this.pageDataNumber * val;i++) {
        if (i < this.orderAllData.length) {
          this.orderAllData[i].order_time = this.timestampToTime(
            this.orderAllData[i].order_time
          );
          this.currentPageData.push(this.orderAllData[i]);
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
    //重新渲染表格数据
    anewTableData(tableData) {
      let realData=[]
      tableData.forEach((item,index)=>{
        item.user=item.order_details_addr.split("-")[0]
        item.tel=item.order_details_addr.split("-")[1]
        item.address=item.order_details_addr.split("-")[2]+item.order_details_addr.split("-")[3]
        if(item.order_is_finish==0){
          item.order_is_finish="未支付"
        }
        else if(item.order_is_finish==1){
          item.order_is_finish="待发货"
        }
        else if(item.order_is_finish==2){
          item.order_is_finish="待收货"
        }
        else if(item.order_is_finish==3){
          item.order_is_finish="已完成"
        }
        let oldItem=item
        if(index==0){
          realData.push(oldItem)
        }else{
          let flag=true
          realData.forEach((item,index)=>{
            if(oldItem.order_id==item.order_id){
              flag=false
            }
          })
          if(flag){
            realData.push(oldItem)
          }
        }
      })
      // console.log(realData)
      this.orderAllData = realData;
      this.currentPageData=[]
      for (var i = 0; i < this.pageDataNumber; i++) {
        if (i < this.orderAllData.length) {
          this.orderAllData[i].order_time = this.timestampToTime(
            this.orderAllData[i].order_time
          );
          this.currentPageData.push(this.orderAllData[i]);
        }
      }
    },
  },
  created() {
    // this.$fetch('/getOrderData').then(resp => {
    //   let data = resp.data;
    //   // console.log(data)
    //   this.$store.dispatch("changeOrderDate", data);
    //   this.anewTableData(this.orderData)
    // });
    this.anewTableData(this.orderData)
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
.el-header{
  height:auto;
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
</style>