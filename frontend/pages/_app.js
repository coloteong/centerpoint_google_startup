import * as React from 'react'
import Head from 'next/head'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    // 2. wrap the app with `ChakraProvider`
  <ChakraProvider>
    <Head>
    <title>Centerpoint</title>
    </Head>

  <Component {...pageProps} />

  </ChakraProvider>
)
}

export default MyApp;
