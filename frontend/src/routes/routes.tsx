import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/login/'
import { SignUpPage } from '../pages/signup'
import { RegisterPetPage } from '../pages/registerPet'
import { Home } from '../pages/home/'
import { PetInfo } from '../pages/petInfo'
import { AboutPage } from '../pages/about'

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path='/criar-usuario' element={<SignUpPage />} />

      <Route path='/cadastrar-pet' element={<RegisterPetPage />} />

      <Route path='/home' element={<Home />} />

      <Route path='/about' element={<AboutPage />} />

      <Route path='/pet/:name' element={<PetInfo />} />

    </Routes >
  )
}
