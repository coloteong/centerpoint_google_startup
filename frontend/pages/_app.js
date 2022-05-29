import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
function MyApp({ Component, pageProps }) {
  return (
    // 2. wrap the app with `ChakraProvider`
  <ChakraProvider theme = {theme}>
  <Component {...pageProps} />
  </ChakraProvider>
)
}

export default MyApp;
