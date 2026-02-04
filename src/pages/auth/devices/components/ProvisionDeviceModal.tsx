import { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from '@tanstack/react-query';
import QRCode from 'qrcode';
import { deviceService } from '@/services/device';
import { policyService } from '@/services/policy';
import { useEnterpriseStore } from '@/stores/enterpriseStore';

interface ProvisionDeviceModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function ProvisionDeviceModal({
  open,
  onClose,
  onComplete,
}: ProvisionDeviceModalProps) {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const policies = useEnterpriseStore((state) => state.policies);
  const policiesFetched = useEnterpriseStore((state) => state.policiesFetched);
  const setPolicies = useEnterpriseStore((state) => state.setPolicies);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [enrollmentToken, setEnrollmentToken] = useState('');

  // Fetch policies if not already fetched
  const { isLoading: isPoliciesLoading } = useQuery({
    queryKey: ['policies', enterprise?.name],
    queryFn: async () => {
      if (!enterprise) return null;
      const response = await policyService.listPolicies(enterprise.name);
      setPolicies(response.policies);
      return response;
    },
    enabled: !!enterprise && !policiesFetched && open,
  });

  // Create enrollment token mutation
  const createTokenMutation = useMutation({
    mutationFn: async () => {
      if (!enterprise || !selectedPolicy) throw new Error('Missing required fields');
      return deviceService.createEnrollmentToken({
        enterprise_name: enterprise.name,
        policy_name: selectedPolicy,
      });
    },
    onSuccess: async (response) => {
      setEnrollmentToken(response.enrollment_token.value);

      // Generate QR code
      try {
        const qrDataUrl = await QRCode.toDataURL(response.enrollment_token.qrCode);
        setQrCodeDataUrl(qrDataUrl);
        setStep(2);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    },
  });

  const handleShowQR = () => {
    createTokenMutation.mutate();
  };

  const handleDone = () => {
    // Reset state
    setStep(1);
    setSelectedPolicy('');
    setQrCodeDataUrl('');
    setEnrollmentToken('');
    onComplete();
    onClose();
  };

  const handleClose = () => {
    // Reset state
    setStep(1);
    setSelectedPolicy('');
    setQrCodeDataUrl('');
    setEnrollmentToken('');
    onClose();
  };

  useEffect(() => {
    if (!open) {
      // Reset when modal closes
      setStep(1);
      setSelectedPolicy('');
      setQrCodeDataUrl('');
      setEnrollmentToken('');
    }
  }, [open]);

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Provision Device
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          {step === 1 && (
            <Stack spacing={3}>
              <Typography variant="body2" color="text.secondary">
                Step 1: Select a policy for the device
              </Typography>

              {isPoliciesLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Policy</InputLabel>
                  <Select
                    value={selectedPolicy}
                    label="Select Policy"
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                  >
                    {policies.map((policy) => (
                      <MenuItem key={policy.policy_id} value={policy.policy_id}>
                        {policy.name || policy.policy_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {policies.length === 0 && !isPoliciesLoading && (
                <Alert severity="warning">No policies found. Please create a policy first.</Alert>
              )}

              {createTokenMutation.isError && (
                <Alert severity="error">
                  {createTokenMutation.error instanceof Error
                    ? createTokenMutation.error.message
                    : 'Failed to create enrollment token'}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleShowQR}
                disabled={!selectedPolicy || createTokenMutation.isPending}
              >
                {createTokenMutation.isPending ? 'Generating...' : 'Show QR Code'}
              </Button>
            </Stack>
          )}

          {step === 2 && (
            <Stack spacing={3}>
              <Typography variant="body2" color="text.secondary">
                Step 2: Scan this QR code with the device
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                  bgcolor: 'white',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                }}
              >
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt="Enrollment QR Code" style={{ maxWidth: '100%' }} />
                ) : (
                  <CircularProgress />
                )}
              </Box>

              <Alert severity="info">
                Scan this QR code during device setup to automatically enroll the device with the
                selected policy.
              </Alert>

              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Policy
                </Typography>
                <Typography variant="body1">{selectedPolicy}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Enrollment Token
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    wordBreak: 'break-all',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                  }}
                >
                  {enrollmentToken}
                </Box>
              </Box>
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {step === 2 && (
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Button fullWidth variant="contained" onClick={handleDone}>
              Done
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
