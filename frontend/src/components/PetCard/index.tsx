import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'
import { GiDogBowl } from 'react-icons/gi'
import { HiLocationMarker } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { Pet } from '../../interfaces/pet'
interface PetCardProps {
  pet: Pet
}

export const PetCard = ({ pet }: PetCardProps): JSX.Element => {
  return (
    <Link
    to={`/pet/${pet.name}`}
    state={{
      petId: pet.id
    }}>
      <Box
        cursor='pointer'
        overflow='hidden'
        border='1px solid #fff'
        display='flex'
        _hover={{ border: '1px solid #02966a' }
        }
        height={{ base: '18rem', md: '20rem' }}
        style={{ transition: '0.3s' }}
        flexDir='column'
        borderRadius='0.3rem'
        background='#1F2029'
        // onClick={openPetInfo}
      >
        {/* Renderiza a primeira imagem do Pet */}
        <Box overflow='hidden' height='80%'>
        <Image
          src={
            JSON.parse(pet.pet_photos)[0].url
          }
          height='100%'
          width='100%'
          alt={pet.name}
          roundedTop="lg"
        />
        </Box>
      {/* DOG INFORMATION */}
      <Flex
        mt='1rem'
        display='flex'
        flexDir='column'
        align='flex-start'
        paddingLeft={3}
        gap='0.3rem'
      >
        <Flex
          gap='0.7rem'
          align='center'
        >
          <GiDogBowl color='#02966a' />
          <Text
            color='orange.500'
            fontSize={{ base: '0.8rem', md: 'md' }}
            fontWeight='bold'>
            {pet.name}
          </Text>
        </Flex>
        <Flex
          gap='0.7rem'
          align='center'
          mb='1rem'
        >
          <HiLocationMarker color='#02966a' />
          <Text fontWeight='bold' fontSize='smaller' >{pet.pet_location}</Text>
        </Flex>
      </Flex>
    </Box >
    </Link>
  )
}
