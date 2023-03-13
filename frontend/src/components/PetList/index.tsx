import { Button, Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import { Pagination } from '../Pagination'
import { PetCard } from '../PetCard'
import { getPetPage, getPageWithFilters } from '../../services/api/pets'
import { Pet } from '../../interfaces/pet'
import { useState, useEffect } from 'react'
import { SearchForm } from '../PetSearchForm'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { SharePetButton } from '../SharePetButton'

export const PetsList = (): JSX.Element => {
  const [pets, setPets] = useState<Pet[]>([] as Pet[])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState<boolean>(true)

  const handleFilter = async (size: string, gender: string, specie: string): Promise<void> => {
    setLoading(true)
    setTimeout(async () => {
      const fetchNewPage = await getPageWithFilters(String(currentPage), { size, gender, specie })
      setPets(fetchNewPage)
      setLoading(false)
    }, 800)
  }
  useEffect(() => {
    setLoading(false)
    setPets([])
    const fetchData = async (): Promise<Pet[]> => {
      setLoading(true)
      return await getPetPage(String(currentPage))
    }

    fetchData().then((page) => {
      setPets(page)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }, [currentPage])

  const handleNext = (e: React.SyntheticEvent): void => {
    if (pets.length === 0) {
      return
    }
    setCurrentPage(currentPage + 1)
  }
  const handlePrev = (e: React.SyntheticEvent): void => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <SearchForm handleFilter={handleFilter} />
      {
        loading && (
          <Flex
            justify='center'
            padding={16}>
            <Spinner size='xl'
              color="#02966a" />
          </Flex>
        )
      }
      {(pets.length > 0) && !loading
        ? <Flex
          flexDirection='column'
          gap='1rem'
        >
          <Grid
            paddingX={16}
            paddingTop={16}
            templateColumns={{ base: 'repeat(2,1fr)', md: 'repeat(5,1fr)' }}
            gap={6}
          >
            {pets.map((pet) => {
              return <PetCard pet={pet} key={pet.id} />
            })}
          </Grid>
            <Pagination
               currentPage={currentPage}
               handlePrev={handlePrev}
               handleNext={handleNext}
               currentLen={pets.length}
             />
        </Flex>
        : <Flex
          flexDirection='column'
          padding={16}
          gap='3rem'
          align='center'
          justify='center'>

          Nenhum resultado encontrado
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

          {pets.length !== 0 && (
            <Pagination
              currentPage={currentPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
              currentLen={pets.length}
            />
          )}
        </Flex>
      }
    </>
  )
}
