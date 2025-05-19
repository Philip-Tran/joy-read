import axios from 'axios'
const BASE_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://127.0.0.1:8000/'

export const axiosDjango = axios.create({
  baseURL: BASE_URL,
})
