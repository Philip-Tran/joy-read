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
      path: '/home',
      name: 'home-landingpage',
      component: LandingPage,
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpPage,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksPage,
    },
    {
      path: '/books/create',
      name: 'createBooks',
      component: AddBookPage,
    },
    {
      path: '/books/:bookId',
      name: 'singleBook',
      component: SingleBookPage,
    },
    {
      path: '/settings',
      name: 'settings',
      component: UserSettingPage,
    },
  ],
})

export default router
