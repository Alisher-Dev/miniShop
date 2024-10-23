import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Logs } from "lucide-react";

export function Catalog() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <Logs size={40} />
          Catalog
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[600px] grid grid-cols-5">
        <DropdownMenuItem className="hover:!bg-gray-300">
          Subscription
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
