import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { supportedLanguages } from '@/lib/AppConfig'

type SupportedLanguage = (typeof supportedLanguages)[number]

export type UserSettingState = {
  isUsePopup: boolean
  interfaceLanguage: string
  learningLanguage: SupportedLanguage
  translateToLanguage: SupportedLanguage
  colorMode: 'light' | 'dark'
  audioPlayer: boolean
}

const useUserSettingStore = defineStore(
  'userSetting',
  () => {
    const state: Ref<UserSettingState> = ref({
      isUsePopup: true,
      interfaceLanguage: 'en',
      learningLanguage: 'es',
      translateToLanguage: 'en',
      colorMode: 'light',
      audioPlayer: true,
    })

    const toggleUsePopup = () => {
      state.value.isUsePopup = !state.value.isUsePopup
    }

    const updateSetting = (settings: UserSettingState) => {
      console.log(settings)
      state.value = settings
      return { success: true }
    }

    const updatePopupState = () => {
      state.value.isUsePopup = !state.value.isUsePopup
    }

    const toggleAudioPlayer = () => {
      state.value.audioPlayer = !state.value.audioPlayer
    }
    return { state, toggleUsePopup, updateSetting, updatePopupState, toggleAudioPlayer }
  },
  {
    persist: true,
  },
)

export { useUserSettingStore }
