
import { Link as RedirectLink, useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  Text,
  useDisclosure,
  IconButton,
  Stack,
  Link,
  Button,
  Image,
  useColorModeValue,
  Avatar
  , Icon
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons'
import homeLogo from '../../../assets/home_dog.svg'
import { CgLogOut } from 'react-icons/cg'
import { useAuth } from '../../context/AuthContext'

export const Header = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <Box bg='#1F2029' px={4} py={2}
        // borderBottom={0.3}
        // borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Flex
          as='header'
          alignItems={'center'}
          justifyContent='space-around'>

          {/* DropDown Responsive Icon */}

          <IconButton
            size={'sm'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ base: 'block', sm: 'block', md: 'none' }}
            bg='gray.700'
            _hover={{
              bg: 'gray.500'
            }}
            onClick={isOpen ? onClose : onOpen}
          />
          {/* HAF Logo and Icon */}
            <Flex
              mr={{ base: '6rem', md: 0 }}
              ml={{ base: '6rem', md: 0 }}
              cursor='pointer'
              gap='1rem'>
                <Text
                  onClick={() => { navigate('/home') }}
                  alignSelf={{ base: 'center' }}
                  fontWeight='bold'
                  color={{
                    base: '#02966a', md: '#02966a'
                  }}
                  display={{ base: 'inline', md: 'block' }}
                  fontSize={{ base: 'sm', sm: 'sm', md: 'xl' }}
                  fontStyle='oblique'
                  lineHeight='2rem'
                >
                  HELP A FRIEND
                </Text>
              <Image
                display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
                src={homeLogo}
                w='3rem'
                height='2rem' />
            </Flex>

            {/* Navigation Links Desktop */}
            <Stack
              alignSelf='center'
              as={'nav'}
              display={{ base: 'none', md: 'flex' }}
              flexDir='row'
              gap='3rem'>
              {activeLinks.map((link) => (
                !link.auth && (
                    <NavLink
                    redirectTo={link.redirectTo}
                    key={link.label}>{link.label}</NavLink>
                )
              ))}
            </Stack>

            {/* Navigation Links Desktop - END */}
          {/* User profile Info */}
          {user
            ? (
            <Flex
              alignItems='center'
              gap='1rem'>
              <Text
                fontWeight='bold'
                fontSize={{ base: 'sm', md: '0.9rem' }}
              >{user?.name}</Text>
              <Avatar h='2rem' w='2rem' src={user?.avatar} />
              <Button
                variant='link'
              >
                <Icon
                  onClick={signOut}
                  _hover={{ color: 'orange.200' }}
                  color='orange.400'
                  as={CgLogOut} />
              </Button>
            </Flex>
              )
            : <Flex
              gap='3rem'
              mt='0.5rem'
              paddingX='3'
              paddingY='1'
              display={{ base: 'flex' }}
            >
              <RedirectLink to='/login'>
                <Button
                  variant='link'
                  size='sm'
                  _hover={{ color: '#15a97d' }}
                  color='#02966a'>
                  Entrar
                </Button>
              </RedirectLink>
              <RedirectLink to='/criar-usuario'>
                <Button
                  variant='contained'
                  size='sm'
                  display={{ base: 'none', md: 'block' }}
                  _hover={{ bg: '#15a97d' }}
                  bg='#02966a'>
                  Cadastrar
                </Button>
              </RedirectLink>
            </Flex>
          }

          {/* User profile Info - END */}

        </Flex>

        {
          isOpen
            ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {activeLinks.map((link) => (
                  !link.auth && (
                    <NavLink
                    redirectTo={link.redirectTo}
                    key={link.label}>{link.label}</NavLink>
                  )
                ))}
              </Stack>
            </Box>
              )
            : null
        }
      </Box >
    </>
  )
}

const NavLink = ({ children, redirectTo }: NavProps): JSX.Element => (
  <RedirectLink to={redirectTo} style={{ marginTop: '0.5rem' }}>
    <Link
      as='p'
      fontSize='1rem'
      color={'orange.400'}
      _hover={{
        textDecoration: 'none',
        color: 'orange.300',
        transform: '0.2s ease in '
      }}
    >
      {children}
    </Link>
  </RedirectLink >
)

interface NavProps {
  children: string
  redirectTo: string
}
const activeLinks = [
  {
    label: 'Sobre',
    redirectTo: '/about',
    auth: false
  },
  {
    label: 'Meus interesses',
    redirectTo: '/criar-usuario',
    auth: true
  },
  {
    label: 'Quero Adotar',
    redirectTo: '/criar-usuario',
    auth: false
  },
  {
    label: 'Ajudar',
    redirectTo: '/criar-usuario',
    auth: false
  }
]
