import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Link } from "@tanstack/react-router";

const AppDrawer = () => {
    const [open, setOpen] = useState(false)
    return (<div className="flex md:hidden   relative ">
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="hidden">Open</DrawerTrigger>
            <DrawerContent className="h-[85vh] flex flex-col">
            <DrawerHeader className="hidden">
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="hidden">
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
                <div className="flex-1 overflow-y-auto ">
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
          </div>
            </DrawerContent>
        </Drawer>
        <Button onClick={() => setOpen(true)} className="fixed bottom-10 left-5 z-50 rounded-full" size={"icon"} >
            <Menu/>
        </Button>
    </div>);
}

export default AppDrawer;