
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Hub.vue'), name:'home' },
      { path: '/chat/:chatid', component: () => import('src/pages/Chat.vue'), props: true, name:'chat' },
      { path: '/settings', component: () => import('pages/Settings.vue'), name:'settings'}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
