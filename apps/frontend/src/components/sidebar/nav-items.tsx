"use client";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
"justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link to={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", "mr-2")} />
          {<span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};
