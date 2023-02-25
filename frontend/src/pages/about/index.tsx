import { Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'

export const AboutPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/login')
    }
  })

  return (
        <>
          <Flex h='100vh'>
            <h1>About Page</h1>
        </Flex>
        </>
  )
}
