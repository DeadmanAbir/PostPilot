import type React from "react";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Pencil,
  LogOut,
  Linkedin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { Route } from "@/routes/_authenticated/profile";
import {
  connectLinkedinQuery,
  updateProfileQuery,
} from "@/lib/tanstack-query/query";
import { updateProfileFn } from "@/lib/tanstack-query/mutation";
import { ProfileUpdateResponse } from "@repo/common/types";

interface Course {
  id: string;
  title: string;
  lessons: number;
  duration: string;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  lessons: number;
  duration: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Welcome Orientation",
    lessons: 2,
    duration: "6min",
  },
  {
    id: "2",
    title: "Basic Financials - Overview and Startup Plan",
    lessons: 8,
    duration: "53min",
  },
  {
    id: "3",
    title: "Basic Financials - Forecast Sales & Expenses",
    lessons: 3,
    duration: "8min",
  },
  {
    id: "4",
    title: "Cash and Taxes",
    lessons: 2,
    duration: "6min",
  },
  {
    id: "5",
    title: "Next Steps",
    lessons: 2,
    duration: "6min",
  },
  {
    id: "6",
    title: "Optional Downloads",
    lessons: 2,
    duration: "6min",
  },
];

const tasks: Task[] = [
  {
    id: "1",
    title: "Welcome Orientation",
    dueDate: "Aug 28, 2023",
    lessons: 2,
    duration: "08min",
  },
  {
    id: "2",
    title: "Basic Financials - Overview and Startup Plan",
    dueDate: "Aug 28, 2023",
    lessons: 8,
    duration: "53min",
  },
];

export function ProfilePage() {
  const data = Route.useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState(data.name);
  const [profileImage, setProfileImage] = useState(data.profile_url);
  const [editName, setEditName] = useState("");
  const isLinkedinExpired =
    data.linkedin?.expires_at && new Date(data.expires_at) < new Date();

  const { refetch: connectLinkedinRefetch } = connectLinkedinQuery(
    user?.accessToken!
  );
  const { refetch: updateProfileRefetch } = updateProfileQuery(
    user?.accessToken!,
    {
      name: editName,
    }
  );

  const { mutate: updateProfile, isPending } = updateProfileFn(
    user?.accessToken!,
    {
      onSuccess: async (data: ProfileUpdateResponse) => {
        if (data.success) {
          const { error } = await supabase.auth.updateUser({
            data: { displayName: editName },
          });
          if (error) {
            console.error(error.message);
            alert("Error in updating profile:");
          }
        } else {
          alert("Profile update failed");
        }
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("Profile update failed");
      },
    }
  );

  const handleConnect = async () => {
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

  const handlePost = async () => {
    try {
      const response = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          text: "Hello from post pilot",
          visibility: "PUBLIC",
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to post to LinkedIn");
      }
    } catch (error) {
      console.error("LinkedIn post error:", error);
    }
  };

  const handleNameChange = async () => {
    if (editName.trim()) {
      setName(editName);
    }
    alert(editName);
    // const { data: renamedData, error: udateProfileError } =
    //   await updateProfileRefetch();

    // if (udateProfileError || !renamedData?.success) {
    //   console.error(udateProfileError);
    //   alert("Error in updating profile:");
    //   return;
    // }

    updateProfile({
      name: editName,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogOut = async () => {
    console.log("logging out");
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
    navigate({
      to: "/onboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <Button variant="ghost" className="m-4" asChild>
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-400">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={data?.profile_url ?? null} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mt-16 space-y-1">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-muted-foreground">{data.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 px-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">120</div>
            <div className="text-sm text-muted-foreground">
              Courses enrolled
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">2.8k</div>
            <div className="text-sm text-muted-foreground">
              Hours spent learning
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">26</div>
            <div className="text-sm text-muted-foreground">Tasks completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto mt-8 px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Courses Enrolled */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Courses enrolled</h2>
              <div className="space-y-2">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.lessons} lessons • {course.duration}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tasks Assigned */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tasks assigned</h2>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              Due {task.dueDate} • {task.lessons} lessons •{" "}
                              {task.duration}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-80 space-y-4">
            {/* LinkedIn Account Card */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your connected social accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">
                      {!isLinkedinExpired ? "Connected As" : "Not connected"}
                    </p>
                  </div>
                  {!isLinkedinExpired ? (
                    <div className="flex flex-col ">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={data.linkedin?.profile_pic ?? null}
                          alt={name}
                        />
                        <AvatarFallback>{name}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        DisConnect
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleConnect} variant="outline" size="sm">
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profile Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Change Name */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="name">Name</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-3 w-3 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit your name</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Label htmlFor="edit-name">Name</Label>
                          <Input
                            id="edit-name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder={name}
                            className="mt-2"
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setEditName("")}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleNameChange}>Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-sm text-muted-foreground">{name}</p>
                </div>

                <Separator />

                {/* Change Profile Picture */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Profile Picture</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-3 w-3 mr-2" />
                          Change
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change profile picture</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div className="flex justify-center">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={profileImage} alt={name} />
                              <AvatarFallback>{name}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <Label htmlFor="picture">Upload new picture</Label>
                            <Input
                              id="picture"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button>Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={profileImage} alt={name} />
                      <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-muted-foreground">
                      Current profile picture
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logout Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to log out?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will need to log in again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogOut}>
                        Log Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
            <Button onClick={handlePost} variant="default">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
