import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

const Profile = () => {
  return (
    <div className=" dark:bg-black dark:text-white">
      <div className="border-t dark:border-zinc-600  p-1">
        <Button
          variant={"ghost"}
          className="flex items-center justify-start gap-3 px-3 py-2 w-full rounded-none"
        >
          <Settings className="size-5" /> <div>Settings</div>
        </Button>
        <Link to="/profile">
          <Button
            variant={"ghost"}
            className="flex items-center justify-start gap-3 px-3 py-2 w-full rounded-none"
          >
            <User className="size-5" /> <div>Profile</div>
          </Button>
        </Link>
      </div>
      <div className="flex items-start gap-2 border-t dark:border-zinc-600 p-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>Faisal Husian</div>
      </div>
    </div>
  );
};

export default Profile;
