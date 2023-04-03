/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  Flex, Text,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Stack,
  Heading
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ForgotPasswordForm } from '../../interfaces/ForgotPasswordData'
import * as S from './styles'

export const ForgotPassword = (): JSX.Element => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordForm>()

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    console.log(data)
    // Do stuff with data.email
  }
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
                Enviar
            </Button>
          </S.ForgotForm>
      </Stack>
    </Flex>
  )
}
