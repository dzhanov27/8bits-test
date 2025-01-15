import { useState, useEffect } from 'react'
import { fetchData } from '../utils/api'

interface UseFetchDataOptions {
  url: string
  interval?: number
}

export const useFetchData = <T>({ url, interval }: UseFetchDataOptions) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true)
        const result = await fetchData<T>(url)
        setData(result)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    if (!interval) {
      fetchDataAsync()
      return
    }

    fetchDataAsync()

    const intervalId = setInterval(fetchDataAsync, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [url, interval])

  return { data, isLoading, error }
}
