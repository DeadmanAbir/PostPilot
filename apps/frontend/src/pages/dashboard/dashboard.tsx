import { Header } from "@/pages/dashboard/dashboardComponents/header";
import { PostGenerator } from "@/pages/dashboard/dashboardComponents/post-generator";
import { SchedulingSidebar } from "@/pages/dashboard/dashboardComponents/scheduling-sidebar";


export function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4">
            <PostGenerator />
          </main>
          <SchedulingSidebar />
        </div>
        <footer className="p-4 text-center text-sm text-muted-foreground">
          © 2024 LinkedIn Post Generator. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
