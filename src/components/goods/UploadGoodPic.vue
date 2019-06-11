<!--  -->
<template>
  <div>
    <p>商品图片上传(最多上传5张)</p>
    <el-upload
      :multiple="multiple"
      action
      list-type="picture-card"
      :auto-upload="false"
      :http-request="uploadFiles"
      :on-remove="handleRemove"
      :limit="5"
      ref="uploads"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button @click="subPicForm">提交上传</el-button>
    <p>商品详情图片上传(1张)</p>
    <el-upload
      :multiple="multiple"
      action
      list-type="picture-card"
      :auto-upload="false"
      :http-request="uploadFile"
      :on-remove="handleRemove"
      :limit="1"
      ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button @click="subPicForm2">提交上传</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      multiple: true,
      formDate: "",
      formDate2: ""
    };
  },

  props:{
    theImg:{
      type:Number,
    }
  },
  components: {},

  computed: {},

  methods: {
    handleRemove(file, fileList) {
      console.log(file);
    },
    uploadFiles(file) {
      this.formDate.append("myfiles", file.file);
    },
    subPicForm() {
      this.formDate = new FormData();
      this.$refs.uploads.submit();
      this.formDate.append("IMG_ID", this.theImg);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // console.log(this.formDate)
      this.$axios
        .post("/uploadFiles.do", this.formDate,config)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    uploadFile(file) {
      this.formDate2.append("myfile", file.file);
    },
    subPicForm2() {
      this.formDate2 = new FormData();
      this.$refs.upload.submit();
      this.formDate2.append("IMG_ID", this.theImg);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // console.log(this.formDate2)
      this.$axios
        .post("/uploadFile.do", this.formDate2)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped>
/*头像*/
.userCenter_hp {
  margin-top: 24px;
}
.userChoosePh {
  float: left;
  width: 150px;
  height: 170px;
}
.per_pic {
  width: 150px;
  height: 170px;
  float: left;
  border: 1px black dashed;
  /* overflow: hidden; */
}
.userCenter_headPhoto > img {
  width: 180px;
}
</style>