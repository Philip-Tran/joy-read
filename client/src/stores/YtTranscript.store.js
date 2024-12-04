import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const useTranscriptStore = defineStore('transcript', () => {
  const sendValue = ref({
    videoLink: '',
    lang: '',
  })

  const book = ref({
    title: '',
    content: '',
    resMessage: '',
  })

  const updateTextContent = (textToUpdate) => {
    sendValue.value.videoLink = textToUpdate
  }

  const handleGetTranscriptFormSubmit = async (values) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/get-transcript/', values)
      if (response.data && response.data.transcript) {
        book.value.content = response.data.transcript.map((item) => item.text).join(' ')
        book.value.title = response.data.title
      } else {
        console.log('Error: No transcript data received')
      }
    } catch (error) {
      console.log('Error', error.message)
    }
  }

  const handleTranscriptFormSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8008/api/book/create', values)
      if (response) book.value.resMessage = response.data.message
    } catch (error) {
      console.log('Error', error.message)
    }
  }
  return {
    sendValue,
    book,
    updateTextContent,
    handleGetTranscriptFormSubmit,
    handleTranscriptFormSubmit,
  }
})

export { useTranscriptStore }
