
import { Link } from '@chakra-ui/react'

interface CustomLinkProps {
  text: string
}
export const CustomLink = ({ text }: CustomLinkProps): JSX.Element => {
  return (
        <Link
        _hover={{
          color: 'blue.300'
        }}
        fontSize='sm'
        fontWeight='bold'
        textDecor='none'
        color='blue.400'>
        {text}
        </Link>
  )
}
