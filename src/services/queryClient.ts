import { QueryClient } from '@tanstack/react-query'

const TIME_FROM_MS_TO_SECONDS = 1000 * 60 * 30 // 30seconds

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: TIME_FROM_MS_TO_SECONDS,
    },
  },
})
