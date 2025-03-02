import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Home, FileText, Calendar, BarChart2, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-muted p-4 hidden md:block">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Posts
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <BarChart2 className="mr-2 h-4 w-4" />
          Analytics
        </Button>
        <Link to="/sources">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" />
            Sources
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  );
}
