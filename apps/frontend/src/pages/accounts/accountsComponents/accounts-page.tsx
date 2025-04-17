import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { PlusCircle, PlusIcon } from "lucide-react";
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
      <Card className="space-y-6 p-5">
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
          <Card className={`w-full  mx-auto p-5 cursor-not-allowed  `}>
        <CardContent className="flex flex-col items-center justify-center  px-4">
          <div className={`rounded-full p-4 mb-4`}>
            <PlusCircle className={`h-12 w-12`} />
          </div>
          
          <CardTitle className={`text-xl font-semibold mb-2`}>
            Add another account
          </CardTitle>
          
          <CardDescription className={`text-center mb-6`}>
            Connect more social media platforms
          </CardDescription>
          
          <Button 
        disabled
          >
            Add Account
          </Button>
        </CardContent>
      </Card>
        </div>
      </Card>
    </div>
  );
}
