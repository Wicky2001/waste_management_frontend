import type { LucideIcon } from "lucide-react";

export type TableColumn = {
  field: string;
  headerName: string;
  width?: number;
};

export type TableRow = {
  id: string | number;
  [key: string]: unknown;
};

export type CommonTableProps = {
  cols?: TableColumn[];
  rows?: TableRow[];
  loading?: boolean;
  totalRecords?: number;
  lastSynced?: String;
  showEdit?: boolean;
  showDelete?: boolean;
  onEdit?: (row: TableRow) => void;
  onDelete?: (row: TableRow) => void;
  onSearchChange?: (value: string) => void;
  onLoadMore?: () => void;
};

export type TableGetRequestParams = {
  start: number;
  end: number;
  search: string;
};

export type PageHeaderProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
};
