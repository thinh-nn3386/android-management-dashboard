import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { authService } from '@/services/auth';
import { normalizeAxiosError } from '@/services/axiosClient';
import { Link } from 'react-router-dom';
import { validateEmail } from '@/utils/utils';

export type LoginFormProps = {
  onSuccess?: (email: string) => void;
  onNavigateSignup?: () => void;
};

export function LoginForm({ onSuccess, onNavigateSignup }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.login({ email, password });
      setSuccess(`Welcome ${result.email}`);
      onSuccess?.(result.email);
    } catch (err) {
      const apiError = normalizeAxiosError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0px 20px 60px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2.5}>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage your Android fleet and enterprise policies.
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (emailError) {
              setEmailError(validateEmail(value) ? null : 'Please enter a valid email address.');
            }
          }}
          onBlur={() => {
            setEmailError(validateEmail(email) ? null : 'Please enter a valid email address.');
          }}
          required
          autoComplete="email"
          fullWidth
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !email.trim() || !password.trim()}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>

        <Link
          to="/signup"
          style={{ textDecoration: 'none', color: 'primary' }}
          onClick={(event) => {
            if (onNavigateSignup) {
              event.preventDefault();
              onNavigateSignup();
            }
          }}
        >
          Create an account
        </Link>
      </Box>
    </Paper>
  );
}

export default LoginForm;
