import { Home, PlusCircle, List, Settings, Database } from "lucide-react";

// This is sample data.
export const data = {
  versions: ["1.0.0"],
  navMain: [
    {
      title: "Basic",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
        },
      ],
    },
    {
      title: "Assets",
      url: "#",
      items: [
        {
          title: "Add a Asset",
          url: "/add-asset",
          icon: PlusCircle,
        },
        {
          title: "List of Assets",
          url: "/assets",
          icon: List,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "Database Status",
          url: "/db-test",
          icon: Database,
        },
        {
          title: "Configurações",
          url: "#",
          icon: Settings,
        },
      ],
    },
  ],
};
