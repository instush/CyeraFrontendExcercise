import { Alert, Snackbar } from '@mui/material';
import { ApiError } from '../types/api';

interface ErrorMessageProps {
  error: ApiError | undefined;
  onClose: () => void;
}

export const ErrorMessage = ({ error, onClose }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {error.message}
      </Alert>
    </Snackbar>
  );
};