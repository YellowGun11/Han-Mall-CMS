<template>
  <div>
    <el-container>
      <el-header>
        <UserSearch></UserSearch>
      </el-header>
      <el-main>
        <UserList></UserList>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserSearch from '../../components/user/UserSearch'
import UserList from '../../components/user/UserList'
export default {
  data () {
    return {
    };
  },

  components: {
    UserSearch,
    UserList
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