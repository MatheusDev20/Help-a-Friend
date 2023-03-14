import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/Login'
import { SignUpPage } from '../pages/Signup'
import { RegisterPetPage } from '../pages/RegisterPet'
import { Home } from '../pages/home/'
import { PetInfo } from '../pages/PetInfo'
import { AboutPage } from '../pages/about'
import { ForgotPassword } from '../pages/ForgotPassword'

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path='/criar-usuario' element={<SignUpPage />} />

      <Route path='/recuperar-senha' element={<ForgotPassword />} />

      <Route path='/cadastrar-pet' element={<RegisterPetPage />} />

      <Route path='/home' element={<Home />} />

      <Route path='/about' element={<AboutPage />} />

      <Route path='/pet/:name' element={<PetInfo />} />

    </Routes >
  )
}
