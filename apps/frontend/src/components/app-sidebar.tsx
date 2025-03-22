"use client"
import { BarChart2, Calendar, Home, Moon, Sun, } from "lucide-react"

import { motion } from "motion/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { Link } from "@tanstack/react-router"

import { useTheme } from "@/providers/theme-provider"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: `/dashboard`,
    icon: <Home className="size-10" />,
  },
  {
    title: "Sources",
    url: "/sources",
    icon: <BarChart2 />,
  },
  {
    title: "Scheduled Posts",
    url: `/scheduled`,
    icon: <Calendar />,
  }
]

const data = {
  user: {
    name: "Faisal",
    email: "m@example.com",
    avatar: "https://github.com/faisal004.png",
  },
}
export function AppSidebar() {
  const { setOpen, open } = useSidebar()
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar variant="floating" collapsible="icon" className="rounded-r-xl " onMouseLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)} >
      <SidebarContent>
        <SidebarGroup>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-3xl font-bold my-3 px-2 whitespace-nowrap"
            >
              Post Pilot
            </motion.div>
          )}

          <SidebarGroupContent>



            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-full" >
          <div className="flex items-center capitalize justify-between w-full">
            {open &&   theme}
           
            {theme === "dark" ? (
              <Sun className="size-5 transition-all" />
            ) : (
              <Moon className="size-5 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </div>
        </SidebarMenuButton>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
