import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert/Alert';

import { SnackbarMessageType } from 'src/pages/Show/Main/types';

interface CustomizedSnackbarsProps {
  openSnackbar: boolean;
  handleCloseSnackbar: () => void;
  snackbarMessage: SnackbarMessageType;
}

const FollowSnackbar = ({ openSnackbar, handleCloseSnackbar, snackbarMessage }: CustomizedSnackbarsProps) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleCloseSnackbar();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {snackbarMessage?.failure && (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
            {snackbarMessage.failure}
          </Alert>
        </Snackbar>
      )}
      {snackbarMessage?.success && (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
            {snackbarMessage.success}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default FollowSnackbar;
