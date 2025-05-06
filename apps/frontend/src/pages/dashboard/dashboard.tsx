import { Helmet } from 'react-helmet-async';

import { PostGenerator } from '@/pages/dashboard/dashboardComponents/post-generator';
// import { SchedulingSidebar } from "@/pages/dashboard/dashboardComponents/scheduling-sidebar";

export function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | PostPilot</title>
        <meta
          name="description"
          content="Your dashboard for managing posts and campaigns in PostPilot."
        />
        <meta property="og:title" content="Dashboard | PostPilot" />
        <meta
          property="og:description"
          content="Your dashboard for managing posts and campaigns in PostPilot."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://postpilot.agentgenesis.dev/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard | PostPilot" />
        <meta
          name="twitter:description"
          content="Your dashboard for managing posts and campaigns in PostPilot."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Helmet>
      <div className="flex h-screen bg-background">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-1 overflow-hidden w-full ">
            <div className="w-full flex flex-col">
              <main id="imageLoad" className="flex-1 overflow-y-auto  ">
                <PostGenerator />
              </main>
            </div>
            {/* <SchedulingSidebar /> */}
          </div>
          {/* <footer className="p-4 text-center text-sm text-muted-foreground">
            &copy; 2025 LinkedIn Post Generator. All rights reserved.
          </footer> */}
        </div>
      </div>
    </>
  );
}
