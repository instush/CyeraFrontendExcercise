import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ApiError } from '../types/api';

interface HeatmapErrorProps {
  error: ApiError;
  onRetry: () => void;
}

export const HeatmapError = ({ error, onRetry }: HeatmapErrorProps) => {
  return (
    <div className="heatmap-error" role="alert">
      <ErrorOutlineIcon className="heatmap-error-icon" />
      <div className="heatmap-error-title">Couldn't load scan data</div>
      <div className="heatmap-error-subtitle">
        {error.message}
        {error.status ? ` (${error.status})` : ''}
      </div>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<RefreshIcon />}
        onClick={onRetry}
        sx={{ mt: 1, textTransform: 'none', borderColor: '#9000d4', color: 'white' }}
      >
        Retry
      </Button>
    </div>
  );
};
