import { CalendarCog, LayoutDashboard, ListTodo, Music2Icon, User } from "lucide-react";

const basePath = "/dashboard";

export const MttNavItems = [
  {
    icon: <LayoutDashboard />,
    path: "",
    label: "Home",
    basePath,
  },
  {
    icon: <User />,
    path: "/clients",
    label: "Client",
    basePath,
  },
  {
    icon: <ListTodo />,
    path: "/items",
    label: "Items",
    basePath,
  },
  {
    icon: <CalendarCog />,
    path: "/events",
    label: "Events",
    basePath,
  },
];

