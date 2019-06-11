<!--  -->
<template>
  <div>
    <el-container>
      <el-header>
        <CommentSearch></CommentSearch>
      </el-header>
      <el-main>
        <CommentList></CommentList>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CommentSearch from "../../components/comment/CommentSearch";
import CommentList from "../../components/comment/CommentList";
export default {
  data() {
    return {};
  },

  components: {
    CommentSearch,
    CommentList
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
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}
</style>