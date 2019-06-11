<!--  -->
<template>
  <div>
    <p>商品名称：<span>{{theName}}</span></p>
    <p>商品类别：<span>{{theType}}</span></p>
    <p>商品单价：<span>{{thePrice}}</span></p>
    <p>S码库存：<span>{{theSNumber}}</span></p>
    <p>M码库存：<span>{{theMNumber}}</span></p>
    <p>L码库存：<span>{{theLNumber}}</span></p>
    <p>上架状态：<span>{{theStatic}}</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    theName:{
      type:String,
      default:''
    },
    theType:{
      type:Array,
      default:[]
    },
    thePrice:{
      type:Number,
      default:0
    },
    theSNumber:{
      type:Number,
      default:0
    },
    theMNumber:{
      type:Number,
      default:0
    },
    theLNumber:{
      type:Number,
      default:0
    },
    theStatic:{
      type:Boolean,
      default:false
    }
  },
  components: {},

  computed: {},

  methods: {}
}
</script>

<style scoped>
</style>