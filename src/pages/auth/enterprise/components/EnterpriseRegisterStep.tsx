import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { enterpriseService } from '@/services/enterprise';

interface EnterpriseRegisterStepProps {
  signupName: string;
  enterpriseToken: string;
  onRegisterComplete: () => void;
}

export default function EnterpriseRegisterStep({
  signupName,
  enterpriseToken,
  onRegisterComplete,
}: EnterpriseRegisterStepProps) {
  const userEmail = localStorage.getItem('userEmail') || '';

  const registerMutation = useMutation({
    mutationFn: () =>
      enterpriseService.register({
        signup_url_name: signupName,
        enterprise_token: enterpriseToken,
        email: userEmail,
      }),
    onSuccess: () => {
      setTimeout(() => {
        onRegisterComplete();
      }, 1500);
    },
  });

  const handleRegister = () => {
    registerMutation.mutate();
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
          <Stepper activeStep={1}>
            <Step completed>
              <StepLabel>Create Enterprise</StepLabel>
            </Step>
            <Step>
              <StepLabel>Register Enterprise</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {registerMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {registerMutation.error instanceof Error
              ? registerMutation.error.message
              : 'Failed to register enterprise'}
          </Alert>
        )}

        {registerMutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircleIcon />}>
            Enterprise registered successfully! Redirecting...
          </Alert>
        )}

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e' }}>
          Step 2: Register Your Enterprise
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Click the button below to complete the registration of your enterprise account.
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
          <strong>Email:</strong> {userEmail}
        </Typography>

        <Button
          variant="contained"
          onClick={handleRegister}
          disabled={registerMutation.isPending || registerMutation.isSuccess}
          fullWidth
          startIcon={
            registerMutation.isPending ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
        >
          {registerMutation.isPending
            ? 'Registering...'
            : registerMutation.isSuccess
              ? 'Registration Complete'
              : 'Register Enterprise'}
        </Button>
      </CardContent>
    </Card>
  );
}
