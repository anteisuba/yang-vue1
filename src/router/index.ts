import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import hello from '../components/HelloWorld.vue'
import LocalFile from '../views/LocalFile.vue'
import Article from '../views/Article.vue'
import Gallery from '../views/Gallery.vue'
import Diary from '../views/Diary.vue'
import Install from '../views/Install.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            // 当/user/:id/profile匹配成功
            // UserProfile将被渲染到User的<router-view>内部
            path: '/',
            name:'home',
            redirect: '/overview',
            component: IndexView,
            children: [
                {
                // 当/user/:id/profile匹配成功
                // UserProfile将被渲染到User的<router-view>内部
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
                { path: '/install', component: Install }
            ]
        },
    ]
})

export default router;