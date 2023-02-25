import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  color: {
    gray: {
      900: '#181B23', 800: '#1F2029'
    }
  },
  styles: {
    global: {
      'html body': {
        background: '#181B23',
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: '1rem'
      }
    }
  }
})
