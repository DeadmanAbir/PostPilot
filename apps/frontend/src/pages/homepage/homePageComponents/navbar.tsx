import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/use-scroll";

const Navbar = () => {

  const scrolled  = useScrollTop()
  return (
    <header className=" mx-auto h-16   fixed top-2 w-full    overflow-hidden z-[999]">
      <div className={`flex items-center justify-between  h-full max-w-7xl mx-auto transition-all duration-300 rounded-full  px-8  backdrop-blur-md ${scrolled ? "bg-blue-400/20" :""} `}>
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
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">Get in touch</Button>
      </div>

    </header>
  );
}

export default Navbar;

