import {CHANGE_GOODS_DATA,SAVE_ONO,GOODS_DETAIL} from './mutations_type'

const goods={
  state:{
    goodsData:[],
    goodsId:'',
    goodsDetail:{}
  },
  actions: {
    changeGoodsDate(context,obj){
      context.commit(CHANGE_GOODS_DATA,obj)
    },
    saveGoodsOno({commit},ono){
      commit(SAVE_ONO,ono)
    },
    getGoodsDetail({commit},obj){
      commit(GOODS_DETAIL,obj)
    }
  },
  mutations:{
    [CHANGE_GOODS_DATA](state,payload){
      state.goodsData=payload;
    },
    [SAVE_ONO](state,ono){
      state.goodsId=ono;
    },
    [GOODS_DETAIL](state,payload){
      state.goodsDetail=payload
    }
  },
  getters:{
    getGoodsData(state){
      return state.goodsData
    },
    getGoodsId(state){
      return state.goodsId
    },
    getGoodsDetail(state){
      return state.goodsDetail
    }
  }
}

export default goods