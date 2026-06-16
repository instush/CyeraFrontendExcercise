import axios, { AxiosError } from 'axios';
import httpClient from '../http-client';
import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { ApiError, ApiResponse } from '../types/api';

const handleError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;
    return {
      message: axiosError.response?.data?.error || axiosError.response?.data?.message || 'An unexpected error occurred',
      status: axiosError.response?.status
    };
  }
  return { message: 'An unexpected error occurred' };
};

export const api = {
  async getCloudProviders(): Promise<ApiResponse<CloudProviderDto[]>> {
    try {
      const { data } = await httpClient.get<CloudProviderDto[]>('/api/cloud-providers');
      return { data };
    } catch (error) {
      return { error: handleError(error) };
    }
  },

  async getScans(params?: {
    startDate?: string;
    endDate?: string;
    cloudProvidersIds?: string[];
  }): Promise<ApiResponse<ScanDto[]>> {
    try {
      const { data } = await httpClient.get<ScanDto[]>('/api/scans', {
        params
      });
      return { data };
    } catch (error) {
      return { error: handleError(error) };
    }
  }
};