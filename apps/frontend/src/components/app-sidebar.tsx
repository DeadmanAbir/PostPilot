"use client";

import {
  Calendar,
  Moon,
  Sun,
  User,
  FilePlus,
  Send,
  Book,
  SquareDashedMousePointer,
} from "lucide-react";
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
import { buttonVariants } from "./ui/button";

export function AppSidebar() {
  const { open } = useSidebar();
  const { theme, setTheme } = useTheme();
  const pathname = useLocation();
  const { user } = useAuth();

  const data = {
    user: {
      name: user?.user?.user_metadata.displayName!,
      email: user?.user?.email!,
      avatar: user?.user?.user_metadata.profile_url!,
    },
  };

  const groupedItems = [
    {
      label: "Create",
      items: [{ title: "New Post", url: "/dashboard", icon: <FilePlus /> }],
    },
    {
      label: "Posts",
      items: [
        { title: "Scheduled", url: "/scheduled", icon: <Calendar /> },
        { title: "Sources", url: "/sources", icon: <Book /> },
        { title: "Posted", url: "/posted", icon: <Send /> },
      ],
    },
    {
      label: "Configuration",
      items: [
        { title: "Profile", url: "/profile", icon: <User /> },
        {
          title: "Integration", url: "/integration", icon: <SquareDashedMousePointer />
        },
      ],
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="p-2">
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
        <div className="flex items-center justify-center px-3 py-2">
          <Link
            to="/dashboard"
            className={buttonVariants({
              className: "w-full ",
            })}
          >
            Create Post
          </Link>
        </div>
        {groupedItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-base">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="my-2">
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
              {group.label === "Configuration" && <SidebarMenu className="mt-1">
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
              </SidebarMenu>}

            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>

          <SidebarGroupContent>




            {/* Theme Toggle Button */}

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
