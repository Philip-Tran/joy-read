import axios from 'axios'
const BASE_URL = 'https://lingva.ml/api/v1/'

export const axiosLingvaApi = axios.create({
  baseURL: BASE_URL,
})
