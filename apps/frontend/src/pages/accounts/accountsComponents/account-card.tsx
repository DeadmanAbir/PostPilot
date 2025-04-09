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
import { MoreHorizontal, Trash2, ExternalLink, Linkedin } from "lucide-react";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { connectLinkedinQuery } from "@/lib/tanstack-query/query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
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
  const { refetch: connectLinkedinRefetch } = connectLinkedinQuery(
    user?.accessToken!
  );

  const { mutate: deleteAccount } = deleteLinkedinAccountFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        alert("account disconnected  successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in disconnecting account");
      },
    }
  );
  const handleClick = async () => {
    try {
      const { data: AuthData, error: newError } =
        await connectLinkedinRefetch();

      if (newError) {
        console.error("LinkedIn connection error:", newError);
        alert("LinkedIn connection error:");
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
    <Card className="overflow-hidden border border-slate-100 hover:shadow-md transition-all duration-200">
      <CardContent className="p-6 flex items-center gap-4">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-lg"
          style={{ backgroundColor: "blue" }}
        >
          <Linkedin className="h-8 w-8 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-slate-800">
              {"Linkedin"}
            </h3>
            {!isLoading && !isExpired && (
              <Badge variant="default" className="w-fit bg-green-400">
                Connected
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <p>loading....</p>
          ) : isExpired === false ? (
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profile_url} alt={"pp"} />
              <AvatarFallback>{"Abir"}</AvatarFallback>
            </Avatar>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 font-medium shadow-sm transition-all duration-200"
              onClick={handleClick}
            >
              Add Account
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                <Link to="/profile">View Profile</Link>
              </DropdownMenuItem>
              {!isExpired && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Disconnect</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Disconnect Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to disconnect your LinkedIn
                        account? This will stop any scheduled posts and require
                        reconnection to post to LinkedIn in the future.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
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
