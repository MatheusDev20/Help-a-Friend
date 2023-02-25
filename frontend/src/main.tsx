/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { theme } from './styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ChakraProvider resetCSS theme={theme}>
    <Router >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ChakraProvider>
  </React.StrictMode>
)
