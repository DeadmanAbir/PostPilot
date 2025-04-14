import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AccountCard } from "./account-card";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { fetchLinkedinQuery } from "@/lib/tanstack-query/query";

export function AccountsPage() {
  const { user } = useAuth();
  const { data, isPending } = fetchLinkedinQuery(user?.accessToken!);
  const isExpired = data?.linkedin
    ? data.linkedin.expires_at &&
      new Date(data.linkedin.expires_at) < new Date()
    : true;

  return (
    <div className="container mx-auto py-8 px-10 space-y-8 min-h-screen ">
      <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-800">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Ready to share your latest update?
            </h2>
            <p className="text-blue-100">
              Create a new post and engage with your network.
            </p>
          </div>
          <Button
            asChild
            className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 shadow-md transition-all duration-200 px-6 py-2 h-auto font-medium text-base"
          >
            <Link to="/dashboard">Create Post</Link>
          </Button>
        </div>
      </Card>

      {/* Connected Accounts Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Connected Accounts
          </h1>
          <p className="text-slate-500 dark:text-gray-400">Manage your social media accounts</p>
        </div>

        <div className="grid gap-4">
          <AccountCard
            isLoading={isPending}
            isExpired={isExpired}
            profile_url={data?.linkedin?.profile_pic}
          />

          {/* Add Account Card */}
          <Card className="cursor-not-allowed bg-red-500 overflow-hidden border border-dashed border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 dark:bg-gray-800">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-gray-700 rounded-lg">
                <PlusIcon className="h-8 w-8 text-slate-400 dark:text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Add another account
                </h3>
                <p className="text-slate-500 dark:text-gray-400">
                  Connect more social media platforms
                </p>
                <p className="text-slate-500 dark:text-gray-400">coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
