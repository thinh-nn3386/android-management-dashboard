import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { OpenInNew as OpenInNewIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

interface EnterpriseSignupStepProps {
  signupUrl: string;
  onSignupComplete: (token: string) => void;
}

export default function EnterpriseSignupStep({
  signupUrl,
  onSignupComplete,
}: EnterpriseSignupStepProps) {
  const [enterpriseToken, setEnterpriseToken] = useState('');
  const [signupCode, setSignupCode] = useState('');

  // Check for callback token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('enterpriseToken') || params.get('token');
    if (token) {
      setEnterpriseToken(token);
    }
  }, []);

  // Parse enterprise token from signup code
  const handleSignupCodeChange = (value: string) => {
    setSignupCode(value);
    // Try to extract token from the callback URL
    try {
      const url = new URL(value);
      const token = url.searchParams.get('enterpriseToken');
      if (token) {
        setEnterpriseToken(token);
      }
    } catch {
      // If not a valid URL, treat it as direct token input
      if (value.trim()) {
        setEnterpriseToken(value.trim());
      }
    }
  };

  const handleOpenSignupUrl = () => {
    window.open(signupUrl, '_blank');
  };

  const handleContinue = () => {
    if (enterpriseToken.trim()) {
      onSignupComplete(enterpriseToken.trim());
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        boxShadow: 2,
        borderRadius: 2,
        maxWidth: 600,
      }}
    >
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Stepper activeStep={0}>
            <Step>
              <StepLabel>Create Enterprise</StepLabel>
            </Step>
            <Step>
              <StepLabel>Register Enterprise</StepLabel>
            </Step>
          </Stepper>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e' }}>
          Step 1: Create Google Enterprise
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Click the button below to open Google's Enterprise signup page. Use your email to create a
          new enterprise account.
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
          After completing the signup, copy the entire callback URL from the browser and paste it
          below. The enterprise token will be automatically extracted.
        </Typography>

        <Button
          variant="contained"
          endIcon={<OpenInNewIcon />}
          onClick={handleOpenSignupUrl}
          fullWidth
          sx={{
            mb: 3,
            backgroundColor: '#2196f3',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Open Enterprise Signup
        </Button>

        <TextField
          fullWidth
          label="Signup Callback Code"
          placeholder="Paste the callback URL or enterprise token here"
          value={signupCode}
          onChange={(e) => handleSignupCodeChange(e.target.value)}
          sx={{ mb: 2 }}
          helperText="Paste the entire callback URL from the browser after signup"
          multiline
          rows={3}
        />

        {enterpriseToken && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
              Extracted Token:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                color: '#1a1a2e',
              }}
            >
              {enterpriseToken}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleContinue}
          disabled={!enterpriseToken.trim()}
          fullWidth
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
        >
          Continue to Register
        </Button>
      </CardContent>
    </Card>
  );
}
