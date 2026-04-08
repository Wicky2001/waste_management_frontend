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
  success: boolean;
  message: string;
  data: {
    timestamp: string;
    records: DustBinRecord[];
    total: number;
  };
};

export type DustBinFilters = {
  search?: string;
  serviceAreaId?: number;
  binType?: string;
};
