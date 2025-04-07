import { PostGenerator } from "@/pages/dashboard/dashboardComponents/post-generator";
// import { SchedulingSidebar } from "@/pages/dashboard/dashboardComponents/scheduling-sidebar";

export function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden w-full ">
          <div className="w-full flex flex-col">
         
            <main id="imageLoad" className="flex-1 overflow-y-auto px-4">
              <PostGenerator />
            </main>
          </div>

          {/* <SchedulingSidebar /> */}
        </div>
        {/* <footer className="p-4 text-center text-sm text-muted-foreground">
          © 2025 LinkedIn Post Generator. All rights reserved.
        </footer> */}
      </div>
    </div>
  );
}
