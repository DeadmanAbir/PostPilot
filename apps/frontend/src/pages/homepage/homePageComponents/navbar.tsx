import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/use-scroll";

const Navbar = () => {

  const scrolled  = useScrollTop()
  return (
    <header className=" mx-auto h-16   fixed top-2 w-full    overflow-hidden z-50">
      <div className={`flex items-center justify-between  h-full container mx-auto transition-all duration-300 rounded-full  px-8  backdrop-blur-md ${scrolled ? "bg-accent/20" :""} `}>
        <div className="flex items-center gap-2 text-3xl font-bold tracking-wider">
          PostPilot
        </div>
        {/* <div className="flex items-center gap-3 bg-black/20 backdrop-blur-none py-2 px-5 rounded-full border border-accent/90 overflow-hidden">
          <div>
            Home
          </div>
          <div>
            Home
          </div><div>
            Home
          </div>
        </div> */}
        <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">Get in touch</Button>
      </div>

    </header>
  );
}

export default Navbar;

