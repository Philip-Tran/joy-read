import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed queries once
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    },
  },
})

import '@/assets/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(VueCalendarHeatmap)
app.use(ToastService)
app.use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })

app.mount('#app')
