import { h, resolveComponent } from 'vue'
//import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
// import Login from '../views/login.vue'

const routes = [
  {
    path: '/',
    name: 'Trang chủ',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Giao diện chính',
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
        name: 'Hồ sơ tài khoản',
        component: () => import('../views/Profile.vue'),
      },
      {
        path: '/invoice',
        name: 'Hóa đơn',
        redirect: '/invoice',
      },
      {
        path: '/invoice/list',
        name: 'Danh sách hóa đơn',
        component: () => import('@/views/invoice/Invoices.vue'),
      },
      {
        path: '/invoice/Wait',
        name: 'Danh sách hóa đơn chờ',
        component: () => import('@/views/invoice/InvoiceWait.vue'),
      },
      ///blog
      {
        path: '/blog',
        name: 'Bài viết',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/list',
        children: [
          {
            path: 'list',
            name: 'Danh sách bài viết',
            component: () => import('@/views/blog/Blogs.vue'),
          },
          {
            path: 'add',
            name: 'Tạo bài viết',
            component: () => import('@/views/blog/AddBlog.vue'),
          },
          {
            path: 'update/:id',
            name: 'Cập nhật bài viết',
            component: () => import('@/views/blog/UpdateBlog.vue'),
          },
          {
            path: 'blog-control',
            name: 'Điều chỉnh hiển thị',
            component: () => import('@/views/blog/BlogControl.vue'),
          },
        ]
      },
      ///////
      {
        path: '/product',
        name: 'Sản phẩm',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/product/list',
        children: [
          {
            path: '/product/list',
            name: 'Danh sách sản phẩm',
            component: () => import('@/views/product/Products.vue'),
          },
          {
            path: '/product/add',
            name: 'Thêm sản phẩm',
            component: () => import('@/views/product/addProduct.vue'),
          },
          {
            path: '/product/catergory',
            name: 'Danh mục',
            component: () => import('@/views/product/Catergory.vue'),
          },
          {
            path: '/product/tag',
            name: 'nhãn',
            component: () => import('@/views/product/Tag.vue'),
          },
          {
            path: '/product/brand',
            name: 'Thương hiệu',
            component: () => import('@/views/product/Brand.vue'),
          },
          {
            path: '/product/size',
            name: 'kích thước',
            component: () => import('@/views/product/Size.vue'),
          },
        ]
      },
      ///
      {
        path: '/user',
        name: 'Người dùng',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/user/list',
        children: [
          {
            path: '/user/list',
            name: 'Danh sách người dùng',
            component: () => import('@/views/user/ListUser.vue'),
          },
        ]
      },
      /////////////////////////
      {
        path: '/personnel',
        name: 'Nhân viên',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/personnel/priceList',
        children: [
          {
            path: '/personnel/priceList',
            name: 'Quản ký Giá hóa đơn',
            component: () => import('@/views/personnel/PriceList.vue'),
          },
          {
            path: '/personnel/AccoutUser',
            name: 'Quản lý tài khoản',
            component: () => import('@/views/personnel/AccoutUserGrap.vue'),
          },
          {
            path: '/personnel/WaitAccout',
            name: 'Quản lý Chờ xác thực',
            component: () => import('@/views/personnel/WaitAccout.vue'),
          },
          {
            path: '/personnel/StatisticalUser',
            name: 'Quản lý thống kê lương',
            component: () => import('@/views/personnel/StatisticalUser.vue'),
          }

        ]
      },
      ////////////// notification///////////
      {
        path: '/notification',
        name: 'Thông báo',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notification/lis',
        children: [

          {
            path: '/notification/lis',
            name: 'Quản lý thông báo',
            component: () => import('@/views/personnel/NotificationGrapUser.vue'),
          },
          {
            path: '/notification/create',
            name: 'Tạo Thông báo',
            component: () => import('@/views/personnel/NotificationCreate.vue'),
          },
        ]
      },
    ],
  },

]

// const router = createRouter({
//   history: createWebHistory(),
//   routes: routes
// })

// export default router

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
