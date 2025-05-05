import type React from 'react';
import { useState } from 'react';
import {
  ChevronRight,
  Pencil,
  LogOut,
  Linkedin,
  MoreHorizontal,
  Settings,
  Calendar,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { ProfileUpdateResponse } from '@repo/common/types';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';

import { NoPostsCard } from './profilePageComponents/empty-posts';
import { ComingSoonCard } from './profilePageComponents/coming-soon-schedule';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
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
} from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/providers/supabaseAuthProvider';
import { Route } from '@/routes/_authenticated/_dashboard/profile';
import { updateProfileFn } from '@/lib/tanstack-query/mutation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ProfilePage() {
  const data = Route.useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState(data.name);
  const [open, setOpen] = useState({
    nameModal: false,
    profileModal: false,
  });
  const [profileImage, setProfileImage] = useState(data.profile_url);
  const [newprofileImage, setNewProfileImage] = useState<File>();
  const [editName, setEditName] = useState('');

  const isExpired = data?.linkedin
    ? data.linkedin.expires_at &&
      new Date(data.linkedin.expires_at) < new Date()
    : true;

  const { mutate: updateProfile } = updateProfileFn(user?.accessToken!, {
    onSuccess: async (data: ProfileUpdateResponse) => {
      if (data.success && editName.length > 0) {
        const { error } = await supabase.auth.updateUser({
          data: { displayName: editName },
        });
        if (error) {
          console.error(error.message);
          toast.error('Error in updating profile:');
        }
        toast.success('profile name updated successfully');
      } else if (data.success) {
        toast.success('profile image updated successfully');
        await supabase.auth.updateUser({
          data: { profile_url: profileImage },
        });
      } else {
        toast.error('Profile update failed');
      }
    },
    onError: (error: unknown) => {
      console.error(error);
      toast.error('Profile update failed');
    },
  });

  const handleNameChange = async () => {
    if (editName.trim()) {
      setName(editName);
    }

    updateProfile({
      name: editName,
    });
    setOpen((prev) => ({ ...prev, nameModal: false }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNewProfileImage(file!);
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
    navigate({
      to: '/onboard',
    });
  };

  const handlePictureChange = async () => {
    const profileData = await uploadToSupabase('post-pilot');
    setProfileImage(profileData.profile_url);
    updateProfile(profileData);
    setOpen((prev) => ({ ...prev, profileModal: false }));
  };

  const uploadToSupabase = async (bucket: string) => {
    try {
      const fileExtension = newprofileImage?.name.split('.').pop();
      const fileName = `${nanoid()}.${fileExtension}`;
      const filePath = `${user?.user?.id}/${fileName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, newprofileImage!);

      if (error) {
        console.error('Error uploading file:', error.message);
        toast.error('error in uploading file');
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { profile_url: urlData.publicUrl };
    } catch (error) {
      console.error('Error in file upload process:', error);
      throw error;
    }
  };

  const formatDate = (date: string) => {
    const dateObject: Date = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = String(dateObject.getFullYear()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-400">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mt-16 space-y-1">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-muted-foreground">{data.email}</p>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto mt-8 px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Courses Enrolled */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Total Posts</h2>
              <div className="space-y-2">
                {data?.post?.map(
                  (
                    post: {
                      created_at: string;
                      media: string[];
                      post_content: string;
                    },
                    index: number,
                  ) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-normal line-clamp-1 leading-loose ">
                                {post.post_content}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(post.created_at)}{' '}
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            onClick={() => {
                              navigate({
                                to: '/posted',
                              });
                            }}
                            className="h-5 w-5 text-muted-foreground"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}

                {!data?.post || data.post.length === 0 ? <NoPostsCard /> : null}
              </div>
            </div>

            {/* Tasks Assigned */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
              <div className="space-y-2">
                <CardContent className="p-0">
                  <ComingSoonCard />
                </CardContent>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-80 space-y-4">
            {/* LinkedIn Account Card */}
            {!isExpired && (
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
                      <p className="text-sm font-medium leading-none">
                        LinkedIn
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Connected As
                      </p>
                    </div>
                    <div className="flex ">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={data.linkedin?.profile_pic ?? null}
                          alt={name}
                        />
                        <AvatarFallback>{name}</AvatarFallback>
                      </Avatar>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <Link to="/integration">Settings</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                    <Dialog
                      open={open.nameModal}
                      onOpenChange={(isOpen) =>
                        setOpen((prev) => ({ ...prev, nameModal: isOpen }))
                      }
                    >
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
                            onClick={() => setEditName('')}
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
                    <Dialog
                      open={open.profileModal}
                      onOpenChange={(isOpen) =>
                        setOpen((prev) => ({ ...prev, profileModal: isOpen }))
                      }
                    >
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
                          <Button onClick={handlePictureChange}>Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={profileImage} alt={name} />
                      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
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
          </div>
        </div>
      </div>
    </div>
  );
}
