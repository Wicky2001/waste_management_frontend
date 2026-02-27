export const Mode = {
  ADD: 0,
  EDIT: 1,
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

export const Statuses = [
  { key: "Active", value: 1, color: "#C00707" },
  { key: "Offline", value: 2, color: "#48A111" },
];

export const getStatusIcon = (value: number) => {
  const statusObject = Statuses.find((status) => status.value === value);

  if (statusObject) {
    return (
      <div className="flex flex-row items-center gap-2">
        <div style={{ paddingTop: "1.75px" }}>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusObject.color }}
          />
        </div>
        <div className="text-sm font-medium">{statusObject.key}</div>
      </div>
    );
  }

  return <span className="text-sm text-slate-400">--</span>;
};
