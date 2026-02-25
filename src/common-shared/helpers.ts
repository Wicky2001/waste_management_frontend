export const Mode = {
  ADD: 0,
  EDIT: 1,
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

export const Statuses = [
  { key: "Active", value: 1, color: "#C00707" },
  { key: "Offline", value: 2, color: "#48A111" },
];
