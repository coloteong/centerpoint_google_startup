import { extendTheme } from '@chakra-ui/react'
import "@fontsource/rubik"
import "@fontsource/varela-round"

const theme = extendTheme({
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: `'Varela Round', sans-serif`,
  },
})

export default theme