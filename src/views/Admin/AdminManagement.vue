<template>
  <div>
    <el-container>
      <el-header>
        <AdminAdd></AdminAdd>
      </el-header>
      <el-main>
        <AdminList></AdminList>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AdminAdd from '../../components/admin/AdminAdd'
import AdminList from '../../components/admin/AdminList'
export default {
  data () {
    return {
    };
  },

  components: {
    AdminAdd,
    AdminList
  },

  computed: {},

  methods: {}
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
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}
</style>