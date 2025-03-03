"use client";



import { cn } from "@/lib/utils";
import { selectSidebarCollapsed, useAppSelector } from "../../store/index";

interface ContainerProps {
  children: React.ReactNode;
};

export const Container = ({
  children,
}: ContainerProps) => {
    const collapsed = useAppSelector(selectSidebarCollapsed);



  return (
    <div className={cn(
        "flex-1 overflow-hidden transition-all duration-200 ease-in-out",
        collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
      )}>
      {children}
    </div>
  );
};