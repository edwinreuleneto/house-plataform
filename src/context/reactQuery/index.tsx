// Dependencies
import { QueryClient } from 'react-query'

// Services
import { api } from '@/services/api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: ({ queryKey }) => api(String(queryKey[0]), { method: 'GET' }),
    },
  }
})