import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (<footer className="w-full ">
    <div className="container mx-auto flex items-center justify-between border-r-[2px] h-20 px-5 border-l-2 border-dotted w-full">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">PostPIlot</h1>

      </div>
      <Link to="" className="text-sm text-muted-foreground hover:text-white">
       Contact
      </Link>
    </div>
  </footer>);
}

export default Footer;