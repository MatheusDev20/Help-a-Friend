
import { Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { CustomOptions } from '../CustomOptions'
import { Select } from '../Form/Select'

export interface SearchFormProps {
  handleFilter: any
}
export const SearchForm = ({ handleFilter }: SearchFormProps): JSX.Element => {
  const [gender, setGender] = useState<string>('')
  const [specie, setSpecie] = useState<string>('')
  const [size, setSize] = useState<string>('')

  return (
    <Flex
      mt='3rem'
      flexDir='column'
      gap='2rem'
      paddingX={16}
    >
      <Text
        fontWeight='bold'
        fontSize={{ base: '1.3rem', sm: '2xl', md: '3xl' }}
      >
      Encontre um novo amigo
      </Text>

      <Flex
        borderRadius='20px'
        bg='#1F2029'
        gap='1rem'
        flexDir='column'
        padding={5}
      >
        <Flex
          gap='3rem'
          flexDir={{ base: 'column', md: 'row' }}>
          <Select
            fontWeight='bold'
            size={{ base: 'md', md: 'lg' }}
            onChange={(e) => { setSpecie(e.target.value) }}
            placeholder='Todas as espécies...'>
            <CustomOptions value='Cachorro'>Cachorros</CustomOptions>
            <CustomOptions value='Gato'>Gatos</CustomOptions>
          </Select>
          <Select
            fontWeight='bold'
            size={{ base: 'md', md: 'lg' }}
            onChange={(e) => { setGender(e.target.value) }}
            placeholder='Todos as os sexos...'>
            <CustomOptions value='M'>Macho</CustomOptions>
            <CustomOptions value='F'>Fêmea</CustomOptions>
          </Select>
          <Select
            fontWeight='bold'
            onChange={(e) => { setSize(e.target.value) }}
            size={{ base: 'md', md: 'lg' }}
            placeholder='Todos as os portes...'>
            <CustomOptions value='Pequeno'>Porte Pequeno</CustomOptions>
            <CustomOptions value='Médio'>Porte Médio</CustomOptions>
            <CustomOptions value='Grande'>Porte Grande</CustomOptions>
          </Select>
        </Flex>
        <Button
          variant='contained'
          bg='#02966a'
          width={{ base: '70%', md: '20%' }}
          color='#fff'
          fontWeight='bold'
          onClick={(e) => handleFilter(size, gender, specie)}
          _hover={{ bg: '#15a97d' }}
          alignSelf='center'
        >
          Buscar
        </Button>
      </Flex>

    </Flex>
  )
}
