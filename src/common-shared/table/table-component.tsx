import React, { useState, type UIEvent } from "react";

import {
  ChevronDown,
  ChevronUp,
  Clock,
  Edit2,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";

import type { TableColumn, CommonTableProps, TableRow } from "../types";

const CommonTable = React.memo(
  ({
    cols = [],
    rows = [],
    loading = false,
    totalRecords = 0,
    lastSynced,
    showEdit = false,
    showDelete = false,
    onEdit,
    onDelete,
    onSearchChange,
    onLoadMore,
  }: CommonTableProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const isNearBottom = scrollTop + clientHeight + 100 > scrollHeight;

      if (isNearBottom && !loading && rows.length < totalRecords) {
        onLoadMore?.();
      }
    };

    const toggleSort = (field: string) => {
      const nextOrder =
        sortField === field && sortOrder === "asc"
          ? "desc"
          : sortField === field && sortOrder === "desc"
            ? null
            : "asc";
      setSortField(nextOrder ? field : null);
      setSortOrder(nextOrder);
    };

    const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      onSearchChange?.(value);
    };

    const renderCellValue = (value: unknown) => {
      if (value === null || value === undefined || value === "") {
        return "--";
      }

      return String(value);
    };

    return (
      <div className="flex flex-col h-full w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            {lastSynced && (
              <div className="flex items-center gap-1.5 font-medium">
                <Clock size={14} />
                <span>Synced: {lastSynced}</span>
              </div>
            )}
            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <span className="px-2 py-1 bg-slate-100 rounded-md font-bold text-slate-700">
              {rows.length} / {totalRecords}
            </span>
          </div>
        </div>

        {/* Main Scrollable Table Body */}
        <div
          onScroll={handleScroll}
          className="overflow-auto grow relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
        >
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-30 shadow-sm">
              <tr className="bg-slate-50">
                {cols.map((col: TableColumn) => (
                  <th
                    key={col.field}
                    onClick={() => toggleSort(col.field)}
                    className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors border-b border-slate-200"
                    style={{ width: col.width ? `${col.width}px` : "auto" }}
                  >
                    <div className="flex items-center gap-2">
                      {col.headerName}
                      <div className="flex flex-col text-slate-300">
                        <ChevronUp
                          size={10}
                          className={
                            sortField === col.field && sortOrder === "asc"
                              ? "text-blue-500"
                              : ""
                          }
                        />
                        <ChevronDown
                          size={10}
                          className={
                            sortField === col.field && sortOrder === "desc"
                              ? "text-blue-500"
                              : ""
                          }
                        />
                      </div>
                    </div>
                  </th>
                ))}
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right border-b border-slate-200 bg-slate-50 w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row: TableRow) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {cols.map((col) => (
                    <td
                      key={`${row.id}-${col.field}`}
                      className="p-4 text-sm text-slate-700 truncate max-w-xs"
                    >
                      {renderCellValue(row[col.field])}
                    </td>
                  ))}
                  <td className="p-4 text-right w-32">
                    <div className="flex items-center justify-end gap-2">
                      {showEdit && (
                        <button
                          onClick={() => onEdit?.(row)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                      {showDelete && (
                        <button
                          onClick={() => onDelete?.(row)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="sticky bottom-0 left-0 right-0 p-4 flex justify-center items-center bg-white/80 backdrop-blur-sm z-30">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-slate-200 rounded-full shadow-lg">
                <Loader2 className="animate-spin text-blue-600" size={18} />
                <span className="text-sm font-medium text-slate-600">
                  Loading records...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default CommonTable;
