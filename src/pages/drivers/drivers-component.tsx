import { useEffect, useState, useRef, useCallback } from "react";
import type { TableRow } from "../../common-shared/types";
import { Mode } from "../../common-shared/helpers";
import CommonTable from "../../common-shared/table/table-component";
import PageHeader from "../../common-shared/page-header/header";
import { fetchDrivers } from "./service";
import { CircleUserRound } from "lucide-react";
import SideBar from "../../common-shared/side-bar/side-bar";
import { deleteDrivers } from "./service";
import DriverForm from "./form";

const Drivers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRow[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastSynced, setLastSynced] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [selectedMode, setSelectedMode] = useState<Mode>(Mode.ADD);

  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false);
  const pageSize = 50;

  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  // edit props
  const [patchData, setPatchData] = useState<TableRow | null>(null);

  const onEditClicked = async (data: TableRow) => {
    setSelectedMode(Mode.EDIT);
    setIsSideBarVisible(true);
    setPatchData(data);
  };

  const onDeleteClicked = async (ids: string[]) => {
    await deleteDrivers(ids);
  };

  const onAddClicked = () => {
    setSelectedMode(Mode.ADD);
    setIsSideBarVisible(true);
  };

  const onCloseSideBar = () => {
    setIsSideBarVisible(false);
  };

  const loadData = useCallback(
    async (isInitial = false, query = searchText) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoading(true);

      const start = isInitial ? 0 : offsetRef.current;
      const end = start + pageSize;

      try {
        const result = await fetchDrivers({
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
    { headerName: "Phone", field: "phone", width: 220 },
    {
      headerName: "Status",
      field: "status",
      width: 220,
    },
    { headerName: "Created At", field: "created_at", width: 220 },
  ];

  return (
    <>
      <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden">
        <div className="w-full flex flex-col p-4 sm:p-6  overflow-hidden">
          <PageHeader
            title="Drivers"
            description="Manage all drivers in one place. Add new drivers, update their details, and assign them to trucks to keep your waste collection running smoothly."
            Icon={CircleUserRound}
          />

          <div className="w-full overflow-hidden">
            <CommonTable
              cols={columns}
              rows={data}
              loading={loading}
              totalRecords={totalRecords}
              lastSynced={lastSynced}
              showEdit={true}
              showDelete={true}
              showAdd={true}
              onEdit={onEditClicked}
              onDelete={onDeleteClicked}
              onAdd={onAddClicked}
              onSearchChange={handleSearch}
              onLoadMoreRecords={() => loadData(false)}
            />
          </div>
        </div>
      </div>

      <SideBar
        isOpen={isSideBarVisible}
        onClose={onCloseSideBar}
        title={selectedMode == Mode.ADD ? "Add" : "Edit"}
        description={
          selectedMode == Mode.ADD
            ? "Add new driver"
            : "Edit existing driver details"
        }
      >
        <DriverForm
          mode={selectedMode}
          patchData={patchData}
          onSubmitSuccess={() => console.log("hello")}
        />
      </SideBar>
    </>
  );
};

export default Drivers;
