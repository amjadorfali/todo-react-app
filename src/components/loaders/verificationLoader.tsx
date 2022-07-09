import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const VerificationLoader: React.FC<{ loading: boolean; success: boolean }> = ({ loading, success }) => {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {loading ? (
        <CircularProgress
          color="secondary"
          size={'1.5rem'}
          sx={{
            zIndex: 1,
          }}
        />
      ) : success ? (
        <CheckIcon color="secondary" width="1.5rem" height="1.5rem" />
      ) : (
        <ErrorIcon color="error" width="1.5rem" height="1.5rem" />
      )}
    </Box>
  );
};

export default VerificationLoader;
