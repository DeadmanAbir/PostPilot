import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="container mx-auto h-16  flex items-center justify-between  fixed top-4 w-full bg-black px-5 rounded-full z-50">
      <div className="flex items-center gap-2">
   PostPilot
      </div>
      <Button className="bg-purple-600 hover:bg-purple-700">Get in touch</Button>
    </header>
  );
}

export default Navbar;