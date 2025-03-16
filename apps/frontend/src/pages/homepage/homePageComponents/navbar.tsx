import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="container mx-auto flex items-center justify-between py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">nugget</h1>
        <span className="text-xs text-muted-foreground">BY SONATO</span>
      </div>
      <Button className="bg-purple-600 hover:bg-purple-700">Get in touch</Button>
    </header>
  );
}

export default Navbar;