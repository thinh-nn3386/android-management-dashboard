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
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import { deviceService } from '@/services/device';
import { useEnterpriseStore } from '@/stores/enterpriseStore';
import { useDevicesUpdater } from '@/hooks/useStoreUpdaters';
import ProvisionDeviceModal from './components/ProvisionDeviceModal';

export default function DevicesPage() {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const devices = useEnterpriseStore((state) => state.devices);
  const { replaceAll: replaceDevices, deleteDevice } = useDevicesUpdater();
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
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
      deleteDevice(deviceId);
    },
  });

  const handleProvisionComplete = () => {
    // Refetch devices list after provisioning
    refetch();
  };

  const handleDelete = (e: React.MouseEvent, deviceId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this device?')) {
      deleteMutation.mutate(deviceId);
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
          {error instanceof Error ? error.message : 'Failed to fetch devices'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Manage Devices ({devices.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<QrCodeIcon />}
          onClick={() => setIsProvisionModalOpen(true)}
        >
          Provision Device
        </Button>
      </Box>

      {devices.length === 0 ? (
        <Alert severity="info">No devices found. Create an enrollment token.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Device Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.device_id} hover>
                  <TableCell>{device.name || device.device_id}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleDelete(e, device.device_id)}
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

      <ProvisionDeviceModal
        open={isProvisionModalOpen}
        onClose={() => setIsProvisionModalOpen(false)}
        onComplete={handleProvisionComplete}
      />
    </Box>
  );
}
