import { axiosMainApi } from '@/api/axios.express'

import { defineStore } from 'pinia'
import { type Ref, ref, useId } from 'vue'
import { useUserStore } from './UserStore'

export interface Book {
  title: string
  content: string
  id: string
  createdAt: string
}

interface geAllBookStateType {
  books: Book[]
  message: string
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const useBookGeneralStore = defineStore('book', () => {
  const initialState: Ref<geAllBookStateType> = ref({
    books: [],
    message: '',
    isLoading: false,
    isError: false,
    isSuccess: false,
  })

  const getAllBook = async () => {
    try {
      const userStore = useUserStore()
      const userId = await userStore.getId()
      initialState.value.isLoading = true
      const response = await axiosMainApi.get(`/api/book/${userId}`)
      if (!response) {
        console.log('Error fetching books from database')
      }
      initialState.value.books = response.data.books
      return response.data
    } catch (error) {
      console.log('Error get all books:', (error as Error).message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  const deleteBook = async (bookId: string) => {
    try {
      const res = await axiosMainApi.delete(`/api/book/${bookId}`)
      if (!res) {
        console.log('Internal server error')
      }
      console.log('Delete book successfully, from pinia')
      initialState.value.isSuccess = true
      initialState.value.message = res.data.message

      return { success: true }
    } catch (error) {
      initialState.value.isSuccess = false
      console.log('Error deleteing book:', (error as Error).message)
    } finally {
      initialState.value.isSuccess = false
    }
  }

  return {
    initialState,
    getAllBook,
    deleteBook,
  }
})

export { useBookGeneralStore }
