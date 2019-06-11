import {post,fetch,patch,put} from '../utils/myAxios'

export function login(account, password) {
  const data = {
    account,
    password
  }
  return post('/login',data)
}

export function logout() {
  return post('/logOut')
}

export function getUserInfo() {
  return fetch('/getUserInfo')
}
