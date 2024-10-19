export default [
  {
    component: 'CNavItem',
    name: 'Trang chủ',
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
    name: 'Quản lý sản phẩm',
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
    name: 'Quản lý bài đăng(Blog)',
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
    name: 'Hóa đơn',
    to: '/invoice/list',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Hóa đơn đang chờ',
        to: '/invoice/wait',
        icon: 'cil-note-add',
      },
      {
        component: 'CNavItem',
        name: 'Danh sách hóa đơn',
        to: '/invoice/list',
        icon: 'cil-note-add',
      }
    ]
  },

  //////// 
  {
    component: 'CNavTitle',
    name: 'Tài khoản',
  },
  {
    component: 'CNavItem',
    name: 'Tài khoản người dùng',
    to: '/user/list',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Tài khoản',
        to: '/user/list',
        icon: 'cil-note-add',
      }

    ]
  },
  /////////////////////
  {
    component: 'CNavTitle',
    name: 'Nhân viên',
  },
  {
    component: 'CNavItem',
    name: 'Quản lý nhân viên',
    to: '/personnel/priceList',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Giá hóa đơn',
        to: '/personnel/priceList',
        icon: 'cil-note-add',
      },
      {
        component: 'CNavItem',
        name: 'Quản lý Tài khoản',
        to: '/personnel/AccoutUser',
        icon: 'cil-note-add',
      },
      {
        component: 'CNavItem',
        name: 'Quản lý Tài khoản chờ xác thực',
        to: '/personnel/WaitAccout',
        icon: 'cil-note-add',
      },
      {
        component: 'CNavItem',
        name: 'Quản lý Thống kê lương',
        to: '/personnel/StatisticalUser',
        icon: 'cil-note-add',
      }


    ]
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Thông báo',
    to: '/notification/lis',
    icon: 'cil-notes',
    items: [

      {
        component: 'CNavItem',
        name: 'Danh sách thông báo',
        to: '/notification/lis',
        icon: 'cil-note-add',
      },
      {
        component: 'CNavItem',
        name: 'Tạo thông báo',
        to: '/notification/create',
        icon: 'cil-note-add',
      }

    ]
  },




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
