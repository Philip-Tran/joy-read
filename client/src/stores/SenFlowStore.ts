import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { axiosMainApi } from '@/api/axios.express'

interface SenFlowType {
  frontText: string
  backText: string
}

interface senFlowState {
  senFlow: SenFlowType
  bookId: string
  isLoading: boolean
  isSuccess: boolean
  message: string
}

interface GetSenFlowsState {
  senFlows: SenFlowType[]
  isLoading: boolean
  message: string
}

const useSenFlowStore = defineStore('senflow', () => {
  const initialState: Ref<senFlowState> = ref({
    senFlow: {
      frontText: '',
      backText: '',
    },
    bookId: '',
    isLoading: false,
    isSuccess: false,
    message: '',
  })

  const getSenFlowsState: Ref<GetSenFlowsState> = ref({
    senFlows: [],
    isLoading: false,
    message: '',
  })

  const createSenFlow = async (data: SenFlowType, userId: string, bookId: string) => {
    try {
      initialState.value.isLoading = true
      const res = await axiosMainApi.post(`/api/book/${userId}/${bookId}/flow`, data)

      if (!res) {
        initialState.value.isLoading = false
        console.log('Error, no response from the server')
        initialState.value.message = 'Error, no response from the server'
      }

      initialState.value.senFlow = res.data.sen
      initialState.value.isSuccess = true
      initialState.value.message = 'Create new flow successfully'

      return { success: true }
    } catch (error) {
      console.log('Error occur when creating senflow: ', (error as Error).message)
    } finally {
      initialState.value.isLoading = false
    }
  }

  const getSenflows = async (bookId: string, userId: string) => {
    try {
      initialState.value.isLoading = true
      const res = await axiosMainApi.get(`/api/book/${userId}/${bookId}/flow`)

      if (!res) {
        getSenFlowsState.value.isLoading = false
        console.log('Error, no response from the server')
        getSenFlowsState.value.message = 'Error, no response from the server'
      }

      getSenFlowsState.value.senFlows = res.data

      return { success: true }
    } catch (error) {
      console.log('Error occur when creating senflow: ', (error as Error).message)
    } finally {
      getSenFlowsState.value.isLoading = false
    }
  }

  return { initialState, createSenFlow, getSenflows, getSenFlowsState }
})
export { useSenFlowStore }
