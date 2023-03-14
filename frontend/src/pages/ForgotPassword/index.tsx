
import {
  Flex, Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button
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
      h='100vh'
      paddingY={6}
      paddingX={12}
      justify='center'>
      <Flex
         p={12}
         gap={8}
         marginTop='5rem'
         maxH='420px'
         borderRadius='8'
         flexDir='column'
         bg='#1F2029'>

          {/* Title */}
          <Text alignSelf='center' fontSize='4xl'>Resetar Senha</Text>
          <Text color='#15a97d'>Você receberá instruções para resetar sua senha. </Text>

          {/* Form to Reset Input */}
          <Flex flexDir='column' as='form' gap={3}>
            <FormControl>
              <FormLabel>Endereço de Email</FormLabel>
                <Input type='email' onChange={(e) => { setEmail(e.target.value) }} />
                {
                  error.hasErr && (
                    <FormHelperText color='red.400'>{error.msg}</FormHelperText>
                  )
                }
            </FormControl>

            <Button
              type='submit'
              mt='6'
              disabled={email === ''}
              onClick={handleResetPassword}
              bg='#02966a'
              _hover={{ bgColor: '#15a97d' }}
              size='lg'>
                Enviar
            </Button>
          </Flex>
      </Flex>
    </Flex>
  )
}
