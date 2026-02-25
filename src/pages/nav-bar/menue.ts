import type { NavigationBarProps } from "../../common-shared/types";
import { Map, Trash, CircleUserRound, Truck } from "lucide-react";

const menuItems: NavigationBarProps[] = [
  {
    name: "Map",
    url: "/map",
    Icon: Map,
  },
  {
    name: "Bins",
    url: "/Bins",
    Icon: Trash,
  },
  {
    name: "Drivers",
    url: "/drivers",
    Icon: CircleUserRound,
  },
  {
    name: "Trucks",
    url: "/trucks",
    Icon: Truck,
  },
];

export default menuItems;
