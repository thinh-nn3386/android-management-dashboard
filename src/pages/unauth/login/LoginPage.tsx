import './login.css';
import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginContent from './LoginContent';

export function LoginPage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigateSignup = useCallback(() => {
    setIsExiting(true);
    window.setTimeout(() => {
      navigate('/signup');
    }, 280);
  }, [navigate]);

  return (
    <Box className="login-page-wrapper">
      <Box className={isExiting ? 'login-page exiting' : 'login-page'}>
        <Box className="login-page-container">
          <LoginContent />
          <LoginForm onNavigateSignup={handleNavigateSignup} />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
