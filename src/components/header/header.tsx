import { Search, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { Catalog } from "./catalog";

export function Header() {
  return (
    <div className="flex justify-between items-center w-full h-20 p-5">
      <p className="font-medium text-xl">Universam online magazin</p>

      <span className="flex gap-2">
        <Catalog />
        <Button>
          <Search size={40} />
        </Button>
        <Button>
          <ShoppingBasket size={40} />
        </Button>
      </span>
    </div>
  );
}
