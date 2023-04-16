
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AppRoutes } from './routes/routes'

export const App = (): JSX.Element => {
  return (
    <>
    <Header />
    <AppRoutes />
    </>
  )
}
