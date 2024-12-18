import { supabaseCli } from '@/lib/supabase'
import type { AuthError } from '@supabase/supabase-js'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const state = ref({
    userId: '',
    isLoggedIn: false,
  })

  const getId = async () => {
    try {
      const { data, error } = await supabaseCli.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error.message)
        return null
      }

      const user = data?.user
      return user ? user.id : null
    } catch (err) {
      console.error('Unexpected error:', err)
      return null
    }
  }

  const logOut = async () => {
    try {
      const res = await supabaseCli.auth.signOut()
      if (!res) console.log('Error')

      return { success: true, message: 'Logout successfully' }
    } catch (error) {
      console.error('Auth Error: ', (error as Error).message)
    }
  }

  const isLoggedIn = async () => {
    try {
      const res = await supabaseCli.auth.getUser()
      if (res.data.user) {
        return true
      } else return false
    } catch (error) {
      console.error('Auth Error: ', (error as Error).message)
    }
  }

  return { state, getId, logOut, isLoggedIn }
})
