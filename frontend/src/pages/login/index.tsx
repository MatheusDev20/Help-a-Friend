/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Flex, Image, Stack, Box, Text, Link, CircularProgress } from '@chakra-ui/react'
import { Input } from '../../components/Form/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginData } from '../../interfaces'
import { Link as RedirectLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()
  const { signIn, user } = useAuth()

  const onSubmitLoginForm: SubmitHandler<LoginData> = async (data: LoginData): Promise<void> => {
    const incomeLoginRequestData = {
      email: data.email,
      password: data.password
    }
    console.log('??')
    // TODO: Criar interação em tela para mensagem de Erro
    setLoading(true)
    await signIn(incomeLoginRequestData)
    setLoading(false)
  }
  console.log(errors)
  return (
    <Flex
    flexDir='column'
    minHeight='100vh'
    justifyContent='space-between'
    gap={{ base: '5rem', xl: '3rem', '2xl': '18.5rem' }}
    // gap='18rem'
    >

    <Flex
      bg='#181B23'
      marginTop={{ base: '1rem', md: '3rem' }}
      align='center'
      justify='center'
      direction='column'
      gap='2rem'
    >
      {/* Login Header */}
      <Box display='flex' alignItems='center' cursor='pointer'>
        <Text
          color='#fff'
          fontSize='3xl'
          fontWeight='bold'
          letterSpacing='tight'
          fontStyle='italic'
          w='48'
          mt='1rem'
          mr='1rem'>
          Help a Friend
        </Text>
        <Image
          src='http://www.aspaan.org.br/site2016/wp-content/uploads/2016/01/dog56-1.png'
          alt='Help a Friend'
          w='4rem' />
      </Box>

      <Flex
        as='form'
        width='100%'
        onSubmit={handleSubmit(onSubmitLoginForm)}
        maxW='360px'
        bg='#1F2029'
        p='8'
        borderRadius='8'
        flexDir='column'
      >
        <Stack spacing='4'>
          <Input
            err={errors.email}
            errMsg={errors.email?.message}
            label='E-Mail'
            type='email'
            placeholder='Digite seu email...'
            {...register('email', { required: 'Email é obrigatório' })}
          />
          <Input
            err={errors.password}
            errMsg="Sua Senha deve ter no mínimo 8 dígitos"
            label='Senha' type='password'
            placeholder='Digite sua senha...'
            {...register('password', {
              validate: v => v.length >= 8
            })} />
        </Stack>
        <Stack spacing='6'>
          <Button
            type='submit'
            mt='6'
            bg='#02966a'
            _hover={{ bgColor: '#15a97d' }}
            size='lg'>
            Entrar
          </Button>

          {loading && <CircularProgress
            alignSelf='center'
            isIndeterminate
            value={30}
            color='#02966a'
            size='2.5rem' />
          }

          <Box display='flex' gap='1rem'>
            <Text fontSize='sm' color='#02966a'>Não possui uma conta?</Text>
            <RedirectLink to='/criar-usuario'>
              <Link
                as='span'
                fontSize='sm'
                fontWeight='bold'
                textDecor='none'
                color='blue.400'>
                Criar
              </Link>
            </RedirectLink>
          </Box>

        </Stack>
      </Flex>
    </Flex>
    </Flex>
  )
}
