import { Box, Chip, Stack, Typography } from '@mui/material';

export type LoginContentProps = {
  className?: string;
};

export function LoginContent({ className }: LoginContentProps) {
  return (
    <Box className={className} sx={{ color: 'white' }}>
      <Chip
        label="Enterprise"
        color="primary"
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
      />
      <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
        Android Management Dashboard
      </Typography>
      <Typography variant="h6" sx={{ color: 'rgba(226, 232, 240, 0.9)', mb: 3 }}>
        Securely manage devices, policies, and enrollments at scale.
      </Typography>

      <Stack spacing={1.2} sx={{ color: 'rgba(226, 232, 240, 0.85)' }}>
        <Typography variant="body1">• Real-time device health and policy status</Typography>
        <Typography variant="body1">• Enrollment workflows with QR and tokens</Typography>
        <Typography variant="body1">• Enterprise-ready access controls</Typography>
      </Stack>
    </Box>
  );
}

export default LoginContent;
