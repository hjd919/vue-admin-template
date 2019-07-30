import Layout from '@/layout'

const userRouter = {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'App',
    meta: {
        title: 'App应用',
        icon: 'app'
    },
    children: [
        {
            path: '/user/create',
            component: () => import('@/views/app/create'),
            name: 'CreateApp',
            meta: { title: '创建App', icon: 'edit' }
        },
        {
            path: '/user/edit/:id(\\d+)',
            component: () => import('@/views/app/edit'),
            name: 'EditApp',
            meta: { title: '编辑App', noCache: true, activeMenu: '/app/list' },
            hidden: true
        },
        {
            path: '/user/list',
            component: () => import('@/views/app/list'),
            name: 'AppList',
            meta: { title: 'App列表', icon: 'list' }
        }
    ]
}

export default userRouter