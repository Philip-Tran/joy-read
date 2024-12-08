import { axiosMainApi } from '@/api/axios.express'

import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

interface Book {
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
}

const useBookGeneralStore = defineStore('book', () => {
  const initialState: Ref<geAllBookStateType> = ref({
    books: [],
    message: '',
    isLoading: false,
    isError: false,
  })

  const getAllBook = async () => {
    try {
      initialState.value.isLoading = true
      const response = await axiosMainApi.get('/api/book/')
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

  return {
    initialState,
    getAllBook,
  }
})

export { useBookGeneralStore }
