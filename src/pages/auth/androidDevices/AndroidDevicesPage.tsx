import { useState, useCallback, useEffect } from 'react';
import { Box, CircularProgress, Alert, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { enterpriseService } from '@/services/enterprise';
import { useEnterpriseStore } from '@/stores/enterpriseStore';
import EnterpriseDashboard from './components/EnterpriseDashboard';
import CreateEnterpriseCard from './components/CreateEnterpriseCard';

export default function AndroidDevicesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['enterprise'],
    queryFn: () => enterpriseService.login(),
  });

  const setEnterprise = useEnterpriseStore((state) => state.setEnterprise);
  const clearEnterprise = useEnterpriseStore((state) => state.clearEnterprise);

  const handleTryAgain = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      refetch();
      setIsRefreshing(false);
    }, 500);
  }, [refetch]);

  const handleEnterpriseCreated = useCallback(() => {
    refetch();
  }, [refetch]);

  const enterpriseFound = response?.enterprise_found && response?.enterprise;

  useEffect(() => {
    if (enterpriseFound && response?.enterprise) {
      setEnterprise(response.enterprise);
    } else {
      clearEnterprise();
    }
  }, [enterpriseFound, response, setEnterprise, clearEnterprise]);

  if (isLoading || isRefreshing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, maxWidth: 600 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={handleTryAgain}
            >
              Try Again
            </Button>
          }
        >
          {error instanceof Error ? error.message : 'Failed to fetch enterprise info'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900 }}>
      {enterpriseFound ? (
        <EnterpriseDashboard enterprise={response.enterprise!} />
      ) : (
        <CreateEnterpriseCard onEnterpriseCreated={handleEnterpriseCreated} />
      )}
    </Box>
  );
}
