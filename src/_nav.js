export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'admin',
    },
  },
  {
    component: 'CNavTitle',
    name: 'DỮ LIỆU BÁN HÀNG',
  },
  {
    component: 'CNavGroup',
    name: 'Product',
    to: '/product',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Danh sách sản phẩm',
        to: '/product/list',
      }, {
        component: 'CNavItem',
        name: 'Tạo sản phẩm',
        to: '/product/add',
      },
      {
        component: 'CNavItem',
        name: 'Danh mục (catergory)',
        to: '/product/catergory',
      },
      {
        component: 'CNavItem',
        name: 'Nhãn (tag)',
        to: '/product/tag',
      },
      {
        component: 'CNavItem',
        name: 'Thương hiệu (brand)',
        to: '/product/brand',
      },
      {
        component: 'CNavItem',
        name: 'Kích cỡ (size)',
        to: '/product/size',
      },
    ]
  },
  ////blog
  {
    component: 'CNavGroup',
    name: 'blog',
    to: '/blog',
    icon: 'cil-calculator',
    items: [

      {
        component: 'CNavItem',
        name: 'danh sách blog',
        to: '/blog/list',
      },
      {
        component: 'CNavItem',
        name: 'Tạo blog mới',
        to: '/blog/add',
      },
      {
        component: 'CNavItem',
        name: 'Quản lý blog hiển thị',
        to: '/blog/blog-control',
      },


    ]
  },
  //
  //// hóa đơn
  {
    component: 'CNavTitle',
    name: 'Thanh toán',
  },
  {
    component: 'CNavItem',
    name: 'Invloices',
    to: '/invoice/list',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'InvoiceWait',
        to: '/invoice/wait',
        icon: 'cil-note-add',
      },
      {
        component: 'CNavItem',
        name: 'list',
        to: '/invoice/list',
        icon: 'cil-note-add',
      }
    ]
  },

  //////// 




  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
