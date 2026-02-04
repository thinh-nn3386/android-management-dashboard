import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@tanstack/react-query';
import { policyService } from '@/services/policy';
import { usePoliciesUpdater } from '@/hooks/useStoreUpdaters';
import { useEnterpriseStore } from '@/stores/enterpriseStore';

interface CreatePolicyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreatePolicyModal({ open, onClose }: CreatePolicyModalProps) {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const { addPolicy } = usePoliciesUpdater();

  const [policyName, setPolicyName] = useState('');
  const [policyJson, setPolicyJson] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: () => {
      if (!enterprise) throw new Error('No enterprise found');

      // Validate policy name
      if (!policyName.trim()) {
        throw new Error('Policy name is required');
      }

      // Validate JSON
      let policyBody: Record<string, unknown>;
      try {
        policyBody = JSON.parse(policyJson);
      } catch {
        throw new Error('Invalid JSON format');
      }

      return policyService.createOrUpdatePolicy({
        enterprise_name: enterprise.name,
        policy_name: policyName.trim(),
        policy_body: policyBody,
      });
    },
    onSuccess: (response) => {
      // Add the new policy from the server response to the store
      addPolicy(response.policy);

      // Reset form and close modal
      setPolicyName('');
      setPolicyJson('');
      setValidationError(null);
      onClose();
    },
    onError: (error) => {
      setValidationError(error instanceof Error ? error.message : 'Failed to create policy');
    },
  });

  const handleCreate = () => {
    setValidationError(null);
    createMutation.mutate();
  };

  const handleClose = () => {
    setPolicyName('');
    setPolicyJson('');
    setValidationError(null);
    onClose();
  };

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
            Create Policy
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Content */}
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          <Stack spacing={3}>
            {validationError && (
              <Alert severity="error" onClose={() => setValidationError(null)}>
                {validationError}
              </Alert>
            )}

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Policy Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter policy name"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                disabled={createMutation.isPending}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Policy JSON
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={15}
                placeholder='{"applications": [], "statusReportingSettings": {...}}'
                value={policyJson}
                onChange={(e) => setPolicyJson(e.target.value)}
                disabled={createMutation.isPending}
                sx={{
                  '& textarea': {
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            disabled={createMutation.isPending || !policyName.trim() || !policyJson.trim()}
          >
            {createMutation.isPending ? 'Creating...' : 'Create Policy'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
