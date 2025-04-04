import { PostGenerator } from "@/pages/dashboard/dashboardComponents/post-generator";
import { SchedulingSidebar } from "@/pages/dashboard/dashboardComponents/scheduling-sidebar";
import { useAuth } from "@/providers/supabaseAuthProvider";

export function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div className="w-full flex flex-col">
            <div className="p-5 text-3xl font-bold tracking-wider ">
              Welcome {user?.user?.user_metadata.displayName} 👋
            </div>
            <main id="imageLoad" className="flex-1 overflow-y-auto p-4">
              <PostGenerator />
            </main>
          </div>

          <SchedulingSidebar />
        </div>
        <footer className="p-4 text-center text-sm text-muted-foreground">
          © 2024 LinkedIn Post Generator. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
