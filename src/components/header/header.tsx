import { ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SearchProduct } from "./search";

export function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full h-20 py-5 px-2">
      <p className="font-medium text-md lg:text-xl">Universam online magazin</p>

      <span className="flex gap-2">
        <SearchProduct />
        <Button onClick={() => navigate("/cart")}>
          <ShoppingBasket size={40} />
        </Button>
      </span>
    </div>
  );
}
