import { Home } from "lucide-react";

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
            url: "/",
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
            url: "#",
          },
          {
            title: "List of Assets",
            url: "/assets",
          },
         
        ],
      },
     
    ],
  }