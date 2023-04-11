
import React, { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Stack,
  Image,
  Checkbox,
  Icon,
  Text,
  useToast,
  CircularProgress
} from '@chakra-ui/react'

import axios from 'axios'
import { createPet, uploadImages } from '../../services/api/pets'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from './styles'
import { RegisterPetData } from '../../interfaces/RegisterPetData'
import { GiSittingDog } from 'react-icons/gi'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { UploadInput, Input, TextArea, Select } from '../../components/Form'
import { AiOutlineUpload } from 'react-icons/ai'
import { IoMdPhotos } from 'react-icons/io'
import { GoBack } from '../../components/GoBack'
import { CustomOptions } from '../../components/CustomOptions'

export const RegisterPetPage: React.FC = () => {
  const [citys, setCitys] = useState([])
  const [uf, setUf] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadErr, setUploadErr] = useState<boolean>(false)

  const navigate = useNavigate()
  const toast = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterPetData>()

  const handleUpload = (files: File[]): void => {
    setFiles(files)
  }

  const onSubmit: SubmitHandler<RegisterPetData> = async (data) => {
    try {
      if (files.length === 0) {
        setUploadErr(true)
        return
      }

      setLoading(true)
      data.uf = uf

      await createPet(data)
      await uploadImages(files, data.name)

      reset()

      setLoading(false)
      navigate('/home')

      toast({
        title: 'Cadastrado com sucesso',
        description: 'Animal cadastrado com sucesso na plataforma',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (err) {
      setLoading(false)
      toast({
        title: 'Ocorreu um erro, tente novamente  ☹️',
        description: 'Não foi possível registrar o animal',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const getUfCitys = (uf: string): void => {
    setUf(uf)
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
      .then((response) => {
        setCitys(response.data)
      })
      .catch((err) => {
        console.log(err, 'Err getting UF Citys')
      })
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
            <Flex justify='center'>
              <Heading color='#02966a' fontWeight='bold' fontSize={'2xl'}>
                Dados do animal
              </Heading>
              {/* Futuro Logo/Icone aqui */}
            </Flex>
          </Stack>

          {/* Formulário */}
          <RegisterForm onSubmit={(e) => handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Input
                err={errors.name}
                errMsg='Nome do animal é obrigatório'
                label='Nome' type='text'
                icon={<MdDriveFileRenameOutline color='#15a97d' />}
                placeholder='Nome ou Apelido do animal...'
                {...register('name', {
                  required: 'Nome é obrigatório'
                })}
              />
              <Select
                label='Tamanho'
                size='lg'
                icon={<GiSittingDog color='#15a97d' />}
                err={errors.size}
                errMsg='Porte do animal é obrigatório'
                placeholder='Tamanho do animal'
                {...register('size', {
                  required: 'Tamanho é obrigatório'
                })}
              >
                <option value='Pequeno'>Pequeno</option>
                <option value='Médio'>Médio</option>
                <option value='Grande'>Grande</option>

              </Select>

              <Select
                label='Gênero'
                size='lg'
                err={errors.gender}
                icon={<BsGenderAmbiguous size={20} color='#15a97d' />}
                errMsg='Gênero do animal é obrigatório'
                placeholder='Genero do animal'
                {...register('gender', {
                  required: 'Tamanho é obrigatório'
                })}
              >
                <option value='M'>Macho</option>
                <option value='F'>Fêmea</option>

              </Select>

              <Stack direction='row' spacing={6}>
                <Select
                  label='Estado'
                  size='lg'
                  err={errors.uf}
                  placeholder='Estado...'
                  errMsg='Localização do animal é obrigatória'
                  onChange={(e) => { getUfCitys(e.target.value) }}
                >
                  <CustomOptions value="AC">Acre</CustomOptions>
                  <CustomOptions value="AL">Alagoas</CustomOptions>
                  <CustomOptions value="AP">Amapá</CustomOptions>
                  <CustomOptions value="AM">Amazonas</CustomOptions>
                  <CustomOptions value="BA">Bahia</CustomOptions>
                  <CustomOptions value="CE">Ceará</CustomOptions>
                  <CustomOptions value="DF">Distrito Federal</CustomOptions>
                  <CustomOptions value="ES">Espírito Santo</CustomOptions>
                  <CustomOptions value="GO">Goiás</CustomOptions>
                  <CustomOptions value="MA">Maranhão</CustomOptions>
                  <CustomOptions value="MT">Mato Grosso</CustomOptions>
                  <CustomOptions value="MS">Mato Grosso do Sul</CustomOptions>
                  <CustomOptions value="MG">Minas Gerais</CustomOptions>
                  <CustomOptions value="PA">Pará</CustomOptions>
                  <CustomOptions value="PB">Paraíba</CustomOptions>
                  <CustomOptions value="PR">Paraná</CustomOptions>
                  <CustomOptions value="PE">Pernambuco</CustomOptions>
                  <CustomOptions value="PI">Piauí</CustomOptions>
                  <CustomOptions value="RJ">Rio de Janeiro</CustomOptions>
                  <CustomOptions value="RN">Rio Grande do Norte</CustomOptions>
                  <CustomOptions value="RS">Rio Grande do Sul</CustomOptions>
                  <CustomOptions value="RO">Rondônia</CustomOptions>
                  <CustomOptions value="RR">Roraima</CustomOptions>
                  <CustomOptions value="SC">Santa Catarina</CustomOptions>
                  <CustomOptions value="SP">São Paulo</CustomOptions>
                  <CustomOptions value="SE">Sergipe</CustomOptions>
                  <CustomOptions value="TO">Tocantins</CustomOptions>
                </Select>

                <Select
                  label='Cidade'
                  size='lg'
                  err={errors.city}
                  placeholder='Cidade...'
                  errMsg='Localização do animal é obrigatória'
                  {...register('city', {
                    required: 'Cidade é obrigatório'
                  })}

                >
                  {citys.map((city: any) => (
                    <CustomOptions key={city.id} value={city.nome}>{city.nome}</CustomOptions>
                  ))}

                </Select>

              </Stack>
              {/* Checkbox */}
              <Stack direction='row' spacing={24}>
                <Checkbox
                  fontWeight='bold'
                  size={{ base: 'sm', md: 'md' }}
                  color='#fff'
                  colorScheme='green'
                  {...register('vaccinated')}

                >
                  Animal é vacinado?
                </Checkbox>

                <Checkbox
                  fontWeight='bold'
                  color='#fff'
                  size={{ base: 'sm', md: 'md' }}
                  colorScheme='green'
                  {...register('castrated')}
                >
                  Animal é castrado?
                </Checkbox>

              </Stack>

              <TextArea
                err={errors.history}
                size='lg'
                placeholder='Conte um pouco da historia do animal'
                errMsg='Por favor preencha o campo'
                {...register('history', {
                  required: 'História é obrigatória'
                })}
              >

              </TextArea>

              <Select
                label='Estou cadastrando um...'
                size='lg'
                err={errors.specie}
                placeholder='Selecione uma espécie'
                errMsg='Campo obrigatório'
                {...register('specie', {
                  required: 'Especie é obrigatório'
                })}

              >
                <CustomOptions value='Cachorro'>Cachorro</CustomOptions>
                <CustomOptions value='Gato'>Gato</CustomOptions>
              </Select>
              {/* Upload Input Area */}

              <UploadInput
                handleUpload={handleUpload}
                multiple
                errMsg="Pelo menos uma foto é necessária"
                hasErr={uploadErr}
              >
                <Button
                variant='contained'
                bg='blue.400'
                _hover={{
                  bg: 'blue.300'
                }}
                leftIcon={<Icon as={AiOutlineUpload} />}>
                  Enviar fotos do animal
                </Button>
              </UploadInput>
              <Flex flexDir='column' align='center' justify='center' gap={3}>
                {files.length > 0 && (<Text fontWeight='bold' color='blue.400'>Fotos selecionadas : {files.length}</Text>)}
                {
                  files.map((file) => (
                    <Flex key={file.lastModified} gap={3}>
                      <IoMdPhotos color='#00CED1' size={20} />
                      <Text
                        color='green.400'
                        fontWeight='bold'
                        fontSize='sm'>{file.name}</Text>
                    </Flex>
                  ))
                }
              </Flex>

              {/* Button Area */}
              <Stack spacing={6}>
                {loading
                  ? <CircularProgress
                  alignSelf='center'
                  isIndeterminate
                  value={30}
                  color='#02966a'
                  size='2.5rem' />
                  : <Button
                    type="submit"
                    bg='#02966a'
                    _hover={{
                      bg: '#15a97d'
                    }}
                    variant={'solid'}>
                    Cadastrar
                  </Button>
                }
              </Stack>
            </Stack>
          </RegisterForm>
        </Stack>

      </Flex >
      <Flex flex='1'>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'}
        />
      </Flex>
    </Stack >
    </>

  )
}
