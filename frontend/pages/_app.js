import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    // 2. wrap the app with `ChakraProvider`
  <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
)
}

export default MyApp;
