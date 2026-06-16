import { useCallback, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './styles.css';
import { Heatmap } from './components/Heatmap';
import { YearPicker } from './components/YearPicker';
import { CloudPrivderSelect } from './components/CloudPrivderSelect';
import { ErrorMessage } from './components/ErrorMessage';
import { HeatmapError } from './components/HeatmapError';
import { api } from './services/api';
import { CloudProviderDto } from '../../common/dtos/cloud-provider.dto';
import { ScanDto } from '../../common/dtos/scan.dto';
import { ApiError } from './types/api';

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [cloudProviders, setCloudProviders] = useState<CloudProviderDto[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [scans, setScans] = useState<ScanDto[]>([]);
  const [error, setError] = useState<ApiError>();
  const [scansError, setScansError] = useState<ApiError>();
  const [scansLoading, setScansLoading] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  const fetchCloudProviders = async () => {
    const response = await api.getCloudProviders();
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setCloudProviders(response.data);
    }
  };

  const fetchScans = useCallback(async () => {
    const startDate = new Date(year, 0, 1).toISOString();
    const endDate = new Date(year + 1, 0, 1).toISOString();

    setScansLoading(true);
    setScansError(undefined);

    const response = await api.getScans({
      startDate,
      endDate,
      cloudProvidersIds: selectedProviders.length ? selectedProviders : undefined
    });

    if (response.error) {
      setScansError(response.error);
    } else if (response.data) {
      setScans(response.data);
    }

    setScansLoading(false);
  }, [year, selectedProviders]);

  useEffect(() => {
    fetchCloudProviders();
  }, []);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  return (
    <div className="app">
      <ErrorMessage error={error} onClose={() => setError(undefined)} />
      <div className="filters">
        <YearPicker
          value={year}
          onChange={setYear}
          disableFuture
        />
        <CloudPrivderSelect
          options={cloudProviders.map(provider => ({
            displayName: provider.displayName,
            value: provider.id
          }))}
          onChange={setSelectedProviders}
          selectedOptions={selectedProviders}
        />
        <IconButton
          className="theme-toggle"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </div>
      {scansLoading ? (
        <div className="heatmap-status">
          <CircularProgress sx={{ color: '#9000d4' }} />
        </div>
      ) : scansError ? (
        <HeatmapError error={scansError} onRetry={fetchScans} />
      ) : (
        <Heatmap scans={scans} year={year} />
      )}
    </div>
  );
}