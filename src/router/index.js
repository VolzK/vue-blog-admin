import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  // 菜单管理
  {
    path: '/#',
    component: Layout,
    children: [
      {
        path: '/channel/list',
        name: 'List',
        component: () => import('@/views/channel/list'),
        meta: { title: '菜单', icon: '菜单管理' }
      }
    ]
  },
  {
    path: '/channel/list/', // 因为只有一级菜单，所以这里不写，粒度细化到具体路由
    hidden: true,
    component: Layout,
    meta: { title: '菜单', icon: 'menus' },
    children: [
      {
        path: '/channel/edit/:id',
        name: 'Edit',
        component: () => import('@/views/channel/edit'),
        meta: { title: '编辑', icon: 'form' }
      }
    ]
  },
  {
    path: '/channel/list', // 上一级菜单URL
    hidden: true,
    component: Layout,
    meta: { title: '管理', icon: 'form' },
    children: [
      {
        path: '/channel/add',
        name: 'Add',
        component: () => import('@/views/channel/add'),
        meta: { title: '新增', icon: 'form' }
      }
    ]
  },

  // 文章管理
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: { title: '文章', icon: 'article' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article/list'),
        meta: { title: '列表', icon: 'articleList' }
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/article/create'),
        meta: { title: '发布', icon: 'publish' }
      }
    ]
  },

  {
    path: '/article', // 上一级菜单URL
    hidden: true,
    component: Layout,
    meta: { title: '管理', icon: 'form' },
    children: [
      {
        path: '/article/edit/:id',
        name: 'Edit',
        component: () => import('@/views/article/edit'),
        meta: { title: '编辑', icon: 'form' }
      }
    ]
  },


  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '权限', icon: '权限' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '角色列表', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
