import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { authService } from '@/services/auth';
import { normalizeAxiosError } from '@/services/axiosClient';

export type LoginFormProps = {
  onSuccess?: (email: string) => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
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
    <Paper elevation={2} sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Sign in</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;
