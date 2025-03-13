import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User } from "lucide-react";
import { Button } from "../ui/button";

const Profile = () => {
    return (<div className=" dark:bg-zinc-900 dark:text-white">
        <div className="border-t border-zinc-600  p-1">
            <Button variant={"ghost"} className="flex items-center justify-start gap-3 px-3 py-2 w-full rounded-none">
                <Settings className="size-5" /> <div>
                    Settings
                </div>
            </Button>
            <Button variant={"ghost"} className="flex items-center justify-start gap-3 px-3 py-2 w-full rounded-none">
                <User className="size-5" /> <div>
                    Profile
                </div>
            </Button>
        </div>
        <div className="flex items-start gap-2 border-t border-zinc-600 p-3">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                Faisal Husian
            </div>
        </div>


    </div>);
}

export default Profile;