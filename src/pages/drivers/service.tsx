import type { TableGetRequestParams } from "../../common-shared/types";

const fetchDrivers = async ({ start, end, search }: TableGetRequestParams) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const count = end - start;

  const records = Array.from({ length: count }).map((_, i) => ({
    id: `drv-${start + i}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    org_id: 1,
    name: `${search || "Driver"} ${start + i + 1}`,
    phone: `07${Math.floor(10000000 + Math.random() * 89999999)}`,
    status: Math.random() > 0.2 ? 1 : 2, // 1 = Active, 2 = Offline
    created_at: "2001-11-03",
  }));

  return {
    records,
    total: 500,
    timestamp: "2001-11-03",
  };
};

const deleteDrivers = async (ids: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
};

const editDriver = async (id: number, data: any) => {
  await new Promise((resolve) => setTimeout(resolve));
  return { success: true };
};

export { fetchDrivers, deleteDrivers, editDriver };
