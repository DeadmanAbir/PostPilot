"use client"
import { BarChart2, Calendar, Home,  } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

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


export function AppSidebar() {
 const { setOpen } =useSidebar()
  return (
    <Sidebar variant="floating" collapsible="icon" className="rounded-r-xl " onMouseLeave={()=>setOpen(false)} onMouseEnter={()=>setOpen(true)} >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-bold my-3 ">Post Pilot</SidebarGroupLabel>
          <SidebarGroupContent>

        

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
