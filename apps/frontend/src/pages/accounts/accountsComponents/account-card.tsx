import { MoreHorizontal, Trash2, ExternalLink, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { connectLinkedinQuery } from "@/lib/tanstack-query/query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteLinkedinAccountFn } from "@/lib/tanstack-query/mutation";

interface AccountCardProps {
  profile_url?: string;
  isLoading: boolean;
  isExpired?: boolean;
}

export function AccountCard({
  profile_url,
  isLoading,
  isExpired,
}: AccountCardProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { refetch: connectLinkedinRefetch } = connectLinkedinQuery(
    user?.accessToken!,
  );

  const { mutate: deleteAccount } = deleteLinkedinAccountFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        toast.success("account disconnected  successfully");

        queryClient.invalidateQueries({ queryKey: ["linkedin"] });
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in disconnecting account");
      },
    },
  );
  const handleClick = async () => {
    try {
      const { data: AuthData, error: newError } =
        await connectLinkedinRefetch();

      if (newError) {
        console.error("LinkedIn connection error:", newError);
        toast.error("LinkedIn connection error:");
        return;
      }

      window.location.href = AuthData?.authUrl!;
    } catch (error) {
      console.error("LinkedIn connection error:", error);
    }
  };

  const handleDelete = () => {
    deleteAccount();
  };
  return (
    <Card className="overflow-hidden border border-slate-100 dark:border-blue-700 hover:shadow-md transition-all duration-200 dark:bg-blue-900/20 p-2">
      <CardContent className="px-2 md:px-6 py-4 flex items-center gap-4">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-2xl"
          style={{ backgroundColor: "#0A66C2" }}
        >
          <Linkedin className="h-8 w-8 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              {"Linkedin"}
            </h3>
            {!isLoading && !isExpired && (
              <Badge
                variant="default"
                className="w-fit bg-green-500 dark:bg-green-600 text-white rounded-full"
              >
                Connected
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <p className="text-slate-600 dark:text-gray-400">loading....</p>
          ) : isExpired === false ? (
            <Avatar className="size-14 border-4 border-background dark:border-gray-700">
              <AvatarImage src={profile_url} alt={"pp"} />
              <AvatarFallback className="dark:bg-gray-700 dark:text-gray-200">
                {"Abir"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-800 font-medium shadow-sm transition-all duration-200"
              onClick={handleClick}
            >
              Add Account
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer dark:focus:bg-gray-700">
                <ExternalLink className="mr-2 h-4 w-4" />
                <Link to="/profile">View Profile</Link>
              </DropdownMenuItem>
              {!isExpired && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 dark:focus:bg-gray-700"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Disconnect</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="dark:text-white">
                        Disconnect Account
                      </AlertDialogTitle>
                      <AlertDialogDescription className="dark:text-gray-400">
                        Are you sure you want to disconnect your LinkedIn
                        account? This will stop any scheduled posts and require
                        reconnection to post to LinkedIn in the future.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                      >
                        Disconnect
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
