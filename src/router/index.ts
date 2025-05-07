import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import hello from '../components/HelloWorld.vue'
import LocalFile from '../views/LocalFile.vue'
import Article from '../views/Article.vue'
import Gallery from '../views/Gallery.vue'
import Diary from '../views/Diary.vue'
import Install from '../views/Install.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ErrorInfo from '../views/404.vue'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // 移除对'/overview'的重定向
      component: IndexView,
      children: [
        {
          path: 'overview',
          component: () => import('../views/OverView.vue'),
        },
        {
          path: 'hello',
          component: hello,
        },
        { path: '/localfile', component: LocalFile },
        { path: '/article', component: Article },
        { path: '/gallery', component: Gallery },
        { path: '/diary', component: Diary },
        { path: '/install', component: Install },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/errorinfo',
      name: 'errorinfo',
      component: ErrorInfo
    },
  ],
})

// 全局导航守卫处理认证
router.beforeEach((to, from, next) => {
  // 如果尝试访问根路径'/'
  if (to.path === '/') {
    // 作为后备方案重定向到登录页面
    // 你的组件中的isRegister函数将处理进一步的重定向
    next('/login');
    return;
  }
  
  next();
})

//在路由请求之前
router.beforeEach((to,from,next)=>{
  if(to.matched.length===0) {
    //地址发生跳转
    from.name?next({
      name:from.name
    }):next('errorinfo') 
  } else {
    next();
  }
})

export default router