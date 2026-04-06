import type { AxiosRequestConfig } from 'axios';
import { api } from '../../common-shared/service/apiClient';

export type DustBinSortField =
  | 'binCode'
  | 'binType'
  | 'serviceAreaId'
  | 'serviceAreaName'
  | 'createdAt';

export type DustBinSortOrder = 'ASC' | 'DESC';

export type DustBinQueryParams = {
  page: number;
  limit: number;
  search?: string;
  sortOrder?: DustBinSortOrder;
  sortField?: DustBinSortField;
  serviceAreaId?: number;
  binType?: string;
};

export type DustBinRecord = {
  id: string;
  binCode?: string;
  binType?: string;
  serviceAreaId?: number;
  serviceAreaName?: string;
  createdAt?: string;
  [key: string]: unknown;
};

export type DustBinListResponse = {
  records: DustBinRecord[];
  total: number;
  timestamp?: string;
};

const DUST_BIN_ENDPOINT = '/dust-bins';

export const fetchDustBins = async (
  params: DustBinQueryParams,
  config?: AxiosRequestConfig,
) => {
  const response = await api.get(DUST_BIN_ENDPOINT, params, config);
  return response.data as DustBinListResponse;
};
