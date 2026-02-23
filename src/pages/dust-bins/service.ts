import type { TableGetRequestParams } from "../../common-shared/types";

const fetchGateways = async ({ start, end, search }: TableGetRequestParams) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const count = end - start;
  const records = Array.from({ length: count }).map((_, i) => ({
    id: `gw-${start + i}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: `${search || "Gateway"} Node #${start + i + 1}`,
    coordinates: `${(Math.random() * 90).toFixed(4)}, ${(Math.random() * 180).toFixed(4)}`,
    notes: "System-generated node data",
    createdAt: "2001-11-03",
  }));

  return {
    records,
    total: 500,
    timestamp: "2001-11-03",
  };
};

const deleteGateway = async (id: number) => {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
};

const updateGateway = async (id: number, data: any) => {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
};

export { fetchGateways, deleteGateway, updateGateway };
