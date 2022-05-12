import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import NoSSR from 'react-no-ssr';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSSR>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </NoSSR>
  );
}

export default MyApp;
