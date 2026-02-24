import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { Assignment, Devices, Apps } from '@mui/icons-material';
import type { EnterpriseInfo } from '@/types/api';
import { useNavigate } from 'react-router-dom';

interface EnterpriseDashboardProps {
  enterprise: EnterpriseInfo;
}

export default function EnterpriseDashboard({ enterprise }: EnterpriseDashboardProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Card
        sx={{
          backgroundColor: '#fff',
          boxShadow: 2,
          borderRadius: 2,
          mb: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e' }}>
            Enterprise Information
          </Typography>
          <Stack spacing={1}>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {enterprise.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                Display Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {enterprise.display_name}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card
          sx={{
            backgroundColor: '#fff',
            boxShadow: 2,
            borderRadius: 2,
            flex: 1,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Apps sx={{ color: '#ff9800' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                Play Store
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Browse and manage Google Play apps for your managed devices.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff9800' }}
              onClick={() => navigate('/home/playstore')}
            >
              Open Play Store
            </Button>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#fff',
            boxShadow: 2,
            borderRadius: 2,
            flex: 1,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Assignment sx={{ color: '#3f51b5' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                Manage Policies
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Create, update, and assign Android policy configurations for your enterprise.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#3f51b5' }}
              onClick={() => navigate('/home/policies')}
            >
              Open Policies
            </Button>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#fff',
            boxShadow: 2,
            borderRadius: 2,
            flex: 1,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Devices sx={{ color: '#009688' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                Manage Devices
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              View enrolled devices and take actions to keep them secure and compliant.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#009688' }}
              onClick={() => navigate('/home/devices')}
            >
              Open Devices
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
