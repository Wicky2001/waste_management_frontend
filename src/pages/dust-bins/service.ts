import type { AxiosRequestConfig } from 'axios';
import { api } from '../../common-shared/service/apiClient';
import type { DustBinListResponse, DustBinQueryParams } from './types';

const DUST_BIN_ENDPOINT = '/bins';

export const fetchDustBins = async (
  params: DustBinQueryParams,
  config?: AxiosRequestConfig,
) => {
  const response = await api.get(DUST_BIN_ENDPOINT, params, config);
  return response.data as DustBinListResponse;
};
