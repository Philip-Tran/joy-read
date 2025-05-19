import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'https://joyread-quyet-api.vercel.app/'

export const axiosMainApi = axios.create({
  baseURL: BASE_URL,
})
