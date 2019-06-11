<template>
  <div>
    <el-container>
      <el-header>
        <AddGoodsHeader></AddGoodsHeader>
      </el-header>
      <el-main>
        <AddGoodsContent></AddGoodsContent>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AddGoodsHeader from '../../components/goods/AddGoodsHeader'
import AddGoodsContent from '../../components/goods/AddGoodsStep1'
export default {
  data() {
    return {
      
    };
  },

  components: {
    AddGoodsHeader,
    AddGoodsContent
  },

  computed: {},

  methods: {
  
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: rgb(240, 10, 10);
  text-align: left;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}
.el-col {
  border-radius: 4px;
}
</style>