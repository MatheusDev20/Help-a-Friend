import React from 'react'
import { PetsList } from '../../components/PetList'
import { SharePetButton } from '../../components/SharePetButton'
import { Flex } from '@chakra-ui/react'

export const Home: React.FC = () => {
  return (
    <>
    <Flex flexDir='column' gap='3rem' position='relative' minH='100vh'>
      <PetsList />
      <SharePetButton/>
    </Flex>
    </>
  )
}
