import { axiosPrivate } from '@/api/axios'
import { useAuthStore } from '@/stores/Auth/AuthStore'
import { useRefreshToken } from '@/hooks/useRefreshToken.js'

import { onMounted, onUnmounted, watch } from 'vue'

const useAxiosPrivate = () => {
  const { refresh } = useRefreshToken()

  let requestInterceptor
  let responseInterceptor

  const setupInterceptors = () => {
    const authStore = useAuthStore() // Access `authStore` inside the function

    // Add request interceptor
    requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Add response interceptor
    responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      },
    )
  }

  const cleanupInterceptors = () => {
    axiosPrivate.interceptors.request.eject(requestInterceptor)
    axiosPrivate.interceptors.response.eject(responseInterceptor)
  }

  // Initialize interceptors on mount and clean up on unmount
  onMounted(() => {
    setupInterceptors() // Initialize interceptors inside lifecycle hook
  })
  onUnmounted(() => {
    cleanupInterceptors() // Clean up interceptors
  })

  // Watch for changes in `authStore.accessToken` and reset interceptors

  // watch(
  //   () => useAuthStore().initialState.accessToken, // Lazily access `authStore`
  //   () => {
  //     cleanupInterceptors()
  //     setupInterceptors()
  //   },
  // )

  return axiosPrivate
}

export default useAxiosPrivate
