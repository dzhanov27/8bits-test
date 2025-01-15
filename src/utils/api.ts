import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 3000
  },
  retryCondition: (error) => {
    return error.response?.status === 429
  }
})

export const fetchData = async <T>(url: string): Promise<T> => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  try {
    const response = await axios(`${baseUrl}${url}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.status} ${error.message}`)
    }
    throw new Error('Unexpected Error')
  }
}
