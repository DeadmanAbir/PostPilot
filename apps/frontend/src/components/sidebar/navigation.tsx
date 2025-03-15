"use client";

import { useLocation } from "@tanstack/react-router";
import { BarChart2, Calendar, Home } from "lucide-react";
import { NavItem } from "./nav-items";

export const Navigation = () => {
  const location = useLocation();

  const routes = [
    {
      label: "Dashboard",
      href: `/dashboard`,
      icon: Home,
    },
    {
      label: "Sources",
      href: `/sources`,
      icon: BarChart2,
    },
    {
      label: "Scheduled Posts",
      href: `/scheduled`,
      icon: Calendar,
    },
  ];

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={location.pathname === route.href}
        />
      ))}
    </ul>
  );
};
