import { Button, Flex, Text } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

interface GoBackProps {
  backTo: string
}
export const GoBack: React.FC<GoBackProps> = ({ backTo }: GoBackProps) => {
  const navigate = useNavigate()
  return (
        <Button
            alignSelf='flex-start'
            variant='solid'
            bg='transparent'
            color='yellow.400'
            _hover={{
              bg: 'none'
            }}
            border='none'
            fontSize='1.5rem'
            margin='1rem'
            _active={{
              outline: 'none'
            }}
            onClick={() => { navigate(`${backTo}`) }}
        >
        <Flex
            gap='1rem'
            align='center'
            _hover={{
              color: '#15a97d'
            }}>
            <Text>
                <BiArrowBack />
            </Text>
            <Text fontSize='sm'>Voltar</Text>
        </Flex>

        </Button>
  )
}
