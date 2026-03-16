import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/Form.vue'
import Mine from '../views/Mine.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
    meta:{
      isShow:true,
    }
  },
  {
    path: '/home',
    name: 'home',
    component:HomeView,
    meta:{
      isShow:true,
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component:Mine,
    meta:{
      isShow:true,
    }
  },
  {
    path: '/order',
    name: 'order',
    component:Order,
    meta:{
      isShow:false,
    }
  }
    ,
    {
      path: '/login',
      name: 'Login',
      component: Login, // 新增
      meta: { isShow: false }, // 登录页不需要底部导航栏
    },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
