import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IParamsProduct } from "../types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { FormatPrice } from "../helpers/PriceFormat";
import { Check, ShoppingBasket } from "lucide-react";
import { useStore } from "../helpers/store";
import { AddStorage } from "../helpers/storage";

export function DialogProduct({
  product,
  isOpen,
  setOpen,
}: {
  product: IParamsProduct;
  isOpen?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const cart = useStore((state) => state.cart);
  const add = useStore((state) => state.addCart);

  const addCarts = () => {
    add(product);
    AddStorage("cart", JSON.stringify([...cart, product]));
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <Carousel setApi={setApi} className="hover:bg-gray-100 rounded-md">
          <CarouselContent className="w-full m-0 h-[400px] relative">
            {product?.img.map((el, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-between p-5 hover:scale-110 transition-all"
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
        <div className="grid gap-2">
          <p className="text-sm md:text-lg font-bold">{product?.title}</p>
          <p className="text-xs md:text-sm">{product?.desc}</p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm md:text-base font-semibold">
              {FormatPrice(product?.price)}
            </p>
            <span className="space-x-2 flex items-center">
              {cart.map((el) => el.desc).includes(product?.desc) ? (
                <Button>
                  <Check />
                </Button>
              ) : (
                <Button onClick={addCarts}>
                  <ShoppingBasket />
                </Button>
              )}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
