import { useUserStore } from '@/stores/UserStore'

import AddBookPage from '@/pages/AddBook/AddBookPage.vue'
import BooksPage from '@/pages/BookDir/BooksPage.vue'
import HomePage from '@/pages/HomePage.vue'
import SingleBookPage from '@/pages/SingleBook/SingleBookPage.vue'
import UserSettingPage from '@/pages/UserSetting/UserSettingPage.vue'
import LoginPage from '@/pages/Auth/LoginPage.vue'
import SignUpPage from '@/pages/Auth/SignUpPage.vue'
import LandingPage from '@/pages/LandingPage/LandingPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      meta: { requiresAuth: false },
      component: LandingPage,
    },
    {
      path: '/app',
      name: 'app',
      meta: { requiresAuth: true },
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: LoginPage,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      meta: { requiresAuth: false },
      component: SignUpPage,
    },
    {
      path: '/books',
      name: 'books',
      meta: { requiresAuth: true },
      component: BooksPage,
    },
    {
      path: '/books/create',
      name: 'createBooks',
      meta: { requiresAuth: true },
      component: AddBookPage,
    },
    {
      path: '/books/:bookId',
      name: 'singleBook',
      meta: { requiresAuth: true },
      component: SingleBookPage,
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { requiresAuth: true },
      component: UserSettingPage,
    },
  ],
})

router.beforeEach(async (to, from) => {
  const { isLoggedIn } = useUserStore()
  const authenticated = await isLoggedIn()
  if (authenticated && to.name == 'login' && from.meta.requiresAuth == true) {
    return { name: 'landing-page' }
  }

  if (!authenticated && to.meta.requiresAuth == true) {
    console.log('Not authenticated')
    return { name: 'login' }
  }
})

export default router
