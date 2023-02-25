import { Button, Flex } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import React, { ReactSVG } from 'react'

interface PaginationProps {
  handleNext: (e: React.SyntheticEvent) => void
  handlePrev: (e: React.SyntheticEvent) => void
  currentPage: number
  currentLen: number
}

export const Pagination = ({ handleNext, handlePrev, currentPage, currentLen }: PaginationProps) => {
  return (
    <Flex
      justify='center'
      gap='5rem'
    >
      {currentPage !== 1 &&
        <Button
          variant='link'
          color='#02966a'
          size='sm'
          _hover={{ color: '#15a97d' }}
          onClick={handlePrev}
        >
          <ArrowBackIcon mr='0.5rem' />
          Anterior
        </Button>

      }
      {currentLen === 10 && (
        <Button
          color='white'
          variant='link'
          size='sm'
          onClick={handleNext}
          _hover={{ color: '#15a97d' }}
        >
          Próxima
          <ArrowForwardIcon ml='0.5rem' />
        </Button>
      )}
    </Flex>
  )
}
