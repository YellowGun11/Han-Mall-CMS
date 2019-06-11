<!--  -->
<template>
  <div>
    <div class="step-box">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写商品基本信息"></el-step>
        <el-step title="上传商品照片"></el-step>
        <el-step title="确认商品信息"></el-step>
      </el-steps>
    </div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="10" :sm="12" :md="20" :lg="14" :xl="2">
        <el-tabs v-model="activeName">
          <el-tab-pane name="first">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm"
            >
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name" ></el-input>
              </el-form-item>

              <el-form-item label="商品类别" prop="type">
                <el-cascader expand-trigger="hover" :options="options" v-model="ruleForm.type"></el-cascader>
              </el-form-item>
              <el-form-item label="商品单价(￥)" prop="price">
                <el-input v-model="ruleForm.price" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="S码库存" prop="sizeS">
                <el-input v-model="ruleForm.sizeS" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="M码库存" prop="sizeM">
                <el-input v-model="ruleForm.sizeM" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="L码库存" prop="sizeL">
                <el-input v-model="ruleForm.sizeL" type="number" min="0"></el-input>
              </el-form-item>
              <el-form-item label="上架" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="second">
            <UploadGoodsPic
            :theImg="newImgId"
            ></UploadGoodsPic>
          </el-tab-pane>
          <el-tab-pane name="third">
            <AddGoodsSure 
            :theName="ruleForm.name" 
            :theType="ruleForm.type" 
            :thePrice="ruleForm.price"
            :theSNumber="ruleForm.sizeS" 
            :theMNumber="ruleForm.sizeM" 
            :theLNumber="ruleForm.sizeL" 
            :theStatic="ruleForm.delivery" 
            ></AddGoodsSure>
          </el-tab-pane>
          <el-tab-pane name="fourth"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-button style="margin-top: 12px;" @click="next">{{nextStep}}</el-button>
  </div>
</template>

<script>
import UploadGoodsPic from "./UploadGoodPic";
import AddGoodsSure from "./AddGoodsSure";
import {
  Message
} from 'element-ui';
export default {
  data() {
    return {
      active: 0,
      activeName: "first",
      nextStep:"下一步",
      ruleForm: {
        name: "",
        type: [],
        price: 0,
        sizeS: 0,
        sizeL: 0,
        sizeM: 0,
        delivery: true
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择商品类别", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品单价", trigger: "blur" }],
        sizeS: [
          { required: true, message: "请输入商品S码的库存", trigger: "blur" }
        ],
        sizeM: [
          { required: true, message: "请输入商品M码的库存", trigger: "blur" }
        ],
        sizeL: [
          { required: true, message: "请输入商品L码的库存", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "女装",
          label: "女装",
          children: [
            {
              value: "交领襦裙",
              label: "交领襦裙"
            },
            {
              value: "袄裙",
              label: "袄裙"
            },
            {
              value: "齐胸襦裙",
              label: "齐胸襦裙"
            },
            {
              value: "对襟齐腰",
              label: "对襟齐腰"
            },
            {
              value: "半臂/比甲",
              label: "半臂/比甲"
            },
            {
              value: "褙子/披风",
              label: "褙子/披风"
            },
            {
              value: "抹胸/吊带",
              label: "抹胸/吊带"
            },
          ]
        },
        {
          value: "配饰",
          label: "配饰",
          children: [
            {
              value: "吊带/抹胸",
              label: "吊带/抹胸"
            },
            {
              value: "中衣/义领/衬裙/云袜",
              label: "中衣/义领/衬裙/云袜"
            },
            {
              value: "发带/腰带/宫绦",
              label: "发带/腰带/宫绦"
            },
            {
              value: "手捂/毛领/包包",
              label: "手捂/毛领/包包"
            },
            {
              value: "斗篷/蓬衣",
              label: "斗篷/蓬衣"
            },
            {
              value: "鞋",
              label: "鞋"
            }
          ]
        }
      ],
      newImgId:0,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  components: {
    UploadGoodsPic,
    AddGoodsSure
  },

  computed: {},

  methods: {
    next() {
      if (this.active++ > 2) {
        this.active = 4;
      }
      if (this.active == 0) {
        this.activeName = "first";
      } else if (this.active == 1) {
        this.activeName = "second";
        this.$post('/goodsPic').then(data=>{
          this.newImgId=data.imgId
          console.log(this.newImgId)
        })
      } else if (this.active == 2) {
        this.activeName = "third";
        this.nextStep="确认"
      } else if (this.active == 3) {
        this.activeName = "fourth";
        let goodsForm=this.ruleForm
        let goods_picture_id=this.newImgId
        this.$post('/goodsAdd',{goodsForm,goods_picture_id}).then(data=>{
          console.log(data);
          if(data.msg){
            Message({
              type: "success",
              showClose: true,
              message: "商品添加成功！"
            });
            this.$router.push({
              path: '/goods'
            });
          }
        })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
</style>