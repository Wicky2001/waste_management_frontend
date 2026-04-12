import type { NavigationBarProps } from "../../common-shared/types";
import { Map, Trash, CircleUserRound, Truck } from "lucide-react";

const menuItems: NavigationBarProps[] = [
  {
    name: "Map",
    url: "/map",
    Icon: Map,
    roles: ["COUNCIL_ADMIN","DRIVER"],
  },
  {
    name: "Bins",
    url: "/bins",
    Icon: Trash,
    roles: ["COUNCIL_ADMIN","SERVICE_TECH"],
  },
  {
    name: "Drivers",
    url: "/drivers",
    Icon: CircleUserRound,
    roles: ["COUNCIL_ADMIN"],
  },
  {
    name: "Trucks",
    url: "/trucks",
    Icon: Truck,
    roles: ["COUNCIL_ADMIN"],
  },
];

export default menuItems;
