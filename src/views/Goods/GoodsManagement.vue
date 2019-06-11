<!--  -->
<template>
  <div>
    <el-container>
      <el-header>
        <GoodsHeader></GoodsHeader>
      </el-header>
      <el-main>
        <GoodsTable></GoodsTable>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GoodsHeader from '../../components/goods/GoodsHeader'
import GoodsTable from '../../components/goods/GoodTable'
export default {
  data() {
    return {};
  },

  components: {
    GoodsHeader,
    GoodsTable
  },

  computed: {},

  methods: {}
};
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