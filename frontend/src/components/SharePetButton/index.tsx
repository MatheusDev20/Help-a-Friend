import { Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const SharePetButton = (): JSX.Element => {
  const { user } = useAuth()
  return (

    <Flex
      paddingX={16}
      marginTop={12}
      marginBottom={16}
      justify='center'
      width='100%'
    >
      <Button
        variant='contained'
        bg='#02966a'
        size={{ base: 'sm', md: 'lg' }}
        _hover={{ bg: '#15a97d' }}
      >
        <Link to={user ? '/cadastrar-pet' : '/criar-usuario'}>
          <Text
            fontSize={{ base: '0.9rem', md: 'md' }}
          >
            Quero divulgar um animal
          </Text>
        </Link>

      </Button>
    </Flex >
  )
}
