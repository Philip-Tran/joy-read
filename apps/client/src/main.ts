import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(VueQueryPlugin)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(ToastService)

app.mount('#app')
