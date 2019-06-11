<!--  -->
<template>
  <el-container>
    <el-aside width="200px">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "../components/home/NavMenu";
import TopNav from "../components/home/TopNav";
export default {
  data() {
    return {};
  },

  components: {
    NavMenu,
    TopNav
  },

  computed: {},

  methods: {}
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100vh;
}

.el-container.el-aside {
}
</style>