/* eslint-disable multiline-ternary */
import { Box, Button, Container, Flex, Heading, Image, SimpleGrid, Stack, Text, transition, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Pet } from '../../interfaces/pet'
import { GoLocation } from 'react-icons/go'
import { BsFillPersonFill } from 'react-icons/bs'
import { GoBack } from '../../components/GoBack'
import { getPetInfo } from '../../services/api/pets'
import { parsePetImg } from '../../utils/utils'
import { formatDate } from '../../utils/dates'

interface CustomError {
  msg: string
}

export const PetInfo: React.FC = () => {
  const { state } = useLocation()
  const [pet, setPet] = useState<Pet | null>(null)
  const [error, setError] = useState<CustomError>({
    msg: ''
  })
  const [selectedImgUrl, setSelectedImgUrl] = useState<string>('')
  useEffect(() => {
    const fetchPetInformation = async (petId: string): Promise<Pet> => {
      try {
        const petInfo = await getPetInfo(petId)
        return petInfo
      } catch (err: any) {
        setError({ msg: 'Deu esse erro aqui' })
        throw new Error('AOF')
      }
    }

    fetchPetInformation(state.petId).then((petInfo) => {
      console.log(petInfo)
      if (petInfo) setPet(petInfo)
      setSelectedImgUrl(
        parsePetImg(petInfo)
      )
    }).catch((err) => {
      console.error(err)
    })
  }, [])
  return (
        <>
        <GoBack backTo="/home"/>
        <Flex
        justifyContent='space-between'
        gap={{ base: '5rem', xl: '1rem', '2xl': '10rem' }}
        flexDir='column' >
        {
            (pet != null) ? (
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
                overflow='hidden'>
                <Stack>
                    <Image
                        rounded={'md'}
                        cursor='pointer'
                        alt={`pet_${pet?.name}`}
                        src={selectedImgUrl}
                        fit={'cover'}
                        _hover={{
                          border: '0.7px solid #15a97d'
                        }}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Stack>
                { JSON.parse(pet.pet_photos).length > 1 && (
                    <>
                     <Text fontWeight='bold' fontSize='2xl'>Mais fotos do Pet</Text>
                     {/* Bottom pet photos */}
                     <SimpleGrid
                        padding={1}
                        templateColumns={{ base: 'repeat(3,1fr)', md: 'repeat(5,1fr)' }}>
                         {
                             JSON.parse(pet.pet_photos).length > 1
                               ? (
                                   JSON.parse(pet.pet_photos).map((photo: any) => (
                                     <Image
                                         _hover={{
                                           border: '0.7px solid #15a97d'
                                         }}
                                         onClick={() => { setSelectedImgUrl(photo.url) }}
                                         cursor='pointer'
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
                <Heading cursor='pointer' alignSelf='center' color='#02966a'>{pet.name}</Heading>
                {/* Location and Publish By */}
                <Stack direction='column' spacing={35}>
                <Flex gap={5}>
                    <GoLocation size={20} color='#02966a' />
                    <Text color='orange.500'>{pet.pet_location}</Text>
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
                        Em <Text>{formatDate(pet.createdAt, 'pt-Br')}</Text>
                    </Stack>
                </Flex>
                </Stack>
                {/* History */}
                <VStack spacing={25}>
                    <Text fontSize='2xl'>A história de {pet.name}</Text>
                    <Box padding={15} border='0.2px solid #02966a' background='#1F2029' boxShadow='lg'>
                    <Text fontWeight='bold' fontFamily='heading' fontSize={{ base: '0.8rem', md: 'md' }}>
                        CONTATE MARINES 11 907241507 Sou o Thor tenho 1 aninho , estou vermifugado e vacinado , sou muito bonzinho e gosto MUITO de crianças e pessoas !!! Sou companheiro!Somente para apartamento. Estou procurando um lar , contate Marines 11 997241507. Estou em São Paulo Capital
                    </Text>
                    </Box>
                </VStack>
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
            )
              : (
        <Stack display='flex' h='100vh'>
            <h1>Erro ao carregar informações do animal</h1>
        </Stack>
                )
    }
        </Flex>
        </>
  )
}
