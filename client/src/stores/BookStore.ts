import { useUserStore } from './UserStore'

import { axiosMainApi } from '@/api/axios.express'
import { axiosDjango } from '@/api/axios.django'
import { readingTime } from 'reading-time-estimator'

import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

interface Book {
  title: string
  content: string
  audioUrlOnl?: string
  id: string
}

interface AddBookState {
  book: Book
  message: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  stats: {
    words: number | null
    minutes: number | null
    text: string | null
    readingSpeed: number
  }
}

export type { Book }

const useAddBookStore = defineStore('addBook', () => {
  const initialState: Ref<AddBookState> = ref({
    book: {
      title: '',
      content: '',
      audioUrlOnl: undefined,
      id: '',
    },
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    stats: {
      words: null,
      minutes: null,
      text: '',
      readingSpeed: 200,
    },
  })

  const resetState = () => {
    initialState.value = {
      book: {
        title: '',
        content: '',
        audioUrlOnl: undefined,
        id: '',
      },
      message: '',
      isLoading: false,
      isSuccess: false,
      isError: false,
      stats: {
        words: null,
        minutes: null,
        text: '',
        readingSpeed: 200,
      },
    }
  }

  const addBook = async (book: Book) => {
    try {
      const userStore = useUserStore()
      const userId = await userStore.getId()
      console.log(userId)

      const response = await axiosMainApi.post('/api/book/create', { ...book, userId })
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

  const addBookDirectFromStore = async () => {
    try {
      const userStore = useUserStore()
      const userId = await userStore.getId()
      const book = initialState.value.book
      initialState.value.isLoading = true
      const response = await axiosMainApi.post('/api/book/create', { ...book, userId })
      if (!response) {
        initialState.value.isError = true
        initialState.value.message = 'Error occur when creating book'
      }

      initialState.value.book.content = response.data.book.content
      initialState.value.book.title = response.data.book.title
      initialState.value.message = response.data.message
      initialState.value.book.id = response.data.book.id

      return { success: true, bookId: response.data.book.id }
    } catch (error: unknown) {
      console.error('Error add book from pinia store:', (error as Error).message)
      initialState.value.message = 'Error occur when creating book'
    }
  }

  const getTranscriptFromYoutube = async (values: { videoLink: string; lang: string }) => {
    try {
      const response = await axiosDjango.post('/api/get-transcript/', values)
      if (response.data && response.data.transcript) {
        initialState.value.book.content = response.data.transcript
          .map((item: { text: string }) => item.text)
          .join(' ')
      }
    } catch (error: unknown) {
      console.log('Error', (error as Error).message)
    }
  }

  const getTextFromWeb = async (values: { webUrl: string }) => {
    try {
      const response = await axiosMainApi.post('/api/book/get-web-text', values)
      if (response.data && response.data.content) {
        initialState.value.book.content = response.data.content
        initialState.value.book.title = response.data.title
        initialState.value.stats.words = response.data.wordCount
      }
    } catch (error: unknown) {
      console.log('Error', (error as Error).message)
    }
  }

  const updateBook = (values: Book) => {
    initialState.value.book.title = values.title ?? ''
    initialState.value.book.content = values.content ?? ''
    initialState.value.book.audioUrlOnl = values.audioUrlOnl ?? ''
  }

  const getReadingTimeStat = (content: string) => {
    const result = readingTime(content, initialState.value.stats?.readingSpeed, 'es')
    initialState.value.stats.minutes = result.minutes
    initialState.value.stats.words = result.words
    initialState.value.stats.text = result.text
  }

  const getPdfText = async (formData: FormData) => {
    try {
      const response = await axiosMainApi.post('/api/book/get-pdf-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('axios works, from store')
      console.log(response.data.trim())
      if (response.data) {
        initialState.value.message = 'Extract text from PDF successfully'
      }
      initialState.value.book.content = response.data.trim()
    } catch (error) {
      console.error('Error getting text from pdf file:', (error as Error).message)
      alert('Failed to extract text. Please check the server logs.')
    } finally {
      initialState.value.isLoading = false
    }
  }

  return {
    initialState,
    addBook,
    updateBook,
    getTranscriptFromYoutube,
    getPdfText,
    getTextFromWeb,
    addBookDirectFromStore,
    getReadingTimeStat,
    resetState,
  }
})

export { useAddBookStore }
