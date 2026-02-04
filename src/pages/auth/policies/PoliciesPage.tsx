import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { policyService } from '@/services/policy';
import { useEnterpriseStore } from '@/stores/enterpriseStore';
import { usePoliciesUpdater } from '@/hooks/useStoreUpdaters';
import CreatePolicyModal from './components/CreatePolicyModal';
import PolicyInfoModal from './components/PolicyInfoModal';
import EditPolicyModal from './components/EditPolicyModal';
import type { Policy } from '@/types/api';

export default function PoliciesPage() {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const policies = useEnterpriseStore((state) => state.policies);
  const { replaceAll: replacePolicies, deletePolicy } = usePoliciesUpdater();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['policies', enterprise?.name],
    queryFn: () => (enterprise ? policyService.listPolicies(enterprise.name) : null),
    enabled: !!enterprise,
  });

  // Update store when data is fetched
  useEffect(() => {
    if (data?.policies) {
      replacePolicies(data.policies);
    }
  }, [data?.policies, replacePolicies]);

  // Example: Delete policy mutation without refetching list
  const deleteMutation = useMutation({
    mutationFn: (policyId: string) => {
      if (!enterprise) throw new Error('No enterprise');
      return policyService.deletePolicy({
        enterprise_name: enterprise.name,
        policy_name: policyId,
      });
    },
    onSuccess: (_, policyId) => {
      deletePolicy(policyId);
    },
    onError: () => {
      // If error, refetch list
    },
  });

  const handleRowClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsInfoModalOpen(true);
  };

  const handleEdit = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsEditModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, policyId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this policy?')) {
      deleteMutation.mutate(policyId);
    }
  };

  if (!enterprise) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">No enterprise found. Please register an enterprise first.</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          {error instanceof Error ? error.message : 'Failed to fetch policies'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Policies ({policies.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Policy
        </Button>
      </Box>

      {policies.length === 0 ? (
        <Alert severity="info">No policies found. Create your first policy.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Policy Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Policy ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.map((policy) => (
                <TableRow
                  key={policy.policy_id}
                  hover
                  onClick={() => handleRowClick(policy)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{policy.name || policy.policy_id}</TableCell>
                  <TableCell>{policy.policy_id}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(policy);
                      }}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleDelete(e, policy.policy_id)}
                      color="error"
                      disabled={deleteMutation.isPending}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreatePolicyModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <PolicyInfoModal
        open={isInfoModalOpen}
        policy={selectedPolicy}
        onClose={() => setIsInfoModalOpen(false)}
        onEdit={handleEdit}
      />
      <EditPolicyModal
        open={isEditModalOpen}
        policy={selectedPolicy}
        onClose={() => setIsEditModalOpen(false)}
      />
    </Box>
  );
}
