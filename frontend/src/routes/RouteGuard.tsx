import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

interface RouteGuardProps {
  children: React.ReactNode
}
export const PrivateRoute: React.FC<RouteGuardProps> = () => {
  let isAuth = false

  const checkAuth = (): boolean => {
    if (localStorage.getItem('token')) {
      isAuth = true
    }

    return isAuth
  }

  useEffect(() => {
    checkAuth()
  }, [])
  // '<Outlet />'  render the Child of element if exists
  return (
    isAuth ? <Outlet /> : <Navigate to='/login' />
  )
}
