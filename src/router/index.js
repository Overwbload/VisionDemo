import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/frontend/HomePage.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/frontend/ProductsPage.vue')
      },
      {
        path: 'products/:id',
        component: () => import('../views/frontend/ProductDetail.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/frontend/cartPage.vue')
      },
      {
        path: 'checkOut',
        name: '',
        component: () => import('../views/frontend/checkOut.vue')
      },
      {
        path: 'checkoutSuccess',
        name: '',
        component: () => import('../views/frontend/checkoutSuccess.vue')
      }
    ]
  },
  {
    path: '/backend',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: 'adminProduct',
        name: 'AdminProduct',
        component: () => import('../views/backend/AdminProduct.vue')
      },
      {
        path: 'adminOrder',
        name: 'AdminOrder',
        component: () => import('../views/backend/AdminOrder.vue')
      },
      {
        path: 'adminCoupons',
        name: 'AdminCoupons',
        component: () => import('../views/backend/AdminCoupons.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/frontend/AdminLogin.vue')
  },
  // 404 頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/frontend/404NotFound.vue')
  },
  // 重新導向
  {
    path: '/cart/:pathMatch(.*)*',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/backend/:pathMatch(.*)*',
    redirect: {
      name: 'Dashboard'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.fullPath.match('/cart') || to.fullPath.match('/products')) {
      return {
        top: 0
      }
    }
    return null
  }
})

export default router
