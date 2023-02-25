import { LoginData } from '../interfaces'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  petPreference: string
  admin: boolean
}

export interface AuthContextType {
  signIn: (credentials: LoginData) => Promise<void>
  signOut: () => void
  user: User | null
}
