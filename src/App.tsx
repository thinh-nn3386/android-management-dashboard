import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/unauth/login/LoginPage';
import SignupPage from './pages/unauth/signup/SignupPage';
import DashboardLayout from './layouts/DashboardLayout';
import AndroidDevicesPage from './pages/auth/home/AndroidDevicesPage';
import UserProfilePage from './pages/auth/home/UserProfilePage';
import TestTabPage from './pages/auth/home/TestTabPage';
import ProtectedRoute from './components/ProtectedRoute';

export function App() {
  return (
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
          <Route index element={<AndroidDevicesPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="test" element={<TestTabPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
