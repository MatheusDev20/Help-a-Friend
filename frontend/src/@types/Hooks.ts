export interface FetchOptions<T> {
  path: string
  data?: T
}
export interface FetchReturn<T> {
  data: T | null
  loading: boolean
  fetchingError: FetchingError
}
export interface FetchingError {
  msg: string
  err: Error | null
}
