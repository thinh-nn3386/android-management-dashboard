import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/pages/unauth/login/LoginForm';
import LoginContent from '@/pages/unauth/login/LoginContent';

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
    <Box
      sx={{
        flex: 1,
        display: 'grid',
        placeItems: 'center',
        p: { xs: 2, md: 6 },
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      }}
    >
      <Box
        className={isExiting ? 'login-page exiting' : 'login-page'}
        sx={{
          width: '100%',
          maxWidth: 1100,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'center',
        }}
      >
        <LoginContent className="login-content" />

        <Box className="login-form">
          <LoginForm onNavigateSignup={handleNavigateSignup} />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
