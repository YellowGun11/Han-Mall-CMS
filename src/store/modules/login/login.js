import { login, getUserInfo, logout } from '../../../api/login'
import cookie from '../../../utils/jsCookie'
import { SET_TOKEN, SET_AUTHORITY, SET_ID, SET_NAME, SET_AVATAR, SET_TEL, SET_MAIL, SET_POWER } from './mutations_type'

const loginPage = {
  state: {
    admin_authority: '',
    id: '',
    account: '',
    avatar: '',
    tel: '',
    mail: '',
    token: cookie.get()
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user.account, user.password).then(data => {
          commit(SET_TOKEN, data.token)
          commit(SET_AUTHORITY, data.authority)
          cookie.set(data.token, 7)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(data => {
          if (data) {
            commit(SET_ID, data.adminData.id)
            commit(SET_NAME, data.adminData.name)
            commit(SET_AVATAR, data.adminData.imgSrc)
            commit(SET_TEL, data.adminData.tel)
            commit(SET_MAIL, data.adminData.mail)
            commit(SET_POWER, data.adminData.authority)
          } else {
            commit(SET_ID, '')
            commit(SET_NAME, '')
            commit(SET_AVATAR, '')
            commit(SET_TEL, '')
            commit(SET_MAIL, '')
            commit(SET_POWER, '')
            cookie.delete()
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(data => {
          commit(SET_ID, '')
          commit(SET_NAME, '')
          commit(SET_AVATAR, '')
          commit(SET_TEL, '')
          commit(SET_MAIL, '')
          commit(SET_POWER, '')
          cookie.delete()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [SET_AUTHORITY](state, auth) {
      state.admin_authority = auth;
    },
    [SET_ID](state, id) {
      state.id = id
    },
    [SET_NAME](state, name) {
      state.account = name
    },
    [SET_AVATAR](state, avatar) {
      state.avatar = avatar
    },
    [SET_TEL](state, tel) {
      state.tel = tel
    },
    [SET_MAIL](state, mail) {
      state.mail = mail
    },
    [SET_POWER](state, admin_authority) {
      state.admin_authority = admin_authority
    },
  },
  getters: {
    getAdminImg(state) {
      return state.avatar
    },
    getAdminName(state) {
      return state.account
    },
    getAdminPower(state) {
      return state.admin_authority
    },
    getAdminTel(state) {
      return state.tel
    },
    getAdminMail(state) {
      return state.mail
    }
  }
}

export default loginPage