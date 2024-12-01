import { useAuthStore } from '@/stores/Auth/AuthStore.js' // Adjust import as needed
import axios from '@/api/axios.js'

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const authStore = useAuthStore()
      const response = await axios.get('/refresh', { withCredentials: true })
      authStore.setAuth({ accessToken: response.data.accessToken })

      //
      console.log(response.data.accessToken)
      return response.data.accessToken
    } catch (err) {
      console.error('Error refreshing token:', err.message)
      throw new Error('Unable to refresh token')
    }
  }

  return { refresh }
}

export { useRefreshToken }
