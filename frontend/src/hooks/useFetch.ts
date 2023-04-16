
import { useEffect, useState } from 'react'
import { FetchOptions, FetchReturn, FetchingError } from '../@types/Hooks'
import { HafApi } from '../services/api/haf_backend'

function useFetch<T> ({ path }: FetchOptions<T>): FetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchingError, setFetchingError] = useState<FetchingError>({ msg: '', err: null })

  useEffect(() => {
    const fetch = async (): Promise<any> => {
      const response = await HafApi.get(path)
      return response.data
    }

    fetch()
      .then((results) => {
        console.log('Results actually ready', results)
        setData(results)
        setLoading(false)
      })

      .catch((err) => {
        setLoading(false)
        setFetchingError({
          msg: 'Error Querying Data',
          err
        })
      })

      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { data, loading, fetchingError }
}

export { useFetch }
