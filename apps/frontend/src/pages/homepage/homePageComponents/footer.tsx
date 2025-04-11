import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (<footer className="w-full border-t-2 border-blue-950/40">
    <div className="container mx-auto flex items-center justify-between  h-20 px-5  w-full">
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