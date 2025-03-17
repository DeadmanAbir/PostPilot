import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className=" mx-auto h-16   fixed top-0 w-full   border-b-[2px] border-t-2 border-dotted  overflow-hidden bg-zinc-900 z-50">
      <div className="flex items-center justify-between  h-full container mx-auto px-3  border-r-[2px] border-l-2 border-dotted ">
        <div className="flex items-center gap-2">
          PostPilot
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Get in touch</Button>
      </div>

    </header>
  );
}

export default Navbar;