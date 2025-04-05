"use client";

import { Calendar, Moon, Sun, User, FilePlus, Send } from "lucide-react";
import { motion } from "motion/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link, useLocation } from "@tanstack/react-router";
import { useTheme } from "@/providers/theme-provider";
import { useAuth } from "@/providers/supabaseAuthProvider";

export function AppSidebar() {
  const { open } = useSidebar();
  const { theme, setTheme } = useTheme();
  const pathname = useLocation();
  const { user } = useAuth();

  const data = {
    user: {
      name: user?.user?.user_metadata.displayName!,
      email: user?.user?.email!,
      avatar: "https://github.com/faisal004.png",
    },
  };

  const groupedItems = [
    {
      label: "Create",
      items: [
        { title: "New Post", url: "/dashboard", icon: <FilePlus /> },
      ],
    },
    {
      label: "Posts",
      items: [
        { title: "Scheduled", url: "/scheduled", icon: <Calendar /> },
        { title: "Posted", url: "/posted", icon: <Send /> },
      ],
    },

  ];

  return (
    <Sidebar variant="floating" collapsible="icon" className="rounded-r-xl">
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-3xl font-bold my-3 px-2 whitespace-nowrap"
          >
            {open ? "Post Pilot" : "P"}
          </motion.div>
        </SidebarGroup>

        {groupedItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-base">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {group.items.map((item) => {
                  const isActive = pathname.href === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.url}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base">Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.href === "/profile"}>
                  <Link to="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* Theme Toggle Button */}
            <SidebarMenu className="mt-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full"
                >
                  <div className="flex items-center capitalize justify-start gap-1.5 w-full">
                
                    {theme === "dark" ? (
                      <Sun className="size-4 transition-all" />
                    ) : (
                      <Moon className="size-4 transition-all" />
                    )}
                        {open && theme}
                    <span className="sr-only">Toggle theme</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* <SidebarMenuButton
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full"
        >
          <div className="flex items-center capitalize justify-between w-full">
            {open && theme}
            {theme === "dark" ? (
              <Sun className="size-4 transition-all" />
            ) : (
              <Moon className="size-4 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </div>
        </SidebarMenuButton> */}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
