import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (<footer className="border-t border-zinc-800 py-8">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">nugget</h1>
        <span className="text-xs text-muted-foreground">BY SONATO</span>
      </div>
      <Link to="" className="text-sm text-muted-foreground hover:text-white">
        Contact
      </Link>
    </div>
  </footer>);
}

export default Footer;