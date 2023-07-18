import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from './Navigation';
import AuthProvider from './context/AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}