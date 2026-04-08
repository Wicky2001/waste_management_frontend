import CommonTable from "../../common-shared/table/table-component";
import PageHeader from "../../common-shared/page-header/header";
import { Trash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    { headerName: "Bin Code", field: "binCode", width: 220, sortable: true },
    { headerName: "Bin Type", field: "binType", width: 180, sortable: true },
    {
      headerName: "ServiceName",
      field: "serviceAreaName",
      width: 180,
      sortable: true,
    },
    {
      headerName: "Service Area Name",
      field: "serviceAreaName",
      width: 240,
      sortable: true,
    },
    { headerName: "Created At", field: "createdAt", width: 220, sortable: true },
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

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </div>
  );
};

export default DustBins;
