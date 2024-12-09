import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const usePopupTranslateStore = defineStore('popup', () => {
  const initialState = ref({
    selectedText: '',
    translatedText: '',
    message: '',
    isLoading: false,
    audioUrl: '',
  })

  const getTranslation = async (text: string) => {
    try {
      initialState.value.selectedText = text
      initialState.value.isLoading = true
      const res = await axios.get(`https://lingva.ml/api/v1/es/en/${text}`)

      initialState.value.translatedText = res.data.translation
    } catch (error) {
      console.log('Error translate text:', (error as Error).message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  return {
    initialState,
    getTranslation,
  }
})

export { usePopupTranslateStore }
