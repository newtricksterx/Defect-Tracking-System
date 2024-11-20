import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

export function SearchBar() {
  return (
    <div className="flex items-center">
      <Input className="w-[200px]" type="text" placeholder="Search..." />
      <Button variant="outline">
        <Search />
      </Button>
    </div>
  );
}
