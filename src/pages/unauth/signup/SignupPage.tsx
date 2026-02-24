import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { authApi } from '@/services/auth';
import { normalizeAxiosError } from '@/services/axiosClient';
import { Link } from 'react-router-dom';
import { validateEmail } from '@/utils/utils';

export function SignupPage() {
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
      await authApi.register({ email, password });
      setSuccess('Account created. Please log in.');
    } catch (err) {
      const apiError = normalizeAxiosError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'grid',
        placeItems: 'center',
        p: 3,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 460,
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0px 20px 60px rgba(15, 23, 42, 0.08)',
          animation: 'loginFormIn 420ms ease-out both',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2.5}
        >
          <Box sx={{ animation: 'loginContentIn 420ms ease-out both' }}>
            <Typography variant="h5" fontWeight={600}>
              Create your admin account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Set up access to manage your Android enterprise resources.
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
              if (emailError && email) {
                setEmailError(validateEmail(value) ? null : 'Please enter a valid email address.');
              }
            }}
            onBlur={() => {
              if (email) {
                setEmailError(validateEmail(email) ? null : 'Please enter a valid email address.');
              }
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
            autoComplete="new-password"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !email.trim() || !password.trim()}
          >
            {loading ? 'Creating…' : 'Sign up'}
          </Button>

          <Link to="/login" style={{ textDecoration: 'none', color: 'primary' }}>
            Already have an account? Sign in
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignupPage;
