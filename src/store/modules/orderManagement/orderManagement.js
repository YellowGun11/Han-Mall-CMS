import {CHANGE_ORDER_DATA,Order_DETAIL,SAVE_ONO} from './mutations_type'

const orderManagement = {
  state: {
    orderData: [],
    orderno: "",
    orderDetail: {
      data: [{
        uusername: "收货人",
          adetailed: "成都市天府三街云华路333号",
          uphone: "12345678987",
          ono: "15434165156",
          otime: "2019-01-05",
          ostatus: "已付款",
          stime: "2019-01-05",
          unickname: "下单用户",
          gimg: "images/user2.png",
          gname: "汉服采薇",
          gprice: 201.1,
          gcode: "1541423423",
          ccount: 4,
          Wsize: "S"
        },
        {
          uusername: "收货人",
          adetailed: "成都市天府三街云华路333号",
          uphone: "12345678987",
          ono: "15434165156",
          otime: "2019-01-05",
          ostatus: "已付款",
          stime: "2019-01-05",
          unickname: "下单用户",
          gimg: "images/user2.png",
          gname: "汉服采薇",
          gprice: 201.1,
          gcode: "1541423423",
          ccount: 4,
          Wsize: "S"
        },
        {
          uusername: "收货人",
          adetailed: "成都市天府三街云华路333号",
          uphone: "12345678987",
          ono: "15434165156",
          otime: "2019-01-05",
          ostatus: "已付款",
          stime: "2019-01-05",
          unickname: "下单用户",
          gimg: "images/user2.png",
          gname: "汉服采薇",
          gprice: 201.1,
          gcode: "1541423423",
          ccount: 4,
          Wsize: "M"
        }
      ]
    }
  },
  actions: {
    changeOrderDate(context,obj){
      context.commit(CHANGE_ORDER_DATA,obj)
    },
    saveOrderOno({commit},ono){
      commit(SAVE_ONO,ono)
    },
    getDataDetail({commit},obj){
      commit(Order_DETAIL,obj)
    }
  },
  mutations: {
    [CHANGE_ORDER_DATA](state,payload){
      state.orderData=payload;
    },
    [SAVE_ONO](state,ono){
      state.orderno=ono;
    },
    [Order_DETAIL](state,payload){
      state.orderDetail=payload
    }
  },
  getters: {
    getOrderData(state){
      return state.orderData
    },
    getOrderNumber(state){
      return state.orderno
    },
    getOrderDetail(state){
      return state.orderDetail
    }
  }
}

export default orderManagement