<!--  -->
<template>
  <el-row :gutter="10">
    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="3">
      <el-col ref="element" :xs="12" :sm="8" :md="7" :lg="6">
        <p class="order-id">订单号:</p>
      </el-col>
      <el-col :xs="8" :sm="16" :md="17" :lg="18">
        <el-input placeholder="请输入订单号" v-model="orderno" clearable></el-input>
      </el-col>
    </el-col>
    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="3">
      <el-col ref="element" :xs="12" :sm="8" :md="7" :lg="6">
        <p class="order-name">收货人:</p>
      </el-col>
      <el-col :xs="8" :sm="16" :md="17" :lg="18">
        <el-input placeholder="请输入名字" v-model="name" clearable></el-input>
      </el-col>
    </el-col>
    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="3">
      <el-col ref="element" :xs="12" :sm="9" :md="9" :lg="9">
        <p class="order-name">订单状态:</p>
      </el-col>
      <el-col :xs="8" :sm="15" :md="15" :lg="15">
        <el-select v-model="ostatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-col>
    <el-col :xs="12" :sm="6" :md="5" :lg="5" :xl="3">
        <el-button type="success" @click="searchOrder">搜索</el-button>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      //订单编号
      orderno: "",
      //收货人
      name: "",
      //订单状态
      options: [
        {
          value: "全部状态",
          label: "全部状态"
        },
        {
          value: "未支付",
          label: "未支付"
        },
        {
          value: "待发货",
          label: "待发货"
        },
        {
          value: "待收货",
          label: "待收货"
        },
        {
          value: "已完成",
          label: "已完成"
        }
      ],
      ostatus: "",
    };
  },
  props:{
    allData:{
      type:Array
    }
  },
  computed: {
    orderData() {
      return this.$store.getters.getOrderData;
    }
  },
  methods: {
    searchOrder(){
      // console.log(this.ostatus)
      this.allData.forEach((item,index)=>{
        item.name=item.order_details_addr.split("-")[0]
      })
      let result=[]
      if (this.orderno) {
        if(this.name){
          if(this.ostatus){
            if(this.ostatus=='全部状态'){
              this.allData.forEach((item,index)=>{
              if(item.order_id==this.orderno&&item.name==this.name){
                result.push(item)
              }
              })
            }else{
              this.allData.forEach((item,index)=>{
              if(item.order_id==this.orderno&&item.name==this.name&&item.order_is_finish==this.ostatus){
                result.push(item)
              }
              })
            }
          }else{
            this.allData.forEach((item,index)=>{
              if(item.order_id==this.orderno&&item.name==this.name){
                result.push(item)
              }
            })
          }
        }else if(this.ostatus){
          if(this.ostatus=='全部状态'){
              this.allData.forEach((item,index)=>{
              if(item.order_id==this.orderno){
                result.push(item)
              }
              })
            }else{
              this.allData.forEach((item,index)=>{
              if(item.order_id==this.orderno&&item.order_is_finish==this.ostatus){
                result.push(item)
              }
              })
            }
        }else{
          this.allData.forEach((item,index)=>{
              if(item.order_id==this.orderno){
                result.push(item)
              }
              })
        }
      }else{
        if(this.name){
          if(this.ostatus){
            if(this.ostatus=='全部状态'){
              this.allData.forEach((item,index)=>{
              if(item.name==this.name){
                result.push(item)
              }
              })
            }else{
              this.allData.forEach((item,index)=>{
              if(item.name==this.name&&item.order_is_finish==this.ostatus){
                result.push(item)
              }
              })
            }
          }else{
            this.allData.forEach((item,index)=>{
              if(item.name==this.name){
                result.push(item)
              }
            })
          }
        }else{
          if(this.ostatus=='全部状态'||this.ostatus==''){
              this.allData.forEach((item,index)=>{
                result.push(item)  
              })
            }else{
              // console.log(111)
              // console.log(this.ostatus)
              this.allData.forEach((item,index)=>{
                // console.log(item.order_is_finish)
              if(item.order_is_finish==this.ostatus){
                result.push(item)
              }
              })
            }
        }
      }
      console.log(result)
      this.$store.dispatch('changeOrderDate',result)
    }
  }
};
</script>

<style scoped>
.el-row{
  /* margin-top: 10px */
}
/* .order-id,
.order-name {
  margin-top: 10px;
} */
</style>