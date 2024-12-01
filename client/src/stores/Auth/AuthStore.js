import { defineStore } from 'pinia'
import axios from '@/api/axios.js'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const initialState = ref({
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
    message: '',
  })

  const loginUser = async (userLoginData) => {
    try {
      initialState.value.isLoading = true
      const response = await axios.post('/api/users/login', userLoginData, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response && response.data.message) {
        initialState.value.message = response.data.message
      }
      const token = response.data.accessToken
      console.log('Token:', token)
      console.log('reponse data', response.data)

      if (token) {
        localStorage.setItem('qframe_token', token)
        initialState.value.isSuccess = true
        initialState.value.message = 'Login successfully'
        initialState.value.user = response.data.user
        initialState.value.isLoggedIn = true
      }

      return { success: true, data: response.data }
    } catch (error) {
      console.log('Error login user', error.message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  const registerUser = async (userRegisterData) => {
    try {
      initialState.value.isLoading = true
      const response = await axios.post('/api/users/create', userRegisterData, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response && response.data.message) {
        initialState.value.message = response.data.message
      }
      const token = response.data.accessToken
      console.log('Token:', token)
      console.log('reponse data', response.data)

      if (token) {
        localStorage.setItem('qframe_token', token)
        initialState.value.isSuccess = true
        initialState.value.message = 'Login successfully'
        initialState.value.user = response.data.user
        initialState.value.isLoggedIn = true
      }

      return { success: true, data: response.data }
    } catch (error) {
      console.log('Error registering user', error.message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  const setAuth = (data) => {
    initialState.value.accessToken = data.accessToken
  }

  return { initialState, loginUser, setAuth, registerUser }
})

export { useAuthStore }
