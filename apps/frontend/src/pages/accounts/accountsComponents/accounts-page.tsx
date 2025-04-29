import { PlusCircle } from "lucide-react";

import { AccountCard } from "./account-card";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { fetchLinkedinQuery } from "@/lib/tanstack-query/query";
import IntegrationLoading from "@/components/skeletons/integration-skeleton";
import Banner from "@/components/banner";

export function AccountsPage() {
  const { user } = useAuth();
  const { data, isPending } = fetchLinkedinQuery(user?.accessToken!);
  const isExpired = data?.linkedin
    ? data.linkedin.expires_at &&
      new Date(data.linkedin.expires_at) < new Date()
    : true;

  return (
    <div className="container mx-auto py-8 md:px-10 px-2 space-y-8 min-h-screen ">
      <Banner />

      {/* Connected Accounts Section */}
      {isPending ? (
        <IntegrationLoading />
      ) : (
        <Card className="space-y-6 p-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Connected Accounts
            </h1>
            <p className="text-slate-500 dark:text-gray-400">
              Manage your social media accounts
            </p>
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

                <Button className=" font-semibold text-white" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
}
