import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { deviceService } from '@/services/device';
import { useEnterpriseStore } from '@/stores/enterpriseStore';
import { useDevicesUpdater } from '@/hooks/useStoreUpdaters';

export default function DevicesPage() {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const devices = useEnterpriseStore((state) => state.devices);
  const { replaceAll: replaceDevices, deleteDevice } = useDevicesUpdater();

  const { data, isLoading, error } = useQuery({
    queryKey: ['devices', enterprise?.name],
    queryFn: () => (enterprise ? deviceService.listDevices(enterprise.name) : null),
    enabled: !!enterprise,
  });

  // Update store when data is fetched
  useEffect(() => {
    if (data?.devices) {
      replaceDevices(data.devices);
    }
  }, [data?.devices, replaceDevices]);

  // Example: Delete device mutation without refetching list
  const deleteMutation = useMutation({
    mutationFn: (deviceId: string) => {
      if (!enterprise) throw new Error('No enterprise');
      return deviceService.deleteDevice({
        device_id: deviceId,
        enterprise_name: enterprise.name,
      });
    },
    onSuccess: (_, deviceId) => {
      // Update store immediately - no list refetch needed
      deleteDevice(deviceId);
    },
  });

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
          {error instanceof Error ? error.message : 'Failed to fetch devices'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Manage Devices ({devices.length})
      </Typography>
      {devices.length === 0 ? (
        <Alert severity="info">No devices found. Create an enrollment token.</Alert>
      ) : (
        <Stack spacing={2}>
          <pre>{JSON.stringify(devices, null, 2)}</pre>
          <Button
            variant="outlined"
            color="error"
            onClick={() => devices[0] && deleteMutation.mutate(devices[0].device_id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete First Device (Example)'}
          </Button>
        </Stack>
      )}
    </Box>
  );
}
