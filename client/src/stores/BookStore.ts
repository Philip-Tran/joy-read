import { ref, type Ref } from 'vue'
import { axiosMainApi } from '@/api/axios.express.ts'

import { defineStore } from 'pinia'

interface Book {
  title: string
  content: string
  audioUrlOnl?: string
}

interface AddBookState {
  book: Book
  message: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export type { Book }

const useAddBookStore = defineStore('addBook', () => {
  const initialState: Ref<AddBookState> = ref({
    book: {
      title: '',
      content: '',
      audioUrlOnl: undefined,
    },
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
  })

  const addBook = async (book: Book) => {
    try {
      const response = await axiosMainApi.post('/api/book/create', book)
      console.log('Post book')
      if (!response) {
        initialState.value.message = 'Error creating book'
      }

      initialState.value.book.title = response.data.book.title
      initialState.value.book.content = response.data.book.content

      if (response.data.book.audioUrlOnl) {
        initialState.value.book.audioUrlOnl = response.data.book.audioUrlOnl
      }
      console.log(response.data)
    } catch (error: unknown) {
      console.error((error as Error).message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  const updateBook = (values: Book) => {
    initialState.value.book.title = values.title ?? ''
    initialState.value.book.content = values.content ?? ''
    initialState.value.book.audioUrlOnl = values.audioUrlOnl ?? ''
  }

  return { initialState, addBook, updateBook }
})

export { useAddBookStore }
