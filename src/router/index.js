import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
// import Login from '../views/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/login',
        name: 'logins',
        component: () => import('../views/login.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
      },
      {
        path: '/invoice',
        name: 'invoice',
        redirect: '/invoice',
      },
      {
        path: '/invoice/list',
        name: 'invoices',
        component: () => import('@/views/invoice/Invoices.vue'),
      },
      {
        path: '/invoice/Wait',
        name: 'InvoiceWait',
        component: () => import('@/views/invoice/InvoiceWait.vue'),
      },
      ///blog
      {
        path: '/blog',
        name: 'blog',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/list',
        children: [
          {
            path: 'list',
            name: 'BlogList',
            component: () => import('@/views/blog/Blogs.vue'),
          },
          {
            path: 'add',
            name: 'CreateBlog',
            component: () => import('@/views/blog/AddBlog.vue'),
          },
          {
            path: 'update/:id',
            name: 'UpdateBlog',
            component: () => import('@/views/blog/UpdateBlog.vue'),
          },
          {
            path: 'blog-control',
            name: 'control',
            component: () => import('@/views/blog/BlogControl.vue'),
          },
        ]
      },
      ///////
      {
        path: '/product',
        name: 'product',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/product/list',
        children: [
          {
            path: '/product/list',
            name: 'list',
            component: () => import('@/views/product/Products.vue'),
          },
          {
            path: '/product/add',
            name: 'addProduct',
            component: () => import('@/views/product/addProduct.vue'),
          },
          {
            path: '/product/catergory',
            name: 'catergory',
            component: () => import('@/views/product/Catergory.vue'),
          },
          {
            path: '/product/tag',
            name: 'tag',
            component: () => import('@/views/product/Tag.vue'),
          },
          {
            path: '/product/brand',
            name: 'brand',
            component: () => import('@/views/product/Brand.vue'),
          },
          {
            path: '/product/size',
            name: 'size',
            component: () => import('@/views/product/Size.vue'),
          },
        ]
      },
      ///
      {
        path: '/user',
        name: 'user',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/user/list',
        children: [
          {
            path: '/user/list',
            name: 'listUser',
            component: () => import('@/views/user/ListUser.vue'),
          },
        ]
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
