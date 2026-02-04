import { Card, CardContent, Typography, Box } from '@mui/material';
import type { EnterpriseInfo } from '@/types/api';

interface EnterpriseCardProps {
  enterprise: EnterpriseInfo;
}

export default function EnterpriseCard({ enterprise }: EnterpriseCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e' }}>
          Enterprise Information
        </Typography>
        <Box sx={{ mb: 1.5 }}>
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
      </CardContent>
    </Card>
  );
}
