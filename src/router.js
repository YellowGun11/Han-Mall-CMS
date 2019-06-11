import Vue from 'vue'
import Router from 'vue-router'
import {
  Message,
  TabPane
} from 'element-ui';

import cookie from './utils/jsCookie'
import store from './store/index'
import Home from './views/Home.vue'

Vue.use(Router)

//通用路由
export const constantRouterMap = [{
    path: '/',
    name: '登陆界面',
    component: () => import('./views/Login'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./views/404'),
    hidden: true
  },
  {
    path: '/index',
    name: '主页',
    role: ['basics'], //页面需要的权限
    component: Home,
    redirect: '/goods',
    children: [
      //商品管理
      {
        path: '/goods',
        name: '商品管理',
        icon: 'el-icon-menu',
        role: ['basics'], //页面需要的权限
        component: () => import('./views/Goods/GoodsManagement.vue'),
      },
      {
        path: '/goods/goodsAdd',
        name: '添加商品',
        icon: 'el-icon-setting',
        role: ['basics'],
        component: () => import('./views/Goods/AddGoods.vue')
      },
      {
        path: '/goods/goodsEdit/:id',
        name: '编辑商品',
        icon: 'el-icon-setting',
        role: ['basics'],
        component: () => import('./views/Goods/GoodsEdit.vue')
      },
      //订单管理
      {
        path: '/order',
        name: '订单管理',
        icon: 'el-icon-menu',
        role: ['basics'], //页面需要的权限
        redirect: '/orderList',
        component: () => import('./views/Order/OrderManagement.vue'),
        children: [{
          path: '/orderList',
          name: '订单列表',
          component: () => import("./components/order/OrderList.vue"),

        },
        {
          path: '/orderDetail',
          name: '订单详情',
          hidden: true,
          component: () => import("./components/order/OrderDetail.vue")
        },
        {
          path: '/orderEdit',
          name: '订单编辑',
          hidden: true,
          component: () => import("./components/order/OrderEdit.vue")
        }
      ]
      },
      //评论管理
      {
        path: '/comment',
        name: '评论管理',
        icon: 'el-icon-menu',
        role: ['basics'], //页面需要的权限
        component: () => import('./views/Comment/CommentManagement.vue'),
      },
      //用户管理
      {
        path: '/user',
        name: '用户管理',
        icon: 'el-icon-menu',
        role: ['basics'], //页面需要的权限
        component: () => import('./views/User/UserManagement.vue'),
      },
      //员工管理
      {
        path: '/admin',
        name: '员工管理',
        icon: 'el-icon-menu',
        role: ['basics'], //页面需要的权限
        component: () => import('./views/Admin/AdminManagement.vue'),
        beforeEnter: (to, from, next) => {
          // ...
          if(store.state.loginPage.admin_authority==''||store.state.loginPage.admin_authority<2){
            alert("权限不够，无法访问")
          }else {
            next()
          }
        }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  //Vue scrollBehavior 滚动行为，注意: 这个功能只在 HTML5 history 模式下可用。
  //使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

//动态需要根据权限加载的路由表 
export const asyncRouterMap = [{
  path: '/index',
  name: '主页',
  role: ['basics'], //页面需要的权限
  component: Home,
  // redirect: '/home',
  children: [
    //首页
    {
      path: '/home',
      name: '首页',
      icon: 'el-icon-menu',
      role: ['basics'], //页面需要的权限
      component: () => import('./views/Home/Center.vue')
    },
    //商品管理
    {
      path: '/goods',
      name: '商品管理',
      icon: 'el-icon-menu',
      role: ['basics'], //页面需要的权限
      component: () => import('./views/Goods/GoodsManagement.vue'),
      children: [{
        path: '/goods/goodsAdd',
        name: '添加商品',
        icon: 'el-icon-setting',
        role: ['basics'],
        component: () => import('./views/Goods/AddGoods.vue')
      }]
    },
    //订单管理
    {
      path: '/order',
      name: '订单管理',
      icon: 'el-icon-menu',
      role: ['basics'], //页面需要的权限
      component: () => import('./views/Order/OrderManagement.vue'),
    },
    //评论管理
    {
      path: '/comment',
      name: '评论管理',
      icon: 'el-icon-menu',
      role: ['basics'], //页面需要的权限
      component: () => import('./views/Comment/CommentManagement.vue'),
    },
    //用户管理
    {
      path: '/user',
      name: '用户管理',
      icon: 'el-icon-menu',
      role: ['basics'], //页面需要的权限
      component: () => import('./views/User/UserManagement.vue'),
    },
    //员工管理
    {
      path: '/admin',
      name: '员工管理',
      icon: 'el-icon-menu',
      role: ['basics'], //页面需要的权限
      component: () => import('./views/Admin/AdminManagement.vue'),
    }
  ]
}]



//路由全局守卫
router.beforeEach((to, from, next) => {
  if (cookie.get()) { // 有token
    if (to.path === '/') {
      next({
        path: '/index'
      })
    } else {
      if (store.state.loginPage.account == '') {
        store.dispatch('getUserInfo').then(data => { //获取用户信息
          next()
        }).catch(() => {
          // next({
          //   path: '/'
          // })
        })
      } else {
        next()
      }
    }
  } else { // 无token
    if (to.path === '/') {
      next()
    } else {
      Message({
        type: 'warning',
        showClose: true,
        message: '请先登录哦'
      })
      next({
        path: '/'
      })
    }

  }
})

export default router