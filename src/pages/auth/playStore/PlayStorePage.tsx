import { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { enterpriseService } from '@/services/enterprise';
import { useEnterpriseStore } from '@/stores/enterpriseStore';

declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      iframes: {
        getContext: () => {
          openChild: (options: {
            url: string;
            where: HTMLElement;
            attributes: { style: string; scrolling: string };
          }) => void;
        };
      };
    };
  }
}

export default function PlayStorePage() {
  const enterprise = useEnterpriseStore((state) => state.enterprise);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  const webTokenMutation = useMutation({
    mutationFn: async () => {
      if (!enterprise) throw new Error('No enterprise found');
      return enterpriseService.createWebToken({
        enterprise_name: enterprise.name,
      });
    },
    onSuccess: (response) => {
      const webToken = response.web_token.value;
      loadIframe(webToken);
    },
  });

  const loadIframe = (webToken: string) => {
    if (!containerRef.current || !window.gapi) return;

    window.gapi.load('gapi.iframes', () => {
      const options = {
        url: `https://play.google.com/work/embedded/search?token=${webToken}&mode=SELECT`,
        where: containerRef.current!,
        attributes: { style: 'width: 100%; height: 1000px; border: none', scrolling: 'yes' },
      };

      window.gapi.iframes.getContext().openChild(options);
      setIframeReady(true);
    });
  };

  useEffect(() => {
    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && enterprise && !iframeReady) {
      webTokenMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScriptLoaded, enterprise, iframeReady]);

  if (!enterprise) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">No enterprise found. Please register an enterprise first.</Alert>
      </Box>
    );
  }

  if (webTokenMutation.isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          {webTokenMutation.error instanceof Error
            ? webTokenMutation.error.message
            : 'Failed to load Google Play Store'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Google Play Store
      </Typography>

      {!iframeReady && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading Google Play Store...</Typography>
        </Box>
      )}

      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          minHeight: '1000px',
          backgroundColor: '#fff',
          borderRadius: 1,
          boxShadow: 1,
        }}
      />
    </Box>
  );
}
