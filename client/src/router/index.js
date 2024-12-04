import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Test2View from '@/views/Test2View.vue'
import AudioView from '@/views/AudioView.vue'
import EditorView from '@/views/EditorView.vue'
import ListingView from '@/views/ListingView.vue'
import SignUpPage from '@/Pages/SignUpPage.vue'
import TestPdf from '@/views/TestPdf.vue'
import TestPdf2 from '@/views/TestPdf2.vue'
import LoginPage2 from '@/Pages/Auth/Login/LoginPage2.vue'
import LoginPage from '@/Pages/LoginPage.vue'
import TestPyApi from '@/views/TestPyApi.vue'
import TestPdfServer from '@/views/TestPdfServer.vue'
import SingleBook from '@/Pages/Book/SingleBook.vue'
import TableView from '@/views/TableView.vue'
import PastImageInput from '@/views/PastImageInput.vue'
import Calender from '@/views/Calender.vue'
import TestReader from '@/views/TestReader.vue'
import TestGetYoutube from '@/views/TestGetYoutube.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reader',
      name: 'reader',
      component: TestReader,
    },
    {
      path: '/youtube',
      name: 'youtube',
      component: TestGetYoutube,
    },
    {
      path: '/paste',
      name: 'paste',
      component: PastImageInput,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calender,
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: SingleBook,
    },
    {
      path: '/test-pdf',
      name: 'testPdf',
      component: TestPdf,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: TestPdfServer,
    },
    {
      path: '/test-pdf-2',
      name: 'testPdfs',
      component: TestPdf2,
    },
    {
      path: '/test-py',
      name: 'testPy',
      component: TestPyApi,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/login-2',
      name: 'login2',
      component: LoginPage2,
    },
    {
      path: '/sign-up',
      name: 'sign up',
      component: SignUpPage,
    },
    {
      path: '/listing',
      name: 'listing',
      component: ListingView,
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
    },
    {
      path: '/test-2',
      name: 'test2',
      component: Test2View,
    },
    {
      path: '/audio',
      name: 'audio',
      component: AudioView,
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue'),
    },
  ],
})

export default router
