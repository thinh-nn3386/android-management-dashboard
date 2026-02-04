import { useState, useEffect } from 'react';
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
import type { Policy } from '@/types/api';

interface EditPolicyModalProps {
  open: boolean;
  policy: Policy | null;
  onClose: () => void;
}

export default function EditPolicyModal({ open, policy, onClose }: EditPolicyModalProps) {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const { updatePolicy } = usePoliciesUpdater();

  const [policyName, setPolicyName] = useState('');
  const [policyJson, setPolicyJson] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (policy) {
      setPolicyName(policy.name || policy.policy_id);
      setPolicyJson(JSON.stringify(policy.policy_body || policy, null, 2));
    }
  }, [policy]);

  const updateMutation = useMutation({
    mutationFn: () => {
      if (!enterprise) throw new Error('No enterprise found');
      if (!policy) throw new Error('No policy to update');

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
        policy_name: policy.policy_id,
        policy_body: policyBody,
      });
    },
    onSuccess: (response) => {
      // Update the policy in the store
      updatePolicy(response.policy);

      // Reset form and close modal
      setPolicyName('');
      setPolicyJson('');
      setValidationError(null);
      onClose();
    },
    onError: (error) => {
      setValidationError(error instanceof Error ? error.message : 'Failed to update policy');
    },
  });

  const handleUpdate = () => {
    setValidationError(null);
    updateMutation.mutate();
  };

  const handleClose = () => {
    setPolicyName('');
    setPolicyJson('');
    setValidationError(null);
    onClose();
  };

  if (!policy) return null;

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
            Edit Policy
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
                disabled={updateMutation.isPending}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Policy ID: {policy.policy_id}
              </Typography>
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
                disabled={updateMutation.isPending}
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
            onClick={handleUpdate}
            disabled={updateMutation.isPending || !policyName.trim() || !policyJson.trim()}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Policy'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
