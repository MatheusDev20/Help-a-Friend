/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Image,
  Checkbox,
  FormErrorMessage,
  Icon,
  useToast
} from '@chakra-ui/react'

import { Link as DomLink, useNavigate } from 'react-router-dom'
import { HafApi } from '../../services/api/haf_backend'
import { EmailIcon, LockIcon, CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignForm, customLinkStyle } from './styles'
import { Input } from '../../components/Form/Input/index'
import { SignUpData } from '../../interfaces/SignUpData'
import { UploadInput } from '../../components/Form'
import { AiOutlineUpload } from 'react-icons/ai'
import { UserService } from '../../services/api/users'
import { GoBack } from '../../components/GoBack'

export const SignUpPage: React.FC = () => {
  const [avatarFile, setAvatarFile] = useState<File>()
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignUpData>()
  const navigate = useNavigate()
  const toast = useToast()

  const handleUpload = (files: File[]): void => { setAvatarFile(files[0]) }

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        // Ver oq fazer com isso dps.
        petPreference: 'Cachorro'
      }

      const response = await UserService.create(newUser)
      if (avatarFile != null) {
        await UserService.uploadAvatar(avatarFile, {
          email: response.data.email,
          password: newUser.password
        })
      }

      toast({
        status: 'success',
        duration: 5000,
        title: 'Usuario criado',
        description: 'Redirecionando para a página de login',
        isClosable: true,
        position: 'top-right'
      })

      setTimeout(() => {
        navigate('/login')
      }, 5000)
    } catch (err) {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Oops, ocorreu um erro!',
        description: 'Tente novamente',
        isClosable: true,
        position: 'top-right'
      })
    }
  }
  return (
    <>
    <GoBack backTo="/home"/>
    <Stack
      paddingY={6}
      paddingX={12}
      spacing={25}
      direction={{ base: 'column', md: 'row', sm: 'row' }}>
      <Flex p={6} flex='1' justify='center' bg='#1F2029'>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Stack spacing={4}>
            <Flex>
              <Heading color='white' fontWeight='bold' fontSize={'2xl'}>
                Cadastre-se pelo formulário abaixo
              </Heading>
              {/* Futuro Logo/Icone aqui */}
            </Flex>
            <Text fontWeight='bold' fontSize='1rem' color='green.400'>Já possui uma conta?
              <DomLink to="/login" style={customLinkStyle}>
                Entrar
              </DomLink>
            </Text>
          </Stack>

          {/* Formulário */}

          <SignForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              err={errors.name}
              label='Nome' type='text'
              errMsg='Nome é obrigatório'
              icon={<InfoOutlineIcon />}
              placeholder='Nome ou Apelido...'
              {...register('name', {
                required: 'Nome é obrigatório'
              })} />

            <Input
              err={errors.email}
              errMsg={errors.email?.message}
              label='Endereço de Email' type='email'
              icon={<EmailIcon />}
              helperMsg='Não vamos compartilhar seu e-mail com ninguém'
              placeholder='Email válido @dominio.com...'
              {...register('email', {
                required: 'Email é obrigatório'
              })} />

            <Input
              err={errors.emailConfirmation}
              errMsg='Emails devem ser idênticos'
              label='Confirmação do Email' type='email'
              icon={<CheckIcon />}
              placeholder='Confirme seu email...'
              {...register('emailConfirmation', {
                validate: {
                  equal: v => v === getValues('email')
                }
              })} />

            <Input
              err={errors.password}
              errMsg='Senha deve ter no mínimo 8 caracteres'
              helperMsg='Sua senha deve ter no mínimo 8 caractéres'
              label='Senha' type='password'
              icon={<LockIcon />}
              placeholder='Digite sua senha...'
              {...register('password', {
                validate: v => v.length >= 8
              })} />
            <Input
              err={errors.passwordConfirmation}
              errMsg='Senhas devem ser idênticas'
              helperMsg='Sua senha deve ter no mínimo 8 caractéres'
              label='Confirme sua senha' type='password'
              icon={<CheckIcon />}
              placeholder='Confirme sua senha'
              {...register('passwordConfirmation', {
                validate: {
                  equal: v => v === getValues('password')
                }
              })} />

            <UploadInput
              handleUpload={handleUpload}
              multiple={false}
              hasErr={false}
              errMsg='Avatar'>
              <Button variant='contained' bg='blue.400' leftIcon={<Icon as={AiOutlineUpload} />}>
                Imagem de perfil
              </Button>
            </UploadInput>

            <Flex justify='center' align='center' flexDir='column' gap={5}>
              <Text fontWeight='bold' color='blue.400'>Arquivo selecionado</Text>
              <Text fontWeight='bold' color='#02966a'>{avatarFile?.name}</Text>
            </Flex>

            {/* TODO: Começar a validar isso depois */}
            <Stack spacing={6}>
              <Checkbox
                colorScheme='green'
                {...register('termsAndLicense', { required: true })}>
                <Text fontSize='0.9rem' color='blue.600'>Aceito os termos de uso e licença</Text>
                {(errors.termsAndLicense != null) && (<FormErrorMessage>Aceite os termos de uso</FormErrorMessage>)}
              </Checkbox>
              <Button type="submit" colorScheme='green' variant={'solid'}>
                Cadastrar
              </Button>
            </Stack>

          </SignForm>
        </Stack>
      </Flex >
      <Flex flex='1'>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'}
        />
      </Flex>
    </Stack >
    </>
  )
}
