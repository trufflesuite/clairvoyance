import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NoSSR from 'react-no-ssr';


function MyApp({ Component, pageProps }: AppProps) {
  return <NoSSR><Component {...pageProps} /></NoSSR>
}

export default MyApp
