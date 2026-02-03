import { Box, Typography } from '@mui/material';
import LoginForm from '@/components/LoginForm';

export function LoginPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Android Management Dashboard
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default LoginPage;
