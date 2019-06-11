<template>
  <div>
    <el-container>
      <el-header>
        <el-button type="primary">
          <router-link tag="span" to="/goods">返回商品列表</router-link>
        </el-button>
      </el-header>
      <el-main>
        <div class="goodsDetail">
          <div>
            <span>商品名称:</span>
            <el-input type="text" v-model="thisDetail.goods_name"></el-input>
          </div>
          <div>
            <span>商品类型:</span>
            <el-select v-model="thisDetail.goodsType_name" placeholder="请选择">
              <el-option value="女装"></el-option>
              <el-option value="配饰"></el-option>
            </el-select>
          </div>
          <div>
            <span>商品价钱:</span>
            <el-input type="number" v-model="thisDetail.goods_price"></el-input>
          </div>
          <div>
            <span>L码库存量:</span>
            <el-input type="number" v-model="thisDetail.goodsDetails_s"></el-input>
          </div>
          <div>
            <span>S码库存量:</span>
            <el-input type="number" v-model="thisDetail.goodsDetails_m"></el-input>
          </div>
          <div>
            <span>M码库存量:</span>
            <el-input type="number" v-model="thisDetail.goodsDetails_l"></el-input>
          </div>
          <div>
            <span>折扣系数:</span>
            <el-input type="number" v-model="thisDetail.goods_discount_price" max="1" min="0.5" step="0.05" @blur="discountCheck"></el-input>
          </div>
          <div>
            <span>商品状态:</span>
            <el-select v-model="thisDetail.goods_state" placeholder="请选择">
              <el-option value="上架"></el-option>
              <el-option value="下架"></el-option>
            </el-select>
          </div>
        </div>
        <el-button class="edit-btn" type="primary" @click="handleSave">保存</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  Message
} from 'element-ui';
export default {
  data() {
    return {
      thisDetail: "",
      goodsId: "",
      sizeId: ""
    };
  },

  components: {},

  computed: {
    goodsDetail() {
      return this.$store.getters.getGoodsDetail;
    }
  },

  methods: {
    handleSave() {
      let id = this.goodsId;
      let name = this.thisDetail.goods_name;
      let type = this.thisDetail.goodsType_name;
      let price = this.thisDetail.goods_price;
      let sAccout = this.thisDetail.goodsDetails_s;
      let mAccout = this.thisDetail.goodsDetails_m;
      let lAccout = this.thisDetail.goodsDetails_l;
      let status = this.thisDetail.goods_state;
      let discount = this.thisDetail.goods_discount_price
      this.$post("/goodsEdit", {
        id,
        name,
        type,
        price,
        sAccout,
        mAccout,
        lAccout,
        status,
        discount
      }).then(data => {
        if (data.msg == "ok") {
          Message({
            type: "success",
            showClose: true,
            message: "修改成功！"
          });
          this.$router.push({
          path: '/goods'
        });
        }
      });
    },
    discountCheck(){
      if(this.thisDetail.goods_discount_price>1||this.thisDetail.goods_discount_price<0.5){
        this.thisDetail.goods_discount_price=1
      }
    }
  },

  created() {
    this.thisDetail = this.goodsDetail;
    this.goodsId = this.$route.params.id;
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: rgb(240, 10, 10);
  text-align: left;
  line-height: 60px;
}
.el-main {
  text-align: left;
}
.el-input {
  width: 500px;
}
.goodsDetail {
  font-size: 16px;
}
.goodsDetail > div {
  margin-left: 200px;
  margin-bottom: 15px;
}
.edit-btn {
  margin-left: 200px;
}
</style>