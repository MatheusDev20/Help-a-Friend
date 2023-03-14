
import {
  Flex, Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Stack,
  Heading
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { validateEmail } from '../../utils/utils'

interface CustomError {
  msg: string
  hasErr: boolean
}
export const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<CustomError>({ msg: '', hasErr: false })

  const handleResetPassword = (e: any): void => {
    e.preventDefault()
    if (!email) {
      setError({
        msg: 'Email é obrigatório',
        hasErr: true
      })
      return
    }

    if (!validateEmail(email)) {
      setError({
        msg: 'Entre com um email válido',
        hasErr: true
      })
    }
  }
  const { user } = useAuth()
  //   const navigate = useNavigate()
  return (
    <Flex
      minH='100vh'
      paddingY={6}
      paddingX={12}
      justify='center'>
      <Stack
         p={12}
         w={'full'}
         spacing={4}
         maxW={'md'}
         marginTop='5rem'
         maxH={{ base: '360px', md: '420px' }}
         borderRadius='8'
         flexDir='column'
         bg='#1F2029'>

          {/* Title */}
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
             Esqueceu sua senha?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color='#02966a'
            >
            Você receberá instruções para resetar sua senha
          </Text>

          {/* Form to Reset Input */}
          <Flex flexDir='column' as='form' gap={13} >
            <FormControl>
                <Input
                placeholder='Endereço de email...'
                type='email'
                onChange={(e) => { setEmail(e.target.value) }}
                w='100%'
                mt='1rem' />
                {
                  error.hasErr && (
                    <FormHelperText color='red.400'>{error.msg}</FormHelperText>
                  )
                }
            </FormControl>

            <Button
              type='submit'
              mt='6'
              onClick={handleResetPassword}
              bg='#02966a'
              _hover={{ bgColor: '#15a97d' }}
              size={{ base: 'sm', md: 'lg' }}>
                Enviar
            </Button>
          </Flex>
      </Stack>
    </Flex>
  )
}
