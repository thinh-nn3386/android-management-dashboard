import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { authService } from '@/services/auth';
import { normalizeAxiosError } from '@/services/axiosClient';

export function SignupPage() {
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
      const result = await authService.register({ email, password });
      setSuccess(result.message || 'Account created. Please log in.');
    } catch (err) {
      const apiError = normalizeAxiosError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <Paper elevation={2} sx={{ width: '100%', maxWidth: 420, p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Create account</Typography>

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
            autoComplete="new-password"
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Creating…' : 'Sign up'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignupPage;
