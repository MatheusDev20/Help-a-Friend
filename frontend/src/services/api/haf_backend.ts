import axios, { AxiosInstance } from 'axios'

const getAxiosInstace = (): AxiosInstance => {
  const url: string = import.meta.env.DEV ? import.meta.env.VITE_URL_DEV : import.meta.env.VITE_URL_PROD
  return axios.create({
    baseURL: url
  })
}

export const HafApi = getAxiosInstace()
