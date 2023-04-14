/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  Flex, Text,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Stack,
  Heading,
  CircularProgress,
  useToast
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ForgotPasswordForm } from '../../interfaces/ForgotPasswordData'
import * as S from './styles'
import { UserService } from '../../services/api/users'
import { useState } from 'react'

interface GeneralError {
  message: string
  code: number
}

export const ForgotPassword = (): JSX.Element => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordForm>()
  const [generalError, setGeneralError] = useState<GeneralError>()
  const [loading, setLoading] = useState<boolean>(false)
  const [sucessMessage, setSucessMessage] = useState('')

  const toast = useToast()

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      setLoading(true)
      await UserService.forgotPassword(data)
      setSucessMessage('Email enviado com sucesso!')
      setLoading(false)
      toast({
        status: 'success',
        duration: 4000,
        title: 'Email enviado',
        description: 'Cheque sua caixa de emails',
        isClosable: true,
        position: 'top-right'
      })
      reset()
    } catch (err: any) {
      console.error(err.message)
      setGeneralError({ code: 100, message: 'Falha no envio de e-mail!' })
    } finally {
      setLoading(false)
    }
  }
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
          <S.ForgotForm onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Input
                  placeholder='Endereço de email...'
                  type='email'
                  w='100%'
                  mt='1rem'
                  {...register('email', {
                    required: 'Email é obrigatório'
                  })} />
                {
                  errors.email && (
                    <FormHelperText color='red.400'>{errors.email.message}</FormHelperText>
                  )
                }
            </FormControl>

            <Button
              type='submit'
              mt='6'
              bg='#02966a'
              _hover={{ bgColor: '#15a97d' }}
              size={{ base: 'sm', md: 'lg' }}>
                {loading ? <CircularProgress isIndeterminate size={5} /> : 'Enviar'}
            </Button>
          </S.ForgotForm>
          {generalError && <Text align='center' color='red.300'>{generalError.message}</Text>}
          {sucessMessage && <Text align='center' color='green.300'>{sucessMessage}</Text>}
      </Stack>
    </Flex>
  )
}
