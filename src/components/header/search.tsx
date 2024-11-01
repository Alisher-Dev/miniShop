import { Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { urls } from "../api/urls";
import { api } from "../api/axios";
import { IProduct } from "../types";

export function SearchProduct() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api(`${urls.product.get}?title=*${search} `)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, [search]);

  if (!data) return <p>loading ...</p>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(!open)}>
        <Search size={40} />
      </Button>
      <DialogContent className="max-w-[1000px] max-h-[90vh] p-2 bg-[rgba(200,200,200,.4)] backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full h-10 pl-2 outline-none rounded-md"
              placeholder="поиск .."
            />
          </DialogTitle>
          <DialogTitle>
            <div className="max-h-[780px] overflow-auto grid gap-3">
              {data?.map((el, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-md overflow-hidden gap-3 border border-white"
                >
                  <img src={el.img[0]} className="w-20 h-20" alt="img" />
                  <p className="text-white font-medium">{el.title}</p>
                </div>
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
