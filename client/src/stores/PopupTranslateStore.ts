import { axiosLingvaApi } from '@/api/axios.lingva'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useUserSettingStore } from './UserSettingStore'

const usePopupTranslateStore = defineStore('popup', () => {
  const settingStore = useUserSettingStore()
  const initialState = ref({
    selectedText: '',
    translatedText: '',
    message: '',
    isLoading: false,
    audioUrl: '',
    isLoadingAudio: false,
    lang: settingStore.state.learningLanguage,
    toLang: settingStore.state.translateToLanguage,
  })

  const getTranslation = async (text: string) => {
    try {
      initialState.value.selectedText = text
      initialState.value.isLoading = true
      const res = await axiosLingvaApi.get(
        `/${initialState.value.lang}/${initialState.value.toLang}/${text}`,
      )

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

      const response = await axiosLingvaApi.get(`/audio/${initialState.value.lang}/${encodedText}`)

      const audioBlob = new Blob([new Uint8Array(response.data.audio)], { type: 'audio/mpeg' })
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
