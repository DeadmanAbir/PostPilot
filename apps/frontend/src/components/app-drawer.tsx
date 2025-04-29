import { useState } from "react";
import { Menu, Moon, Sun, Plus } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";

import { groupedItems } from "./app-sidebar";
import { Button, buttonVariants } from "./ui/button";
import { NavUser } from "./nav-user";

import { useTheme } from "@/providers/theme-provider";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/providers/supabaseAuthProvider";

const AppDrawer = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = useLocation();
  const { user } = useAuth();

  const data = {
    user: {
      name: user?.user?.user_metadata.displayName ?? "Guest",
      email: user?.user?.email ?? "No email provided",
      avatar: user?.user?.user_metadata.profile_url ?? "/default-avatar.png",
    },
  };

  return (
    <div className="flex md:hidden relative">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="hidden">Open</DrawerTrigger>
        <DrawerContent className="h-[70vh] flex flex-col">
          <DrawerHeader className="px-4 py-2 border-b hidden">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-3xl font-bold"
            >
              Post Pilot
            </motion.div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <Link
                to="/dashboard"
                className={buttonVariants({
                  className: "w-full dark:text-white flex items-center ",
                })}
                onClick={() => setOpen(false)}
              >
                <Plus /> <span>Create Post </span>
              </Link>
            </div>

            <div className="px-4 flex flex-col space-y-6">
              {groupedItems.map((section) => (
                <div key={section.label}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    {section.label}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname.href === item.url;
                      return (
                        <Link
                          key={item.title}
                          to={item.url}
                          className={buttonVariants({
                            variant: isActive ? "drawer" : "ghost",
                            className:
                              "w-full  flex items-center justify-start gap-2  text-left",
                          })}
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center gap-2  w-full">
                            {item.icon}
                            {item.title}
                          </div>
                        </Link>
                      );
                    })}
                    {section.label === "Configuration" && (
                      <button
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className={buttonVariants({
                          variant: "ghost",
                          className:
                            "w-full justify-start gap-2 text-left flex ",
                        })}
                      >
                        <div className="flex items-center gap-2  w-full">
                          {theme === "dark" ? (
                            <Sun className="size-4 transition-all" />
                          ) : (
                            <Moon className="size-4 transition-all" />
                          )}
                          {theme}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DrawerFooter className="border-t p-4">
            <NavUser user={data.user} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-10 left-5 z-50 rounded-full"
        size="icon"
      >
        <Menu />
      </Button>
    </div>
  );
};

export default AppDrawer;
