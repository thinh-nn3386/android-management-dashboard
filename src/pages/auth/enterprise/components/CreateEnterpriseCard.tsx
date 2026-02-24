import { useState } from 'react';
import { Card, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { enterpriseService } from '@/services/enterprise';
import EnterpriseSignupStep from './EnterpriseSignupStep';
import EnterpriseRegisterStep from './EnterpriseRegisterStep';

interface CreateEnterpriseCardProps {
  onEnterpriseCreated: () => void;
}

export default function CreateEnterpriseCard({ onEnterpriseCreated }: CreateEnterpriseCardProps) {
  const [step, setStep] = useState<'initial' | 'signup' | 'register'>('initial');
  const [signupUrl, setSignupUrl] = useState<string>('');
  const [signupName, setSignupName] = useState<string>('');
  const [enterpriseToken, setEnterpriseToken] = useState<string>('');

  const createSignupUrlMutation = useMutation({
    mutationFn: () =>
      enterpriseService.createSignupUrl({
        callback_url:
          'https://storage.googleapis.com/android-management-quick-start/enterprise_signup_callback.html',
      }),
    onSuccess: (data) => {
      if (data.signup_url) {
        setSignupUrl(data.signup_url);
        setSignupName(data.signup_name);
        setStep('signup');
      }
    },
  });

  const handleCreateEnterprise = () => {
    createSignupUrlMutation.mutate();
  };

  const handleSignupComplete = (token: string) => {
    setEnterpriseToken(token);
    setStep('register');
  };

  if (step === 'signup' && signupUrl) {
    return <EnterpriseSignupStep signupUrl={signupUrl} onSignupComplete={handleSignupComplete} />;
  }

  if (step === 'register' && enterpriseToken) {
    return (
      <EnterpriseRegisterStep
        signupName={signupName}
        enterpriseToken={enterpriseToken}
        onRegisterComplete={onEnterpriseCreated}
      />
    );
  }

  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        boxShadow: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      {createSignupUrlMutation.isError && (
        <Box sx={{ mb: 2, width: '100%' }}>
          <Alert severity="error">
            {createSignupUrlMutation.error instanceof Error
              ? createSignupUrlMutation.error.message
              : 'Failed to create signup URL'}
          </Alert>
        </Box>
      )}

      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e', textAlign: 'center' }}
      >
        No Enterprise Found
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#666', textAlign: 'center', maxWidth: 400 }}>
        Create an enterprise to manage your Android devices and policies.
      </Typography>
      <Button
        variant="contained"
        startIcon={createSignupUrlMutation.isPending ? <CircularProgress size={20} /> : <AddIcon />}
        disabled={createSignupUrlMutation.isPending}
        onClick={handleCreateEnterprise}
        sx={{
          backgroundColor: '#4caf50',
          '&:hover': {
            backgroundColor: '#45a049',
          },
        }}
      >
        {createSignupUrlMutation.isPending ? 'Creating...' : 'Create Enterprise'}
      </Button>
    </Card>
  );
}
