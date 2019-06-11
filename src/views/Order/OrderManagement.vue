<template>
  <div>
    <el-container>
      <el-header>
        <OrderSearch
         :allData="allOrderData"></OrderSearch>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import OrderSearch from "../../components/order/OrderSearch";
export default {
  data () {
    return {
      allOrderData:[]
    };
  },

  components: {
    OrderSearch
  },
  computed: {
    orderData() {
      return this.$store.getters.getOrderData;
    }
  },

  methods: {},

  created() {
    this.$fetch('/getOrderData').then(resp => {
      let data = resp.data;
      // console.log(data)
      this.$store.dispatch("changeOrderDate", data);
      this.allOrderData=this.orderData
    });
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
</style>