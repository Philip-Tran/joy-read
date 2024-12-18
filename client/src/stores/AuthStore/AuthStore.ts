import { axiosMainApi } from '@/api/axios.express'
import { supabaseCli } from '@/lib/supabase'
import type { AuthError } from '@supabase/supabase-js'

import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const loginState = ref({
    email: '',
    password: '',
    accessToken: '',
    message: '',
    isLoading: false,
  })
  const signUpState = ref({
    email: '',
    password: '',
    username: '',
    message: '',
    isLoading: false,
  })

  const loginUser = async (userData: { email: string; password: string }) => {
    try {
      loginState.value.isLoading = true
      const res = await axiosMainApi.post('/auth/login', userData)
      if (!res) {
        loginState.value.message = 'Error occur when login. Please try again'
      }

      loginState.value.accessToken = res.data.session
      loginState.value.message = 'Login successfully'
      return
    } catch (error) {
      console.log(error)
    } finally {
      loginState.value.isLoading = true
    }
  }

  const signUpUser = async (userData: { email: string; password: string; username: string }) => {
    console.log(userData)
    try {
      signUpState.value.isLoading = true
      const res = await axiosMainApi.post('/auth/sign-up', userData)
      if (!res) {
        signUpState.value.message = 'Error occur when signing up. Please try again'
      }

      signUpState.value.message = 'Signup successfully'
      return { success: true }
    } catch (error) {
      console.log(error)
    } finally {
      signUpState.value.isLoading = false
    }
  }

  const logInWithOAuth = async (provider: 'google' | 'github' | 'apple', redirectUrl: string) => {
    try {
      const { data, error } = await supabaseCli.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: redirectUrl,
        },
      })
      if (error) throw error
    } catch (error) {
      console.log('Auth Store Login User: ', (error as AuthError).message)
    }
  }

  return { loginState, loginUser, signUpState, signUpUser, logInWithOAuth }
})

export { useAuthStore }
