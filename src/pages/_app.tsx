import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/GlobalStyle'
import { AuthProvider } from '../context/AuthProvider'
import NextNProgress from 'nextjs-progressbar'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'

import '../lib/dayjs'
import '../styles/mainTailwind.css'
import './dashboard/satellite-images/planets.css'
import 'keen-slider/keen-slider.min.css'

registerLocale('ptBR', ptBR)
setDefaultLocale('ptBR')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#7A40D3"
        startPosition={0.3}
        stopDelayMs={300}
        height={3}
        options={{ showSpinner: false }}
      />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}

export default MyApp
