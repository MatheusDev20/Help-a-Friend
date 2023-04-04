import { AxiosResponse } from 'axios'
import { RegisterUser, LoginData } from '../../interfaces'
import { HafApi } from './haf_backend'
import { ForgotPasswordForm } from '../../interfaces/ForgotPasswordData'

export const UserService = {

  async uploadAvatar (file: File, user: any) {
    const response = await HafApi.post('/api/login', {
      email: user.email,
      password: user.password
    })

    const formData = new FormData()
    formData.append('avatar', file)

    await HafApi.post('/api/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${String(response.data.token)}`
      }
    })
  },

  async create (newUser: RegisterUser) {
    const res = await HafApi.post('/api/signup', newUser)
    return res.data
  },

  async logIn (authData: LoginData): Promise<AxiosResponse> {
    const { email, password } = authData
    const res = await HafApi.post('/api/login', {
      email,
      password
    },
    { headers: { 'Content-Type': 'application/json' } }
    )
    return res
  },

  async forgotPassword (data: ForgotPasswordForm): Promise<AxiosResponse> {
    const { email } = data
    const res = await HafApi.post(`/api/forgot-password?email=${email}`)
    return res
  }
}
