import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import hello from '../components/HelloWorld.vue'
import LocalFile from '../views/LocalFile.vue'
import Article from '../views/Article.vue'
import Gallery from '../views/Gallery.vue'
import Diary from '../views/Diary.vue'
import Install from '../views/Install.vue'

// const routes = [
//     {
//         path: '/',
//         redirect: '/overview',
//         component: IndexView,
//         children: [
//             {
//                 // 当 /user/:id/profile 匹配成功
//                 // UserProfile 将被渲染到 User 的 <router-view> 内部
//                 path: 'overview',
//                 component: () => import('../views/OverView.vue'),
//             },
//             {
//                 // 当 /user/:id/posts 匹配成功
//                 // UserPosts 将被渲染到 User 的 <router-view> 内部
//                 path: 'hello',
//                 component: hello,
//             },
//         ],
//     },
// ]

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/overview',
            component: IndexView,
            children: [
                {
                    path: 'overview',
                    component: () => import('../views/OverView.vue'),
                },
                {
                    path: 'hello',
                    component: hello,
                }
            ]
        },
        { path: '/localfile', component: LocalFile },
        { path: '/article', component: Article },
        { path: '/gallery', component: Gallery },
        { path: '/diary', component: Diary },
        { path: '/install', component: Install }
    ]
})

export default router;