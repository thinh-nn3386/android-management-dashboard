import { Drawer, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import type { Policy } from '@/types/api';

interface PolicyInfoModalProps {
  open: boolean;
  policy: Policy | null;
  onClose: () => void;
  onEdit: (policy: Policy) => void;
}

export default function PolicyInfoModal({ open, policy, onClose, onEdit }: PolicyInfoModalProps) {
  if (!policy) return null;

  const handleEdit = () => {
    onEdit(policy);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
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
            Policy Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Policy Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {policy.name || policy.policy_id}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Policy ID
            </Typography>
            <Typography variant="body1">{policy.policy_id}</Typography>
          </Box>

          {policy.version && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Version
                </Typography>
                <Typography variant="body1">{policy.version}</Typography>
              </Box>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Policy JSON
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                overflow: 'auto',
              }}
            >
              <pre
                style={{
                  margin: 0,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {JSON.stringify(policy.policy_body || policy, null, 2)}
              </pre>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Button fullWidth variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit Policy
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
