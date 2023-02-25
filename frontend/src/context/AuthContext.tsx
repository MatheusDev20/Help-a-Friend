/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createContext, ReactNode, useState, useContext } from 'react'
import { LoginData, ApplicationUser } from '../interfaces'
import { HafApi } from '../services/api/haf_backend'
import { useNavigate } from 'react-router-dom'
import { getFromLocalStorage } from '../utils/localStorage'
import { useToast } from '@chakra-ui/react'
import { UserService } from '../services/api/users'
import { AuthContextType, User } from '../@types/AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext <AuthContextType | null>(null)

function AuthProvider ({ children }: AuthProviderProps): JSX.Element {
  const toast = useToast()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(() => {
    const currUser = getFromLocalStorage('currentUser', null)
    if (currUser) {
      return currUser as User
    }
    return null
  })

  const [token, setToken] = useState<string | null>(() => {
    const token = getFromLocalStorage('token', null)
    if (token) {
      HafApi.defaults.headers.common.Authorization = `Bearer ${token}`
      return token
    }

    return null
  })

  async function signIn ({ email, password }: LoginData): Promise<void> {
    try {
      const response = await UserService.logIn({ email, password })

      const authUser: ApplicationUser = response.data.authUser
      const jwtToken: string = response.data.token

      localStorage.setItem('currentUser', JSON.stringify(response.data.authUser))
      localStorage.setItem('isAuth', JSON.stringify('true'))
      localStorage.setItem('token', JSON.stringify(jwtToken))

      HafApi.defaults.headers.common.Authorization = 'Bearer ' + jwtToken

      setUser(authUser)
      setToken(jwtToken)

      navigate('/home')
    } catch (err) {
      toast({
        title: 'Não foi possível realizar o Login',
        description: 'Verifique suas credenciais e tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  function signOut (): void {
    try {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('isAuth')
      localStorage.removeItem('token')
      window.location.reload()
      toast({
        title: 'Deslogado',
        description: 'Deslogado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth (): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Use Context must be used within Auth provider')
  }
  return context
}
export { AuthProvider, useAuth }
