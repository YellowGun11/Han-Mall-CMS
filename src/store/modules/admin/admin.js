import {CHANGE_ADMIN_DATA,SAVE_ID,ADMIN_DETAIL} from './mutations_type'

const admin={
  state:{
    adminData:[],
    adminId:'',
    adminDetail:''
  },
  actions: {
    changeAdminData(context,obj){
      context.commit(CHANGE_ADMIN_DATA,obj)
    },
    saveAdminId({commit},ono){
      commit(SAVE_ID,ono)
    },
    getAdminDetail({commit},obj){
      commit(ADMIN_DETAIL,obj)
    }
  },
  mutations:{
    [CHANGE_ADMIN_DATA](state,payload){
      state.adminData=payload;
    },
    [SAVE_ID](state,ono){
      state.adminId=ono;
    },
    [ADMIN_DETAIL](state,payload){
      state.adminDetail=payload
    }
  },
  getters:{
    getAdminData(state){
      return state.adminData
    },
    getAdminId(state){
      return state.adminId
    },
    getAdminDetail(state){
      return state.adminDetail
    }
  }
}

export default admin