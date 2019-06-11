<!--  -->
<template>
  <el-row :gutter="10">
    <el-col :xs="4" :sm="4" :md="4" :lg="4">
      <el-button type="primary">
        <router-link tag="span" to='/goods/goodsAdd'>添加商品</router-link>
      </el-button>
    </el-col>
    <el-col :xs="8" :sm="8" :md="6" :lg="12">
      <div class="header-offeset"></div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="14" :lg="8">
      <input class="goods_search" v-model="inputValue" placeholder="请输入商品名称或类型">
      <el-button type="primary" icon="el-icon-search" @click="searchGoods">搜索</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "GoodsHeader",
  data() {
    return {
      inputValue: "",
      searchData:[]
    };
  },

  components: {},

  computed: {
    goodsData() {
      return this.$store.getters.getGoodsData;
    }
  },

  methods: {
    searchGoods(){
      this.searchData=[]
      this.goodsData.forEach((item,index) => {
        if(item.goods_name.indexOf(this.inputValue)>=0||item.goodsType_name==this.inputValue){
          this.searchData.push(item)
        }
      });
      this.$store.dispatch("changeGoodsDate", this.searchData);
    }
  }
};
</script>

<style scoped>
.goods_search {
  width: 200px;
  height: 40px;
  border-radius: 3px;
  outline: none;
  border: none;
  margin-right: 10px;
  padding-left: 10px;
}
.header-offeset {
  height: 40px;
}
</style>