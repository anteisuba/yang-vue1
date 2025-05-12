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
import OverView from '../views/OverView.vue'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
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
      path: '/index',
      name: 'index',
      component: IndexView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: OverView
        },
        {
          path: 'hello',
          name: 'hello',
          component: hello
        },
        {
          path: 'localfile',
          name: 'localfile',
          component: LocalFile
        },
        {
          path: 'article',
          name: 'article',
          component: Article
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: Gallery
        },
        {
          path: 'diary',
          name: 'diary',
          component: Diary
        },
        {
          path: 'install',
          name: 'install',
          component: Install
        }
      ],
      redirect: '/index/overview'
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
  const isLoggedIn = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
    return;
  }
  next();
})

// 404处理
router.beforeEach((to,from,next)=>{
  if(to.matched.length===0) {
    from.name?next({
      name:from.name
    }):next('/errorinfo') 
  } else {
    next();
  }
})

export default router