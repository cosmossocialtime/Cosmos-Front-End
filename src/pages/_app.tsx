import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/GlobalStyle'
import { AppProvider } from '../context'
import NextNProgress from 'nextjs-progressbar'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'

import '../lib/dayjs'
import '../styles/mainTailwind.css'
import './user/dashboard/[mentorshipId]/satellite-images/planets.css'
import 'keen-slider/keen-slider.min.css'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../services/queryClient'

registerLocale('ptBR', ptBR)
setDefaultLocale('ptBR')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NextNProgress
          color="#7A40D3"
          startPosition={0.3}
          stopDelayMs={300}
          height={3}
          options={{ showSpinner: false }}
        />
        <AppProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={2000} limit={3} />
        </AppProvider>
        <GlobalStyle />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
