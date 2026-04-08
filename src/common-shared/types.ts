import type { LucideIcon } from "lucide-react";

export type TableColumn = {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
};

export type TableRow = {
  id: string;
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
  showAdd?: boolean;
  onEdit?: (row: TableRow) => void;
  onDelete?: (ids: string[]) => void;
  onAdd?: () => void;
  onSearchChange?: (value: string) => void;
  onLoadMoreRecords?: () => void;
  onSortChange?: (
    field: string,
    order: "asc" | "desc" | null,
  ) => void;
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
  IconColor?: string;
};

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

export type NavigationBarProps = {
  name: string;
  url: string;
  Icon: LucideIcon;
};
