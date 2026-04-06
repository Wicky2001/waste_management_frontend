import CommonTable from "../../common-shared/table/table-component";
import PageHeader from "../../common-shared/page-header/header";
import { Trash } from "lucide-react";
import { useDustBins } from "./use-dust-bins";

const DustBins = () => {
  const {
    loading,
    rows,
    totalRecords,
    lastSynced,
    handleSearchChange,
    handleLoadMore,
    handleSortChange,
  } = useDustBins();

  const columns = [
    { headerName: "Bin Code", field: "binCode", width: 220 },
    { headerName: "Bin Type", field: "binType", width: 180 },
    {
      headerName: "Service Area Id",
      field: "serviceAreaId",
      width: 180,
    },
    { headerName: "Service Area Name", field: "serviceAreaName", width: 240 },
    { headerName: "Created At", field: "createdAt", width: 220 },
  ];

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden">
      <div className="w-full flex flex-col p-4 sm:p-6  overflow-hidden">
        <PageHeader
          title="Bins Management"
          description="Monitor all your garbage bins in one place. View details, track sensor status, and keep your waste collection organized."
          Icon={Trash}
        />

        <div className="w-full overflow-hidden">
          <CommonTable
            cols={columns}
            rows={rows}
            loading={loading}
            totalRecords={totalRecords}
            lastSynced={lastSynced}
            showEdit={false}
            showDelete={false}
            onSearchChange={handleSearchChange}
            onLoadMoreRecords={handleLoadMore}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DustBins;
