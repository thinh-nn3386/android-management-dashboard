import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/unauth/login/LoginPage';
import SignupPage from './pages/unauth/signup/SignupPage';
import DashboardLayout from './layouts/DashboardLayout';
import EnterprisePage from './pages/auth/enterprise/EnterprisePage';
import PoliciesPage from './pages/auth/policies/PoliciesPage';
import DevicesPage from './pages/auth/devices/DevicesPage';
import PlayStorePage from './pages/auth/playStore/PlayStorePage';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EnterprisePage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="devices" element={<DevicesPage />} />
            <Route path="playstore" element={<PlayStorePage />} />
          </Route>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
