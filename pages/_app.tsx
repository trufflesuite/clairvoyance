import { extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import NoSSR from 'react-no-ssr';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    shadows: {
      outline: "0 0 0 3px rgb(66 225 219 / 22%)"
    },
    colors: {
      blue: {
        50: '#baece4', 
        100: '#92ebdc', 
        200: '#73e6d3', 
        300: '#5ae4cd', 
        400: '#3fe0c5', // truffle blue
        500: '#1f8e7c',
        600: '#0c5a4e',
      },
    },
  });
  return (
    <NoSSR>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </NoSSR>
  );
}

export default MyApp;
