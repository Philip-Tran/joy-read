import AddBookPage from '@/pages/AddBook/AddBookPage.vue'
import BooksPage from '@/pages/BookDir/BooksPage.vue'
import HomePage from '@/pages/HomePage.vue'
import SingleBookPage from '@/pages/SingleBook/SingleBookPage.vue'
import UserSettingPage from '@/pages/UserSetting/UserSettingPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
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
