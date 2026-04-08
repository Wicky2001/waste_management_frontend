import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { TableRow } from '../../common-shared/types';
import { fetchDustBins } from './service';
import type { DustBinFilters, DustBinSortField, DustBinSortOrder } from './types';

const DEFAULT_LIMIT = 50;

export const useDustBins = (initialLimit = DEFAULT_LIMIT) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastSynced, setLastSynced] = useState('');

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<DustBinSortField | undefined>();
  const [sortOrder, setSortOrder] = useState<DustBinSortOrder | undefined>();
  const [filters, setFilters] = useState<DustBinFilters>({});

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const requestParams = useMemo(
    () => ({
      page,
      limit: initialLimit,
      search: searchText.trim() || undefined,
      sortField,
      sortOrder,
      serviceAreaId: filters.serviceAreaId,
      binType: filters.binType,
    }),
    [page, initialLimit, searchText, sortField, sortOrder, filters]
  );

  const cancelPendingRequest = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const loadDustBins = useCallback(async () => {
    cancelPendingRequest();

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const requestId = ++requestIdRef.current;

    setLoading(true);

    try {
      const result = await fetchDustBins(requestParams, {
        signal: controller.signal,
      });

      if (requestId !== requestIdRef.current) {
        return;
      }

      const nextRows = result.data.records as TableRow[];

      const mode = requestParams.page === 1 ? 'replace' : 'append';

      setRows((currentRows) =>
        mode === 'append' ? [...currentRows, ...nextRows] : nextRows
      );
      setTotalRecords(result.data.total);
      setLastSynced(result.data.timestamp || '');
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      let message = 'Failed to fetch bins. Please try again.';
      if (axios.isAxiosError(error)) {
        message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          message;
      }

      toast.error(message, {
        position: 'bottom-right',
      });

      console.error('Failed to fetch dust bins', error);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [requestParams]);

  useEffect(() => {
    loadDustBins();

    return () => {
      cancelPendingRequest();
    };
  }, [loadDustBins]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchText(value);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loading || rows.length >= totalRecords) {
      return;
    }
    setPage((currentPage) => currentPage + 1);
  }, [loading, rows.length, totalRecords]);

  const handleSortChange = useCallback(
    (field: string, order: 'asc' | 'desc' | null) => {
      setSortField(order ? (field as DustBinSortField) : undefined);
      setSortOrder(order ? (order.toUpperCase() as DustBinSortOrder) : undefined);
      setPage(1);
    },
    []
  );

  const updateFilters = useCallback((nextFilters: DustBinFilters) => {
    setFilters(nextFilters);
    setPage(1);
  }, []);

  return {
    loading,
    rows,
    totalRecords,
    lastSynced,
    searchText,
    handleSearchChange,
    handleLoadMore,
    handleSortChange,
    setFilters: updateFilters,
  };
};