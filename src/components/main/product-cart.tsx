import { useEffect, useState } from "react";
import { IParamsProduct } from "../types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { FormatPrice } from "../helpers/PriceFormat";
import { Check, ShoppingBasket, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DialogProduct } from "./product-dialog";
import { AddStorage } from "../helpers/storage";
import { useStore } from "../helpers/store";
import { cn } from "@/lib/utils";
import { urls } from "../api/urls";
import { api } from "../api/axios";
import { toast } from "@/hooks/use-toast";

export function Product({
  product,
  admin,
}: {
  admin?: boolean;
  product: IParamsProduct;
}) {
  const [apis, setApis] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const add = useStore((state) => state.addCart);

  const remove = () => {
    api(urls.product.delete(product.id!.toString()), {}, "DELETE")
      .then(() => toast({ title: "успешно удалено", variant: "default" }))
      .catch((e) =>
        toast({
          title: `ошибка при удалении продукта ${e.message}`,
          variant: "destructive",
        })
      );
  };

  const addCarts = () => {
    add(product);
    AddStorage("cart", JSON.stringify([...cart, product]));
  };

  useEffect(() => {
    if (!apis) {
      return;
    }
    setCount(apis.scrollSnapList().length);
    setCurrent(apis.selectedScrollSnap() + 1);
    apis.on("select", () => {
      setCurrent(apis.selectedScrollSnap() + 1);
    });
  }, [apis]);

  return (
    <>
      <div className="hover:shadow-md transition-all rounded-md cursor-pointer">
        <div onClick={() => setOpen(!open)}>
          <Carousel setApi={setApis} className="hover:bg-gray-100 rounded-md">
            <CarouselContent className="w-full h-[250px] relative m-0 ">
              {product.img.map((el, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-between p-10 hover:scale-110 transition-all"
                >
                  <img
                    src={el}
                    className="w-full h-full object-contain"
                    alt="producs img"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="py-2 text-center text-sm text-muted-foreground absolute top-1 left-2">
              {current} / {count}
            </div>
          </Carousel>
          <div className="p-2 grid gap-2">
            <p className="text-sm font-bold max-h-11 overflow-hidden">
              {product.title}
            </p>
            <p className="text-xs max-h-12 overflow-hidden">{product.desc}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 p-2">
          <p>{FormatPrice(product.price)}</p>
          <span className={cn(admin && "hidden")}>
            {cart.map((el) => el.desc).includes(product.desc) ? (
              <Button>
                <Check />
              </Button>
            ) : (
              <Button onClick={addCarts}>
                <ShoppingBasket />
              </Button>
            )}
          </span>
          {admin && (
            <Button variant="destructive" onClick={remove}>
              <Trash />
            </Button>
          )}
        </div>
      </div>
      <DialogProduct product={product} isOpen={open} setOpen={setOpen} />
    </>
  );
}
