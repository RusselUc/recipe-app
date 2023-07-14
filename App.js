import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './Navigation';
import AuthProvider from './context/AuthProvider';


const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </QueryClientProvider>
  );
}