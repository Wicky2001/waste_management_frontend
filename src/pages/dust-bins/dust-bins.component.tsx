import { useEffect, useState, useRef, useCallback } from "react";
import type { TableRow } from "../../common-shared/types";
import CommonTable from "../../common-shared/table/table-component";
import { fetchGateways } from "./service";

const DustBins = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRow[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastSynced, setLastSynced] = useState<string>("");
  const [searchText, setSearchText] = useState("");

  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false);
  const pageSize = 50;

  const loadData = useCallback(
    async (isInitial = false, query = searchText) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoading(true);

      const start = isInitial ? 0 : offsetRef.current;
      const end = start + pageSize;

      try {
        const result = await fetchGateways({
          start,
          end,
          search: query,
        });
        if (isInitial) {
          setData(result.records as TableRow[]);
          offsetRef.current = pageSize;
        } else {
          setData((prev) => [...prev, ...result.records] as TableRow[]);
          offsetRef.current += pageSize;
        }

        setTotalRecords(result.total);
        setLastSynced(result.timestamp);
      } catch (error) {
        console.error("Failed to fetch gateways", error);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [searchText],
  );

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  const handleSearch = useCallback((query: string) => {
    setSearchText(query);
    offsetRef.current = 0;
  }, []);

  const columns = [
    { headerName: "Name", field: "name", width: 250 },
    { headerName: "Coordinates", field: "coordinates", width: 220 },
    { headerName: "Notes", field: "notes" },
    { headerName: "Created At", field: "createdAt", width: 250 },
  ];

  return (
    <div className="h-full bg-slate-50 flex flex-col overflow-hidden">
      <div className="flex-grow flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-hidden">
        <header className="mb-6 flex-shrink-0">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Fleet Monitoring
          </h1>
          <p className="text-slate-500">
            Professional light interface with automated data fetching.
          </p>
        </header>

        <div className="flex-grow overflow-hidden">
          <CommonTable
            cols={columns}
            rows={data}
            loading={loading}
            totalRecords={totalRecords}
            lastSynced={lastSynced}
            showEdit={true}
            showDelete={true}
            onEdit={(row) => console.log("Edit", row)}
            onDelete={(row) => console.log("Delete", row)}
            onSearchChange={handleSearch}
            onLoadMore={() => loadData(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default DustBins;
