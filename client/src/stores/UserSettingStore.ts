import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

type UserSettingState = {
  isUsePopup: boolean
  interfaceLanguage: string
  learningLanguage: string
  colorMode: 'light' | 'dark'
}

const useUserSettingStore = defineStore(
  'userSetting',
  () => {
    const state: Ref<UserSettingState> = ref({
      isUsePopup: true,
      interfaceLanguage: 'en',
      learningLanguage: 'es',
      colorMode: 'light',
    })

    const toggleUsePopup = () => {
      state.value.isUsePopup = !state.value.isUsePopup
    }

    const updateSetting = (settings: UserSettingState) => {
      console.log(settings)
      state.value = settings
    }

    return { state, toggleUsePopup, updateSetting }
  },
  {
    persist: true,
  },
)

export { useUserSettingStore }
