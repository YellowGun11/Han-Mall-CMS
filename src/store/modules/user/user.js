import { CHANGE_USER_DATA, SAVE_ID, USER_DETAIL } from './mutations_type'

const user = {
  state: {
    userData: [],
    userId: '',
    userDetail: ''
  },
  actions: {
    changeUserData(context, obj) {
      context.commit(CHANGE_USER_DATA, obj)
    },
    saveUserId({ commit }, ono) {
      commit(SAVE_ID, ono)
    },
    getUserDetail({ commit }, obj) {
      commit(USER_DETAIL, obj)
    }
  },
  mutations: {
    [CHANGE_USER_DATA](state, payload) {
      state.userData = payload;
    },
    [SAVE_ID](state, ono) {
      state.userId = ono;
    },
    [USER_DETAIL](state, payload) {
      state.userDetail = payload
    }
  },
  getters: {
    getUserData(state) {
      return state.userData
    },
    getUserId(state) {
      return state.userId
    },
    getUserDetail(state) {
      return state.userDetail
    }
  }
}

export default user