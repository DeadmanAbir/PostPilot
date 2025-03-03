import { ModeToggle } from "../../../components/mode-toggle";
import { Button } from "../../../components/ui/button";
import { LinkedinIcon as LinkedInIcon } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <LinkedInIcon className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">LinkedIn Post Generator</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline">Connect LinkedIn</Button>
        <ModeToggle />
      </div>
    </header>
  );
}
