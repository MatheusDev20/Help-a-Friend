/* eslint-disable multiline-ternary */
import { Button, CircularProgress, Flex, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Pet } from '../../interfaces/pet'
import { GoLocation } from 'react-icons/go'
import { BsFillPersonFill } from 'react-icons/bs'
import { GoBack } from '../../components/GoBack'
import { AiTwotoneAlert } from 'react-icons/ai'
import { parsePetImg } from '../../utils/utils'
import { formatDate } from '../../utils/dates'
import { useFetch } from '../../hooks/useFetch'

export const PetInfo: React.FC = () => {
  const { state } = useLocation()
  const [selectedImgUrl, setSelectedImgUrl] = useState<string>('')

  const { data: petData, loading, fetchingError } = useFetch<Pet>({ path: `/api/pet/${String(state.petId)}` })

  useEffect(() => {
    if (petData) setSelectedImgUrl(parsePetImg(petData))
  }, [petData])

  if (fetchingError.err) {
    return (
      <h1>Erro durante a busca do dado {fetchingError.msg}</h1>
    )
  }
  return (
    <>
    <GoBack backTo="/home"/>
      {!loading && petData
        ? <Flex
        minH='100vh'
        justifyContent='space-between'
        gap={{ base: '5rem', xl: '1rem', '2xl': '10rem' }}
        flexDir='column' >
            <Flex flexDir='column' justifyContent='space-between'>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={12}
                px={16}
            >
            <Flex
                flexDir='column'
                gap={5}
                align='center'
                overflow='hidden'>
                <Image
                      rounded={'md'}
                      cursor='pointer'
                      h={{ base: '18.75rem', md: '25rem', lg: '32.5rem' }}
                      w={{ base: '18.75rem', md: '25rem', lg: '32.5rem' }}
                      alt={`pet_${String(petData.name)}`}
                      src={selectedImgUrl}
                      fit={'cover'}
                        _hover={{
                          border: '0.7px solid #15a97d'
                        }}
                />
                { JSON.parse(petData.pet_photos).length > 1 && (
                    <>
                     <Text fontWeight='bold' fontSize='2xl'>Mais fotos do Pet</Text>
                     {/* Bottom pet photos */}
                     <SimpleGrid
                        templateColumns={{ base: 'repeat(3,1fr)', md: 'repeat(5,1fr)' }}>
                         {
                             JSON.parse(petData.pet_photos).length > 1
                               ? (
                                   JSON.parse(petData.pet_photos).map((photo: any) => (
                                     <Image
                                         _hover={{
                                           border: '0.7px solid #15a97d'
                                         }}
                                         onClick={() => { setSelectedImgUrl(photo.url) }}
                                         cursor='pointer'
                                         marginRight='1rem'
                                         rounded={'md'}
                                         boxSize='5rem'
                                         key={photo.imgId}
                                         alt={'detail_photo'}
                                         src={photo.url} />
                                   ))
                                 )
                               : <Text>Sem fotos extras</Text>
                         }
                     </SimpleGrid>
                    </>
                )
            }
            </Flex>
            <Stack direction='column' spacing={25} px={3}>
                <Heading cursor='pointer' alignSelf='center'>{petData.name}</Heading>
                {/* Location and Publish By */}
                <Stack direction='column' spacing={35}>
                <Flex gap={5}>
                    <GoLocation size={20} color='#02966a' />
                    <Text color='orange.500'>{petData.pet_location}</Text>
                </Flex>
                <Flex gap={5}>
                <BsFillPersonFill size={20} color='#02966a' />
                    <Stack direction='row'>
                        <Text fontWeight='bold'>Publicado por </Text>
                        <Link to='#'>
                            <Text
                            _hover={{
                              color: 'orange.400'
                            }}
                            color='orange.500'>Matheus Mazzola</Text>
                        </Link>
                        Em <Text>{formatDate(petData.createdAt, 'pt-Br')}</Text>
                    </Stack>
                </Flex>
                </Stack>
                {/* History */}
                <Flex align='flex-start' justify='flex-start' gap={5}>
                  <AiTwotoneAlert size={20} color='#02966a' />
                    <Text fontWeight='bold' fontFamily='heading' fontSize={{ base: '0.8rem', md: 'md' }} alignSelf='flex-start'>
                          {petData.history}
                    </Text>
                </Flex>
                {/* Action buttons area */}
                <Stack direction={{ base: 'column', md: 'row' }} gap={5} >
                <Button
                    bg='#02966a'
                    _hover={{
                      bg: '#15a97d'
                    }}
                    size='sm'
                    variant={'solid'}>
                    Entrar em contato
                  </Button>
                  <Button
                    bg='yellow.400'
                    _hover={{
                      bg: 'yellow.300'
                    }}
                    fontWeight='bold'
                    size='sm'
                    variant={'solid'}>
                    Informações do doador
                  </Button>
                  <Button
                    bg='blue.400'
                    _hover={{
                      bg: 'blue.300'
                    }}
                    size='sm'
                    variant={'solid'}>
                    Demonstrar interesse
                  </Button>
                </Stack>
            </Stack>
            </SimpleGrid>
            </Flex>
        </Flex>
        : <Flex minH='100vh' justify='center'>
            <CircularProgress marginTop='3rem' isIndeterminate color='#02966a' />
          </Flex>
      }
      </>
  )
}
