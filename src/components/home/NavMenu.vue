<!--  -->
<template>
  <div>
    <div class="logoPart">
      <img class="logoImg" src="/images/logo.png" alt='logo'>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页中心</span>
      </el-menu-item> -->
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="2-1">
          <i class="el-icon-setting"></i>
          <router-link to='/goods/goodsList' tag="span" slot="title">商品列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <i class="el-icon-setting"></i>
          <router-link to='/goods/goodsAdd' tag="span" slot="title">添加商品</router-link>
        </el-menu-item>
      </el-submenu> -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <router-link to='/goods' tag="span" slot="title">商品管理</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <router-link to='/order' tag="span" slot="title">订单管理</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <router-link to='/comment' tag="span" slot="title">评论管理</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <router-link to='/user' tag="span" slot="title">用户管理</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-menu"></i>
        <router-link to='/admin' tag="span" slot="title">员工管理</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  create() {}
};
</script>

<style scoped>
.logoPart {
  height: 60px;
  background-color:  #b3c0d1;
}
</style>