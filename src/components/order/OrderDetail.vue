<!--  -->
<template>
  <el-container>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="基本信息"
          name="first"
        >
          <el-row :gutter="10">
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">订单编号:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].order_id}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">订单状态:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].order_is_finish}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">下单时间:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].order_time}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">付款时间:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].order_pay_time}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">购买用户:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].user_account}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">收货用户:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].user}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">联系方式:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].tel}}</p>
              </el-col>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              class="infor-col"
            >
              <el-col
                :xs="4"
                :sm="6"
                :md="8"
                :lg="2"
                :xl="11"
              >
                <p class="infor-name">收货地址:</p>
              </el-col>
              <el-col
                :xs="8"
                :sm="6"
                :md="4"
                :lg="10"
                :xl="1"
              >
                <p class="infor-value">{{orderDetail[0].address}}</p>
              </el-col>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="商品信息"
          name="second"
        >
          <div class="table-content">
            <el-table
              ref="multipleTable"
              :data="orderDetail"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                prop="goods_name"
                label="商品名称"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column prop="gimg" label="商品图片" width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.gimg" alt style="width: 50px;height: 50px">
                </template>
              </el-table-column> -->
              <el-table-column
                prop="goods_id"
                label="商品编号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="goods_price"
                label="价格"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="goods_num"
                label="数量"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="goods_size"
                label="尺寸"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="allCount"
                label="总价"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <el-button
        type="primary"
        @click="returnOrder"
      >返回</el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      orderDetail: []
    };
  },

  components: {},

  computed: {
    theOrderDetail() {
      return this.$store.getters.getOrderDetail;
    }
  },

  methods: {
    returnOrder() {
      this.$router.push("/order");
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
    let theOrderno = this.$store.getters.getOrderNumber;
    console.log(theOrderno);
    this.$axios({
      url: "/getOrderDetail",
      method: "post",
      data: {
        ono: theOrderno
      }
    })
      .then(resp => {
        console.log(resp.data.data);
        console.log("成功");
        let data = resp.data.data;
        this.$store.dispatch("getDataDetail", data);
        this.orderDetail = data;
        let _this = this;
        this.orderDetail.forEach((item, index) => {
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
          item.user = item.order_details_addr.split("-")[0];
          item.tel = item.order_details_addr.split("-")[1];
          item.address =
            item.order_details_addr.split("-")[2] +
            item.order_details_addr.split("-")[3];
          item.order_time = _this.timestampToTime(item.order_time);
          item.order_pay_time = _this.timestampToTime(item.order_pay_time);
          let allCount = item.goods_price * item.goods_num;
          item.allCount = [];
          item.allCount=allCount;
        });
      })
      .catch(data => {
        console.log("错误");
      });
    // this.orderDetail = this.theOrderDetail;
    // let _this = this;
    // this.orderDetail.data.forEach((item, index) => {
    //   let allCount = item.gprice * item.ccount;
    //   _this.orderDetail.data[index].allCount = [];
    //   _this.orderDetail.data[index].allCount.push(allCount);
    // });
  }
};
</script>

<style scoped>
.infor-col {
  margin-bottom: 20px;
}
.infor-name,
.infor-value {
  height: 15px;
  line-height: 15px;
}
</style>