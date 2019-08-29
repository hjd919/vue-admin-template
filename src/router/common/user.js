import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/common/user/create'),
      name: 'CreateUser',
      meta: { title: '创建用户', activeMenu: '/user/list' },
      hidden: true
    },
    {
      path: 'edit',
      component: () => import('@/views/common/user/edit'),
      name: 'EditUser',
      meta: { title: '编辑用户', noCache: true, activeMenu: '/user/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/common/user/list'),
      name: 'UserList',
      meta: { title: '用户列表', icon: 'user' }
    }
  ]
}

export default userRouter
