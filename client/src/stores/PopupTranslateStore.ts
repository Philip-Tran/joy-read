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
    isLoadingAudio: false,
    lang: 'es',
  })

  const getTranslation = async (text: string) => {
    try {
      initialState.value.selectedText = text
      initialState.value.isLoading = true
      const res = await axios.get(`https://lingva.ml/api/v1/${initialState.value.lang}/en/${text}`)

      initialState.value.translatedText = res.data.translation
    } catch (error) {
      console.log('Error translate text:', (error as Error).message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  const fetchAudio = async (): Promise<void> => {
    try {
      initialState.value.isLoadingAudio = true
      const encodedText: string = encodeURIComponent(initialState.value.selectedText)

      const response = await axios.get(
        `https://lingva.ml/api/v1/audio/${initialState.value.lang}/${encodedText}`,
      )

      const audioBlob = new Blob([new Uint8Array(response.data.audio)], { type: 'audio/mpeg' })
      console.log(audioBlob)
      initialState.value.audioUrl = URL.createObjectURL(audioBlob)
      return response.data.audio
    } catch (error) {
      console.error('error', error)
    } finally {
      initialState.value.isLoadingAudio = false
    }
  }

  return {
    initialState,
    getTranslation,
    fetchAudio,
  }
})

export { usePopupTranslateStore }
