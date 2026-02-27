import type { TableGetRequestParams } from "../../common-shared/types";

const fetchTrucks = async ({ start, end, search }: TableGetRequestParams) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const count = end - start;

  const plates = ["ABC", "XYZ", "DEF", "GHI", "JKL", "MNO", "PQR", "STU"];
  const statuses = ["active", "inactive", "maintenance"];

  const records = Array.from({ length: count }).map((_, i) => ({
    id: `trk-${start + i}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    org_id: 1,
    number_plate: `${plates[Math.floor(Math.random() * plates.length)]}-${1000 + start + i}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    capacity_liters: Math.random() > 0.3 ? Math.floor(2000 + Math.random() * 8000) : null,
    created_at: "2025-01-15",
  }));

  return {
    records,
    total: 500,
    timestamp: "2025-01-15",
  };
};

const deleteTrucks = async (ids: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
};

const editTruck = async (id: number, data: any) => {
  await new Promise((resolve) => setTimeout(resolve));
  return { success: true };
};

export { fetchTrucks, deleteTrucks, editTruck };
